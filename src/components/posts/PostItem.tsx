import classes from "./PostItem.module.css";
import React, { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Post } from "@/interfaces/Post";

export const PostItem: React.FC<Post> = ({
  title,
  image,
  excerpt,
  date,
  slug,
}) => {

  const formattedDate = useMemo(() => {
    return new Date(date).toLocaleDateString("ua-UK", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }, []);

  return (
    <li className={classes.post}>
      <Link href={`/posts/${slug}`}>
        <div className={classes.image}>
          <Image
            
            height={300}
            width={200 }
            // src={`/images/posts/${slug}/image`}
            src={`/images/posts/getting-started-with-nextjs/getting-started-nextjs.png`}
            alt={title}
            layout="responsive"
          />
        </div>
        <div className={classes.content}>
          <h3>{title}</h3>
          <time>{formattedDate}</time>
          <p>{excerpt}</p>
        </div>
      </Link>
    </li>
  );
};
