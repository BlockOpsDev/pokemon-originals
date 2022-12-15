import fs from "fs";
import { BigNumber, BigNumberish } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { holders } from "../utils/scrape/scrape";
import path from "path";

const NftList = {
  "3": { name: "Matte Black", reward: "1000" },
  // "4": { name: "Gold", reward: "1000" },
  // "5": { name: "Silver", reward: "1000" },
  // "7": { name: "Static", reward: "1000" },
  "8": { name: "Holo", reward: "1000" },
} as const;

type NftKeys = keyof typeof NftList;

type Map = {
  [key in `0x${string}`]: {
    totalReward: string;
    nfts: {
      [key in typeof NftList[NftKeys]["name"]]?: {
        quantity: string;
        reward: string;
      };
    };
  };
};

const increment_wei = (value: BigNumberish = 0, increment: BigNumberish) => {
  return BigNumber.from(value).add(BigNumber.from(increment)).toString();
};

async function main() {
  const map: Map = {};

  for (const id of Object.keys(NftList)) {
    await holders("0x1fDCf478AAa90Ff95d01B751B056ca4781c38Bfa", id, (data) => {
      map[data.owner_of] = {
        totalReward: increment_wei(
          map[data.owner_of]?.totalReward,
          parseEther(NftList[<NftKeys>id].reward).mul(data.amount)
        ),
        nfts: {
          ...map[data.owner_of]?.nfts,
          [NftList[<NftKeys>id].name]: {
            quantity: increment_wei(
              map[data.owner_of]?.nfts[NftList[<NftKeys>id].name]?.quantity,
              data.amount
            ),
            reward: increment_wei(
              map[data.owner_of]?.nfts[NftList[<NftKeys>id].name]?.reward,
              parseEther(NftList[<NftKeys>id].reward).mul(data.amount)
            ),
          },
        },
      };
    });
  }

  fs.writeFileSync(
    path.join(__dirname, "../../data/balance_maps/balanceMap.mainnet.json"),
    JSON.stringify(map)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
