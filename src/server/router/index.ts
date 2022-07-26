// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { authRouter } from "./auth";
import { linkerRouter } from "./linker";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("auth.", authRouter)
  .merge("linker.", linkerRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
