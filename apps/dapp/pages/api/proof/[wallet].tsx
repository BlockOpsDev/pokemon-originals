import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { wallet } = req.query
    const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/
      ${process.env.WORKER_ACCOUNT_ID}
      /storage/kv/namespaces/
      ${process.env.WORKER_KV_NAMESPACE_ID}
      /values/
      ${wallet}`, 
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.WORKER_KV_KEY}`,
        "Content-Type": "application/json",
      }
    })
    .then(response => response.json())
    res.status(200).json(response)
  }