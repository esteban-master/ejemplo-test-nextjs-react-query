import { useRouter } from "next/dist/client/router";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { getPost, getPosts } from "../../config/api";

const Post = () => {
  const { query, isFallback } = useRouter();
  const { data } = useQuery(["post", query.id], () =>
    getPost(query.id.toString())
  );

  if (isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Post {data.name} </h1>
      <p> {data.description} </p>
      <span> {data.createdAt} </span>
    </div>
  );
};

export async function getStaticPaths() {
  const posts = await getPosts();
  const paths = posts.map((p) => ({
    params: { id: p.id.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["post", params.id], () =>
    getPost(params.id)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default Post;
