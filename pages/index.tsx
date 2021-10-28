// import Head from "next/head";
// import Image from "next/image";
// import styles from "../styles/Home.module.css";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { getPosts } from "../config/api";
import Link from "next/link";
import { useState } from "react";
export default function Home() {
  const { data: posts } = useQuery("posts", getPosts);
  const rick = useQuery("characters", async () => {
    const res = await fetch("https://rickandmortyapi.com/api/character");
    return await res.json();
  });

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

        {rick.isSuccess && (
          <div>
            <button onClick={() => setShow((prev) => !prev)}>
              {show ? "Ocultar" : "Mostrar"} primer personaje
            </button>
            {show && <p>{rick.data.results[0].name}</p>}
          </div>
        )}
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
