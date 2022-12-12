// This api route returns the input value as a JSON object.
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { input } = req.query;
  res.status(200).json({ input });
}
