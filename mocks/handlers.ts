import { rest } from "msw";
export const mockData = [
  {
    id: 1,
    createdAt: "2021-10-22T02:39:52.573Z",
    updatedAt: "2021-10-22T02:39:52.573Z",
    name: "Post MOCK 1",
    description: "El segundo posts en TCIT",
  },
  {
    id: 2,
    createdAt: "2021-10-22T02:38:04.745Z",
    updatedAt: "2021-10-22T02:38:04.746Z",
    name: "Post MOCK 2",
    description: "El segundo posts en TCIT",
  },
  {
    id: 3,
    createdAt: "2021-10-20T19:51:09.986Z",
    updatedAt: "2021-10-20T19:51:09.987Z",
    name: "Post MOCK 3",
    description: "Algun texto para esta publicacion",
  },
];

export const mockCharactersData = {
  info: {
    count: 671,
    pages: 34,
    next: "https://rickandmortyapi.com/api/character?page=2",
    prev: null,
  },
  results: [
    {
      id: 1,
      name: "Rick Sanchez",
      status: "Alive",
      species: "Human",
      type: "",
      gender: "Male",
      origin: {
        name: "Earth (C-137)",
        url: "https://rickandmortyapi.com/api/location/1",
      },
      location: {
        name: "Earth (Replacement Dimension)",
        url: "https://rickandmortyapi.com/api/location/20",
      },
      image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
      episode: [
        "https://rickandmortyapi.com/api/episode/1",
        "https://rickandmortyapi.com/api/episode/2",
        "https://rickandmortyapi.com/api/episode/3",
      ],
      url: "https://rickandmortyapi.com/api/character/1",
      created: "2017-11-04T18:48:46.250Z",
    },
  ],
};
const handlers = [
  rest.get("http://localhost:3001/posts", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockData));
  }),
  rest.get("http://localhost:3001/posts/:id", (req, res, ctx) => {
    const params = req.params;
    const postFind = mockData.find(
      (p) => p.id.toString() === params.id.toString()
    );
    return res(ctx.status(200), ctx.json(postFind));
  }),
  rest.get("https://rickandmortyapi.com/api/character", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockCharactersData));
  }),
];

export { handlers };
