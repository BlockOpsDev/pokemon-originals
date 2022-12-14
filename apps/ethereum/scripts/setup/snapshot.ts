import { BigNumber } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { holders } from "../utils/scrape/scrape";

const NftNames = {
  "3": { name: "Matte Black", reward: "1000" },
  // "4": { name: "Gold", reward: "1000" },
  // "5": { name: "Silver", reward: "1000" },
  // "7": { name: "Static", reward: "1000" },
  // "8": { name: "Holo", reward: "1000" },
} as const;

type Map = {
  [key in `0x${string}`]: {
    totalReward: string;
    nfts: {
      [key in typeof NftNames[keyof typeof NftNames]["name"]]?: {
        quantity: string;
        reward: string;
      };
    };
  };
};

async function main() {
  const map: Map = {};

  for (const id of Object.keys(NftNames)) {
    await holders("0x1fDCf478AAa90Ff95d01B751B056ca4781c38Bfa", id, (data) => {
      map[data.owner_of] = {
        totalReward: BigNumber.from(map[data.owner_of]?.totalReward || 0)
          .add(
            parseEther(NftNames[<keyof typeof NftNames>id].reward).mul(
              data.amount
            )
          )
          .toString(),
        nfts: {
          ...map[data.owner_of]?.nfts,
          [NftNames[<keyof typeof NftNames>id].name]: {
            quantity: BigNumber.from(
              map[data.owner_of]?.nfts[NftNames[<keyof typeof NftNames>id].name]
                ?.quantity || 0
            )
              .add(data.amount)
              .toString(),
            reward: BigNumber.from(
              map[data.owner_of]?.nfts[NftNames[<keyof typeof NftNames>id].name]
                ?.reward || 0
            )
              .add(
                parseEther(NftNames[<keyof typeof NftNames>id].reward).mul(
                  data.amount
                )
              )
              .toString(),
          },
        },
      };
    });
  }

  console.log(JSON.stringify(map));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
