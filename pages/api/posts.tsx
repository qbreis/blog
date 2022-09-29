// blog/pages/api/posts.tsx
import type { NextApiRequest, NextApiResponse } from 'next';
import { getPosts } from '../../lib/posts';

export default function getPaginatedPosts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.query.lol);
  console.log('paginationLimit: ' + process.env.paginationLimit);
  const posts = getPosts();
  //res.status(200).json({ name: 'John Doe' })
  res.status(200).json({ posts, method: req.method });
}
