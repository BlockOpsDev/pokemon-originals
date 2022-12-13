import fs from "fs";
import { parseBalanceMap } from "../utils/merkle/parse-balance-map";

const json = JSON.parse(
  fs.readFileSync("./scripts/data/balanceMap.json", { encoding: "utf8" })
);

if (typeof json !== "object") throw new Error("Invalid JSON");

fs.writeFileSync(
  "./scripts/data/merkleDistribution.json",
  JSON.stringify(parseBalanceMap(json))
);
