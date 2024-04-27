import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { clerkClient } from "@clerk/nextjs";
import { TRPCError } from "@trpc/server";

export const GroupRouter = createTRPCRouter({

    Create: publicProcedure
        .input(z.object({
            groupId: z.string(),
            groupName: z.string(),
        }))
        .mutation(async ({ ctx, input }) => {
            await ctx.db.group.create({
                data: {
                    id: input.groupId,
                    name: input.groupName,
                    users: {
                        connect: {
                            id: ctx.userId
                        }
                    },
                }
            })
        }),

    CreateUserandGroup: publicProcedure
        .input(z.object({
            groupId: z.string(),
            groupName: z.string(),
            repoLink : z.string().optional()
        }))
        .mutation(async ({ ctx, input }) => {
            const userinfo = await clerkClient.users.getUser(ctx.userId)
            const username = userinfo.firstName + " " + userinfo.lastName || ""
            const mail = userinfo.emailAddresses[0]?.emailAddress
            const user = await ctx.db.user.findUnique({
                where: {
                    id: ctx.userId
                }
            })

            if (user) {
                await ctx.db.group.create({
                    data: {
                        id: input.groupId,
                        name: input.groupName,
                        RepositoryLink : input.repoLink,
                        users: {
                            connect: {
                                id: ctx.userId
                            }
                        },
                    }
                })
            }
            else {
                if (mail !== undefined) {
                    await ctx.db.user.create({
                        data: {
                            id: ctx.userId,
                            name: username,
                            mail: mail
                        }
                    });
                    await ctx.db.group.create({
                        data: {
                            id: input.groupId,
                            name: input.groupName,
                            RepositoryLink : input.repoLink,
                            users: {
                                connect: {
                                    id: ctx.userId
                                }
                            },
                        }
                    })

                }
                else {
                    throw new TRPCError({ code: "NOT_FOUND", message: "Mail not found" })
                }
            }


        }),


    Join: publicProcedure
        .input(z.string())
        .mutation(async ({ ctx, input }) => {
            const groupidCheck = await ctx.db.group.findUnique({
                where: {
                    id: input
                },
                include: {
                    users: true
                }
            })

            if (!groupidCheck) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Group not found"
                })
            }
            else {

                await ctx.db.group.update({
                    where: {
                        id: input
                    },
                    data: {
                        users: {
                            connect: {
                                id: ctx.userId
                            }
                        }
                    }
                })
            }
        }
        ),


    GetGroupOnId: publicProcedure
        .input(z.object({
            groupId: z.string()
        }))
        .query(async ({ ctx, input }) => {
            const group = await ctx.db.group.findUnique({
                where: {
                    id: input.groupId
                }
            })

            if (group) {
                return group
            }
            else {
                throw new TRPCError({ code: "NOT_FOUND", message: "Group Not Found" })
            }
        }),

        GetGroupOnIdmutate: publicProcedure
        .input(z.object({
            groupId: z.string()
        }))
        .mutation(async ({ ctx, input }) => {
            const group = await ctx.db.group.findUnique({
                where: {
                    id: input.groupId
                }
            })

            if (group) {
                return group
            }
            else {
                throw new TRPCError({ code: "NOT_FOUND", message: "Group Not Found" })
            }
        })
})
