import { PostContent } from "@/components/posts/post-detail/PostContent";
import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from "next";
import { Post } from "@/interfaces/Post";
import { getPostData, getAllPosts, getAllPaths } from "@/lib/posts-util";

const PostPage = ({ post }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <PostContent post={post}/>;
};

export const getStaticProps: GetStaticProps<{ post: Post }> = async (
  context
) => {
  const slug = context.params?.slug;

  if (!slug) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
      revalidate: 600,
    };
  }

  const post = getPostData(slug as string);

  return {
    props: {
      post,
    },
    revalidate: 600,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPaths();

  return {
    paths,
    fallback: false,
  };
};

export default PostPage;
