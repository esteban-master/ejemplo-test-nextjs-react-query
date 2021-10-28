import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "../pages";
import { QueryClient } from "react-query";
import { mockData } from "../mocks/handlers";
import { renderWithClient } from "../tests/utils";
import { getPosts } from "../config/api";

describe("Home test", () => {
  beforeEach(async () => {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery("posts", getPosts);
    renderWithClient(queryClient, Home);
  });
  test("Encuentra el titulo", async () => {
    expect(
      await screen.findByRole("heading", {
        name: `${mockData.length} posts publicados`,
      })
    ).toBeInTheDocument();
  });
  test("Encuentra los posts listados", async () => {
    await waitFor(() => {
      mockData.forEach((p) => {
        expect(screen.getByText(p.name)).toBeInTheDocument();
      });
    });
  });
});
