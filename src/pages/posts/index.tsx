import { AllPosts } from "@/components/pages/HomePage/AllPosts";
import type { GetStaticProps,InferGetStaticPropsType } from "next";
import { Post } from "@/interfaces/Post";

import { getAllPosts } from "@/lib/posts-util";

const PostsPage = ({posts}:InferGetStaticPropsType<typeof getStaticProps>) => {
  return <AllPosts posts={posts} />;
};

export const getStaticProps:GetStaticProps<{posts:Post[]}>=async()=>{
    const allPosts=getAllPosts();

    return{
        props:{
            posts:allPosts
        },
        revalidate:60
    }
}











export default PostsPage;




