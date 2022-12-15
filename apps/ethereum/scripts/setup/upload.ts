import { config as dotEnvConfig } from "dotenv";
dotEnvConfig();

import fs from "fs";
import path from "path";
import axios from "axios";
import { getEnviroment } from "../utils/enviroment";

const options = (data: { key: string; value: string }[]) => {
  return {
    method: "PUT",
    url: `https://api.cloudflare.com/client/v4/accounts/${process.env.WORKER_ACCOUNT_ID}/storage/kv/namespaces/${process.env.WORKER_KV_NAMESPACE_ID}/bulk`,
    data,
    headers: {
      Authorization: `Bearer ${process.env.WORKER_KV_KEY}`,
      "Content-Type": "application/json",
    },
    maxBodyLength: Infinity,
  };
};

const BATCH_SIZE = 10_000;

async function main() {
  const env = await getEnviroment();

  const { claims } = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, `../../data/claim_data/claimData.${env}.json`),
      "utf8"
    )
  ) as { claims: { [key: `0x${string}`]: any } };

  if (typeof claims !== "object") throw new Error("Invalid JSON");

  const claimsArray = Object.entries(claims).map(([key, value]) => ({
    key,
    value: JSON.stringify(value),
  }));

  for (let i = 0; i < claimsArray.length; i += BATCH_SIZE) {
    await axios(options(claimsArray.slice(i, i + BATCH_SIZE))).catch((e) => {
      console.log(e.response.data);
    });
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
