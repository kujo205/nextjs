import { AllPosts } from "@/components/pages/HomePage/AllPosts";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { Post } from "@/interfaces/Post";
import Head from "next/head";
import { getAllPosts } from "@/lib/posts-util";

const PostsPage = ({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <>
    <Head>
      <title>All posts</title>
      <meta
        name="description"
        content="A list of all my programmimg related posts"
      />
    </Head>
    <AllPosts posts={posts} />;
  </>;
};

export const getStaticProps: GetStaticProps<{ posts: Post[] }> = async () => {
  const allPosts = getAllPosts();

  return {
    props: {
      posts: allPosts,
    },
    revalidate: 60,
  };
};

export default PostsPage;
