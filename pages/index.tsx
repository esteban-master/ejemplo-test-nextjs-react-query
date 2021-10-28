// import Head from "next/head";
// import Image from "next/image";
// import styles from "../styles/Home.module.css";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { getPosts } from "../config/api";
import Link from "next/link";
import { useState } from "react";
export default function Home() {
  const { data: posts, isLoading } = useQuery("posts", getPosts);

  const [show, setShow] = useState(false);
  return (
    <div>
      <div>
        <h1> {posts.length} posts publicados </h1>
        {posts.map((p) => (
          <div key={p.id}>
            <h1> {p.name} </h1>
            <p> {p.description} </p>
            <Link href={`/posts/${p.id}`}>
              <a>Ver mas</a>
            </Link>
          </div>
        ))}

        <button onClick={() => setShow((prev) => !prev)}>Hola</button>
        {show && <p>Mostrando jajajaja</p>}
      </div>
    </div>
  );
}

export async function getStaticProps(context) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("posts", getPosts);
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
