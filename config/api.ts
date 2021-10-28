import { Post } from "../models";

export async function getPosts(): Promise<Post[]> {
  const res = await fetch("http://localhost:3001/posts");
  return await res.json();
}
export async function getPost(id: string): Promise<Post> {
  const res = await fetch(`http://localhost:3001/posts/${id}`);
  return await res.json();
}
