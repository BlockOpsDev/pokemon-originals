import { config as dotEnvConfig } from "dotenv";
dotEnvConfig();

import axios from "axios";

const options = (address: string, id: string | number, cursor?: string) => {
  return {
    method: "GET",
    url: `https://deep-index.moralis.io/api/v2/nft/${address}/${id}/owners`,
    params: {
      chain: "polygon",
      format: "decimal",
      normalizeMetadata: "false",
      limit: 10,
      cursor,
    },
    headers: {
      accept: "application/json",
      "X-API-Key": process.env.MORALIS_KEY,
    },
  };
};

type moralisResponse = {
  total: number;
  page: number;
  page_size: number;
  cursor: string;
  result: {
    token_address: `0x${string}`;
    token_id: number;
    owner_of: `0x${string}`;
    block_number: number;
    block_number_minted: string;
    token_hash: string;
    amount: string;
    contract_type: string;
    name: string;
    symbol: string;
    token_uri: string;
    metadata: {
      [key in string]:
        | string
        | number
        | boolean
        | { [key in string]: string | number | boolean }[];
    };
    last_token_uri_sync: string;
    last_metadata_sync: string;
    minter_address: string;
  }[];
};

export const holders = async <T>(
  contract: `0x${string}`,
  id: string | number,
  callback: (data: moralisResponse["result"][number]) => T
): Promise<void> => {
  let cursor = "";

  do {
    const { data } = await axios<moralisResponse>(
      options(contract, id, cursor)
    );

    for (const holder of data.result) {
      await Promise.resolve(callback(holder));
    }

    console.log(`Fetched ${holders.length} holders`);
    cursor = data.cursor;
  } while (cursor && holders.length < 20);
};
