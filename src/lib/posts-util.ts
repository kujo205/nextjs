import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { ParsedUrlQuery } from "querystring";

const postsDir = path.join(process.cwd(), "posts");

export function getPostData(fileId: string) {
  const slug = fileId.replace(/\.md$/, "");
  const filePath = path.join(postsDir, `${slug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  const { date, isFeatured, title, excerpt } = data;

  const postData = {
    slug,
    date,
    content,
    isFeatured,
    title,
    excerpt,
    ...data,
  };

  return postData;
}

export function getAllPosts() {
  const postFiles = fs.readdirSync(postsDir);
  const posts = postFiles.map((file) => getPostData(file));
  const sortedPosts = posts.sort((a, b) => (a.date > b.date ? -1 : 1));
  return sortedPosts;
}

export function getfeaturedPosts() {
  const featuredPosts = getAllPosts().filter((post) => post.isFeatured);
  return featuredPosts;
}

export function getAllPaths() {
  const postFiles = fs.readdirSync(postsDir);
  const paths = postFiles.map((filename) => ({
    params: {
        slug:filename.replace(/\.md$/,'')
    }
  }));


  return paths;
}
