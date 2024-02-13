import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { clerkClient } from "@clerk/nextjs";
import { TRPCError } from "@trpc/server";

export const profileRouter = createTRPCRouter({
    hello: publicProcedure
        .input(z.object({ text: z.string() }))
        .query(({ input }) => {
            return {
                greeting: `Hello ${input.text}`,
            };
        }),

    // getLatest: publicProcedure.query(({ ctx }) => {
    //     return ctx.db.post.findFirst({
    //         orderBy: { createdAt: "desc" },
    //     });
    // }),

    username: publicProcedure
        .query(async ({ ctx }) => {
            if (!ctx.userId) {
                throw new TRPCError({ code: "UNAUTHORIZED" })
            }
            const username = await clerkClient.users.getUser(ctx.userId)
                
            return {
                username: username.firstName
            }
        }),

    info : publicProcedure
    .query(async({ctx})=>{
        const username = await clerkClient.users.getUser(ctx.userId)
        if (!ctx.userId) {
            throw new TRPCError({ code: "UNAUTHORIZED" })
        }
        return {
            info :  {
                id :username.id,
                username : username.firstName,
                profilePicture : username.imageUrl
            }
        }
    }),


    ProfilePicture: publicProcedure
    .query(async({ctx})=>{
        if (!ctx.userId) {
            throw new TRPCError({ code: "UNAUTHORIZED" })
        }
        const profilePicture = await clerkClient.users.getUser(ctx.userId)
        return {
            profilePicture: profilePicture.imageUrl
        }
    })
});
