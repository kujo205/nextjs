import React,{FC} from "react";
import classes from "./AllPosts.module.css";
import { PostsGrid } from "@/components/posts/PostsGrid";
import { Post } from "@/interfaces/Post";

interface AllPosts{
    posts: Array<Post>;
}

export const AllPosts:FC<AllPosts> = ({posts}) => {
  return (
    <section className={classes.posts}>
      <h1>All Posts</h1>
      <PostsGrid posts={posts}/>

    </section>
  );
};
