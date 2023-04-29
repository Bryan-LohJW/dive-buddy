import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import { recordRouter } from "./routers/record";
import { trainingRouter } from "./routers/training";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  record: recordRouter,
  training: trainingRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
