import { QueryClient } from "react-query";
import { mockNextUserRouter, renderWithClient } from "./utils";
import Post from "../pages/posts/[id]";
import { mockData } from "../mocks/handlers";
import { getPost } from "../config/api";
import { screen } from "@testing-library/react";

const [primerPost] = mockData;

describe("Test Post", () => {
  beforeEach(async () => {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(["post", primerPost.id.toString()], () =>
      getPost(primerPost.id.toString())
    );
    mockNextUserRouter({
      route: "/posts/[id]",
      pathname: "/posts/[id]",
      query: {
        id: primerPost.id.toString(),
      },
      asPath: `/posts/${primerPost.id}`,
    });

    renderWithClient(queryClient, Post);
  });

  test("Render post", async () => {
    expect(
      screen.getByRole("heading", { name: primerPost.name })
    ).toBeInTheDocument();
  });
});
