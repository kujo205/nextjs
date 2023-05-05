import { Hero } from "../components/pages/HomePage/Hero";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { FeaturedPosts } from "../components/pages/HomePage/FeaturedPosts";
import { Post } from "@/interfaces/Post";
import { DUMMY_POSTS } from "@/dummy-data/posts";
import { getfeaturedPosts } from "@/lib/posts-util";

const Home = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Hero />
      <FeaturedPosts posts={posts} />
    </>
  );
};

export const getStaticProps: GetStaticProps<{ posts: Post[] }> = async () => {
  const posts: Post[] = getfeaturedPosts();
  return {
    props: {
      posts,
    },
  };
};

export default Home;
