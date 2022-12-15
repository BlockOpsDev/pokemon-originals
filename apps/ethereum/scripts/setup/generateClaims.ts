import fs from "fs";
import path from "path";
import { getEnviroment } from "../utils/enviroment";
import { parseBalanceMap } from "../utils/merkle/parse-balance-map";

async function main() {
  const env = await getEnviroment();

  const json = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, `../../data/balance_maps/balanceMap.${env}.json`),
      "utf8"
    )
  );

  if (typeof json !== "object") throw new Error("Invalid JSON");

  fs.writeFileSync(
    path.join(__dirname, `../../data/claim_data/claimData.${env}.json`),
    JSON.stringify(parseBalanceMap(json))
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
