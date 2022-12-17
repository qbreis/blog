import type { NextApiRequest, NextApiResponse } from 'next';
import { getPosts } from '../../../lib/posts';

export default function getPaginatedPosts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const posts = getPosts({
    limit: process.env.paginationLimit,
    start: req.query.page
      ? (Number(req.query.page) - 1) * Number(process.env.paginationLimit)
      : 0,
  });
  res.status(200).json(posts);
}
