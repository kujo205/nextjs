import { FC } from "react";
import classes from "./FeaturedPosts.module.css";
import { PostsGrid } from "@/components/posts/PostsGrid";
import { Post } from "@/interfaces/Post";

interface FeaturedPosts {
  posts:Post[];
}

export const FeaturedPosts: FC<FeaturedPosts> = ({posts}) => {
  return (
    <section className={classes.latest}>
      <h2>Featured posts</h2>
      <PostsGrid posts={posts}/>
    </section>
  );
};
