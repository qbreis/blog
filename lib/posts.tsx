import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import prism from 'remark-prism';

/*********************
Posts
*/

const postsDirectory = path.join(process.cwd(), 'posts');

// Get file names under /posts
const fileNames = fs.readdirSync(postsDirectory);

const posts: any = [];

fileNames.map((fileName) => {

    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    if(!matterResult.data.draft){
        posts.push({
            id,
            ...matterResult.data,
        });
    }
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
Categories
*/

const allCategories: any = [];

// get all categories
posts.map((post: any) => {
    post.categories.map((postCategory: any) => {
        if(!allCategories.includes(postCategory)){
            allCategories.push(postCategory);
        }
    });
});
// count number of posts for each category
const categories = allCategories.map((category: any) => {
    return {
        id: category,
        posts: getPosts(category).length,
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

/*********************
Functions
*/

export function getPosts(categoryId?: any) { // make optional parameter categoryId?
    if(!categoryId){
        return posts;
    }
    const getPosts: any = [];
    posts.map((post: any) => {
        if(post.categories.includes(categoryId)){
            getPosts.push(post);
        }
    });
    return getPosts;
}

export function getCategories() {
    return categories;
}

export function getAllPostIds() {
    // Returns an array that looks like this:
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
    return posts.map((post: any) => {
        return {
            params: {
                id: post,
            },
        };
    });
}

export async function getPostData(id: any) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
  
    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Use remark to convert markdown into HTML string
    /*
    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
    */
    const processedContent = await remark()
        .use(html, { sanitize: false })
        .use(prism, { plugins: ["line-numbers"] })
        .process(matterResult.content);
    
    const contentHtml = processedContent.toString();

    // Combine the data with the id and contentHtml
    return {
        id,
        contentHtml,
        ...matterResult.data,
    };
}

export function getAllCategoryIds() {
    return categories.map((category: any) => {
        return {
            params: {
                id: category,
            },
        };
    });
}