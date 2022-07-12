import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

// Get file names under /posts
const fileNames = fs.readdirSync(postsDirectory);

export function getSortedPostsData(categoryId?: any) { // make optional parameter categoryId?

    const allPostsDataResult: any = [];
    
    const allPostsData = fileNames.map((fileName) => {
        // Remove ".md" from file name to get id
        const id = fileName.replace(/\.md$/, '');

        // Read markdown file as string
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents);

        // Combine the data with the id
        /*
        return {
            id,
            ...matterResult.data,
        };
        */

        if(
            !categoryId // If no category is specified get all posts
            ||
            (
                categoryId // If category specified...
                &&
                matterResult.data.categories.includes(categoryId) // ... get only posts with this category
            )
        ){
            allPostsDataResult.push({
                id,
                ...matterResult.data,
            });
        }

    });
    
    // Sort posts by date
    return allPostsDataResult.sort(({ date: a }: any, { date: b }: any) => {
        if (a < b) {
            return 1;
        } else if (a > b) {
            return -1;
        } else {
            return 0;
        }
    });
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
    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.md$/, ''),
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
    const processedContent = await remark()
        .use(html)
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
    const categories: any = [];

    const allPostsData = fileNames.map((fileName) => {

        // Read markdown file as string
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents);

        const postCategories = matterResult.data.categories.map((postCategory: any) => {
            if(!categories.includes(postCategory)){
                categories.push(postCategory);
            }
        })

    });

    return categories.map((category: any) => {
        return {
            params: {
                id: category,
            },
        };
    });
}

export function getSortedCategories() {
    const categories: any = [];
    const allPostsData = fileNames.map((fileName) => {
        // Read markdown file as string
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents);

        const postCategories = matterResult.data.categories.map((postCategory: any) => {
            if(!categories.includes(postCategory)){
                categories.push(postCategory);
            }
        });
    });

    const categoriesResult = categories.map((category: any) => {
        return {
            id: category,
            posts: getSortedPostsData(category).length,
        };
    });

    categoriesResult.sort(({ posts: a }: any, { posts: b }: any) => {
        if (a < b) {
            return 1;
        } else if (a > b) {
            return -1;
        } else {
            return 0;
        }
    });

    categoriesResult.map((category: any) => {
        return {
            params: {
                id: category.id,
                posts: category.posts,
            },
        };
    });

    return categoriesResult;
}