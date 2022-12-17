// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

// import fs from 'fs'; // fs is a Node.js module that let's you read files from the file system. /* 1 */
// import path from 'path'; // path is a Node.js module that let's you manipulate file paths. /* 2 */
// import matter from 'gray-matter'; // matter is a library that let's you parse the metadata in each markdown file./* 3 */

import { getPosts } from '../../lib/posts';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.query.lol);
  console.log('paginationLimit: ' + process.env.paginationLimit);
  /*
  const postsDirectory = path.join(process.cwd(), 'posts');

  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);

  const posts = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });

  // Sort posts by date
  posts.sort(({ date: a }: any, { date: b }: any) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
  */
  const posts = getPosts();
  //res.status(200).json({ name: 'John Doe' })
  res.status(200).json(posts);
}
