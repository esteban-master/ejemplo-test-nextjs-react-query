import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "../pages";
import { QueryClient } from "react-query";
import { mockData } from "../mocks/handlers";
import { renderWithClient } from "./utils";
import { getPosts } from "../config/api";

describe("Home test", () => {
  beforeEach(async () => {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery("posts", getPosts);
    renderWithClient(queryClient, Home);
  });
  test("Encuentra el titulo", () => {
    screen.getByRole("heading", {
      name: `${mockData.length} posts publicados`,
    });
  });
  test("Mostrar primer personaje", async () => {
    const buttonMostrarPersonaje = await screen.findByText(
      /mostrar primer personaje/i
    );

    userEvent.click(buttonMostrarPersonaje);
    expect(await screen.findByText(/rick sanchez/i)).toBeInTheDocument();
  });
});
