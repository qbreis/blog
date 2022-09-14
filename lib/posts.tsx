import fs from 'fs'; // fs is a Node.js module that let's you read files from the file system. /* 1 */
import path from 'path'; // path is a Node.js module that let's you manipulate file paths. /* 2 */
import matter from 'gray-matter'; // matter is a library that let's you parse the metadata in each markdown file./* 3 */

import { remark } from 'remark'; // remark is a library to render Markdown /* 6 */
import html from 'remark-html';

/*********************
Posts
*/

const postsDirectory = path.join(process.cwd(), 'posts'); /* 2 */

// Get file names under /posts
const fileNames = fs.readdirSync(postsDirectory); /* 1 */

const posts = fileNames.map((fileName) => {
  // Remove ".md" from file name to get id
  const id = fileName.replace(/\.md$/, '');

  // Read markdown file as string
  const fullPath = path.join(postsDirectory, fileName); /* 2 */
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents); /* 3 */

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

/*********************
Functions
*/

export function getPosts() {
  const getPosts = posts.map((post: any) => {
    return post;
  });
  return getPosts;
}

export function getAllPostIds() {
  /* 4 */
  // Returns an array of possible value for id that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  /*
  Important: The returned list is not just an array of strings —
  it must be an array of objects that look like the comment above.
  Each object must have the params key and contain an object with
  the id key (because we’re using [id] in the file name).
  Otherwise, getStaticPaths in pages/posts/[id].tsx will fail.
  */
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export async function getPostData(id: any) {
  /* 5 */
  // Fetch necessary data for the blog post using params.id
  // in pages/posts/[id].tsx.
  // Return the post data based on id.
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string /* 6 */
  const processedContent = await remark()
    .use(html, { sanitize: false })
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}
