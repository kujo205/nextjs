import classes from "./PostsGrid.module.css";
import React from "react";
import { PostItem } from "./PostItem";
import { Post } from "@/interfaces/Post";


interface GridProps {
  posts: Post[];
}

export const PostsGrid: React.FC<GridProps> = ({ posts }) => {
  return (
    <ul className={classes.grid}>
      {posts.map((item) => (
        <PostItem {...item} key={item.title} />
      ))}
    </ul>
  );
};
