import { holders } from "../utils/scrape/scrape";

async function main() {
  console.log(
    await holders("0x1fDCf478AAa90Ff95d01B751B056ca4781c38Bfa", (data) => {
      return {
        owner: data.owner_of,
        token: data.token_id,
        amount: data.amount,
      };
    })
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
