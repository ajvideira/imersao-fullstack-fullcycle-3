// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Product, products } from "../../../models";

export default (req: NextApiRequest, res: NextApiResponse<Product[]>) => {
  res.status(200).json(products);
};
