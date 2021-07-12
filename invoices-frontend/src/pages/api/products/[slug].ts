// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Product, products } from "../../../models";

export default (req: NextApiRequest, res: NextApiResponse<Product>) => {
  const { slug } = req.query;

  const product = products.find((p) => p.slug === slug);

  res.status(product ? 200 : 404).json(product!);
};
