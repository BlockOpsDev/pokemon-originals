import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { address } = req.query;
  //   const WORKER_ACCOUNT_ID = process.env.WORKER_ACCOUNT_ID;
  //   const WORKER_KV_NAMESPACE_ID = process.env.WORKER_KV_NAMESPACE_ID;
  //   const WORKER_KV_KEY = process.env.WORKER_KV_KEY;

  //   const response = await fetch(
  //     `https://api.cloudflare.com/client/v4/accounts/${WORKER_ACCOUNT_ID}/storage/kv/namespaces/${WORKER_KV_NAMESPACE_ID}/values/${address}`,
  //     {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${WORKER_KV_KEY}`,
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   ).then((response) => response.json());

  const response = {
    leaf: {
      index: 0,
      proof: [
        "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      ],
      amount: "0x0",
    },
    nfts: {
      Holo: {
        quantity: 1,
        reward: 0.01,
      },
    },
  };

  res.status(200).json(response);
}
