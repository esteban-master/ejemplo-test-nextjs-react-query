import "@testing-library/jest-dom/extend-expect";
import { mockServer } from "./mocks/server";

if (process.env.NODE_ENV === "test") {
  global.fetch = require("node-fetch");
}

beforeAll(() => mockServer.listen());
afterEach(() => mockServer.resetHandlers());
afterAll(() => mockServer.close());
