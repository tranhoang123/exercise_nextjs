import { data, Movie, TvShow } from "@/data";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<Movie | TvShow>>
) {
  const query = req.query;

  const dataToReturn = !!query.type
    ? data.filter(({ type }) => type === query.type)
    : data;

  setTimeout(() => {
    res.status(200).json(dataToReturn);
  }, 1000);
}
