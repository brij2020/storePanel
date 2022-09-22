import { POSTS } from "./fixtures";

import { rest } from "msw";

export const handlers = [
  
  // Get a single post
  rest.get(`/users/login`, (req, res, ctx) => {
    const { id } = req.params;

    return res(
      ctx.json({
        ...POSTS[0],
        id
      })
    );
  }),
];
