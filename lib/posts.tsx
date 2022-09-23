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
Functions - Posts
*/

export function getPosts(params?: any) {
  if (!params?.category && !params?.tag && !params?.limit) {
    return posts;
  }
  const getPosts: any = [];

  let counter = 0;

  posts.map((post: any) => {
    if (
      (params?.category && post.categories.includes(params?.category)) ||
      (params?.tag && post.tags.includes(params?.tag)) ||
      (params?.limit && counter < params?.limit)
    ) {
      counter++;
      getPosts.push(post);
    }
  });

  return getPosts;
}

/*
export function getPostsPaginated(params?: any) {
  if (!params?.limit) {
    return posts;
  }
  const getPosts: any = [];
  let counter = 0;
  posts.map((post: any) => {
    if (counter < params?.limit) {
      counter++;
      getPosts.push(post);
    }
  });
  return getPosts;
}
*/

export function getPostsPaginatedIds() {
  return getPosts({ limit: 3 }).map((post: any) => {
    return {
      params: {
        id: post.id,
      },
    };
  });
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
    // .use(html)
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

/*********************
Categories
*/

const allCategories: any = [];

// get all categories like this: [ 'nextjs', 'test' ]
posts.map((post: any) => {
  post.categories.map((postCategory: any) => {
    if (!allCategories.includes(postCategory)) {
      allCategories.push(postCategory);
    }
  });
});

// count number of posts for each category
const categories = allCategories.map((category: any) => {
  return {
    id: category,
    posts: getPosts({ category: category }).length,
  };
});

// sort by number of posts for each category
categories.sort(({ posts: a }: any, { posts: b }: any) => {
  if (a < b) {
    return 1;
  } else if (a > b) {
    return -1;
  } else {
    return 0;
  }
});

export function getCategories() {
  return categories;
}

export function getAllCategoryIds() {
  // Returns an array of possible value for id that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'nextjs'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'test'
  //     }
  //   }
  // ]
  /*
  Important: The returned list is not just an array of strings —
  it must be an array of objects that look like the comment above.
  Each object must have the params key and contain an object with
  the id key (because we’re using [id] in the file name).
  Otherwise, getStaticPaths in pages/categories/[id].tsx will fail.
  */
  return categories.map((category: any) => {
    return {
      params: {
        id: category.id,
      },
    };
  });
}

/*********************
Tags
*/

const allTags: any = [];

// get all tags like this: [ 'nextjs', 'test' ]
posts.map((post: any) => {
  post.tags.map((postTag: any) => {
    if (!allTags.includes(postTag)) {
      allTags.push(postTag);
    }
  });
});

// count number of posts for each category
const tags = allTags.map((tag: any) => {
  return {
    id: tag,
    posts: getPosts({ tag: tag }).length,
  };
});

// sort by number of posts for each category
tags.sort(({ posts: a }: any, { posts: b }: any) => {
  if (a < b) {
    return 1;
  } else if (a > b) {
    return -1;
  } else {
    return 0;
  }
});

export function getTags() {
  return tags;
}

export function getAllTagIds() {
  // Returns an array of possible value for id that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'nextjs'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'test'
  //     }
  //   }
  // ]
  /*
  Important: The returned list is not just an array of strings —
  it must be an array of objects that look like the comment above.
  Each object must have the params key and contain an object with
  the id key (because we’re using [id] in the file name).
  Otherwise, getStaticPaths in pages/tags/[id].tsx will fail.
  */
  return tags.map((tag: any) => {
    return {
      params: {
        id: tag.id,
      },
    };
  });
}
