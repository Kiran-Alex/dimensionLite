import { postRouter } from "~/server/api/routers/post";
import { createTRPCRouter } from "~/server/api/trpc";
import { profileRouter } from "./routers/profile";
import { pusherRouter } from "./routers/pusher";
import { openaiRouter } from "./routers/openAI";
import { IntegrationRouter } from "./routers/integration";
import { tokenRouter } from "./routers/token";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  profile : profileRouter,
  pusher : pusherRouter,
  openAI : openaiRouter,
  integration : IntegrationRouter,
  token : tokenRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
