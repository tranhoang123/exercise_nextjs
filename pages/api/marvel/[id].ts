import { data, Movie, TvShow } from "@/data";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Movie | TvShow>
) {
  const { id } = req.query;

  if (!id) {
    return res.status(404).end();
  }

  const item = data.find((item) => item.id === +id);

  if (!item) {
    return res.status(404).end();
  }

  setTimeout(() => {
    res.status(200).json(item);
  }, 200);
}
