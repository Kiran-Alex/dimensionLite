import { postRouter } from "~/server/api/routers/post";
import { createTRPCRouter } from "~/server/api/trpc";
import { profileRouter } from "./routers/profile";
import { openaiRouter } from "./routers/openAI";
import { IntegrationRouter } from "./routers/integration";
import { tokenRouter } from "./routers/token";
import { GroupRouter } from "./routers/groups";
import { todoRouter } from "./routers/todo";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  profile : profileRouter,
  openAI : openaiRouter,
  integration : IntegrationRouter,
  token : tokenRouter,
  group : GroupRouter,
  todo : todoRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
