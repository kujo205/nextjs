import React, { FC } from "react";
import type { Components } from "react-markdown";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { PostHeader } from "./PostHeader";
import { DUMMY_POSTS } from "@/dummy-data/posts";
import classes from "./PostContent.module.css";
import { Post } from "@/interfaces/Post";
import Image from "next/image";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import atomDark from "react-syntax-highlighter/dist/cjs/styles/prism/atom-dark";
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript'
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css'


SyntaxHighlighter.registerLanguage('js',js);
SyntaxHighlighter.registerLanguage('css',css);


export const PostContent: FC<{ post: Post }> = ({ post }) => {
  const { content, title, slug } = post;
  // const image=`/images/posts/${.slug}/${.image}`

  const components: Components = {
    img(img) {
      return (
        <span className={classes.image}>
          <Image
            // className={classes.image}
            src={img.src as string}
            alt={img.alt as string}
            height={300}
            width={600}
          />
        </span>
      );
    },

    code(code) {
      // const { language, value } = code;
      if (!code.className) return <p></p>;

      const _array = code.className.split("-");
      const _language = _array[1];
      return (
        <SyntaxHighlighter style={atomDark} language={_language}>
          {code.children[0] as string}
        </SyntaxHighlighter>
      );
    },
  };

  const image = `/images/posts/getting-started-nextjs.png`;
  return (
    <article className={classes.content}>
      <PostHeader title={title} image={image} />
      {content && (
        <ReactMarkdown components={components}>{content}</ReactMarkdown>
      )}
    </article>
  );
};
