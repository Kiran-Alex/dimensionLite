import { z } from "zod";
import Pusher from "pusher";
import { pusher } from "~/server/pusher";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { clerkClient } from "@clerk/nextjs";
import { TRPCError } from "@trpc/server";


export const pusherRouter = createTRPCRouter({
    message: publicProcedure
        .input(z.object({ message: z.string() }))
        .mutation(async({ input, ctx }) => {
            pusher.trigger("chat", "message", input.message);
            if (ctx.userId) {
              const uname =  await clerkClient.users.getUser(ctx.userId)
              return {
                message: input.message,
                username : uname.firstName
            };
            }
            else {
                throw new TRPCError({code : "UNAUTHORIZED"})
            }
            
        }),
});
