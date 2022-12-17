// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getPosts } from '../../lib/posts';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const posts = getPosts();
  res.status(200).json(posts);
}
