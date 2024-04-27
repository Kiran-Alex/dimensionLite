import { z } from "zod";
import axios from "axios";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { clerkClient } from "@clerk/nextjs";
import { TRPCError } from "@trpc/server";


interface access_token_response {
    access_token: string
    token_type: string
    scope: string
}


export const IntegrationRouter = createTRPCRouter({
    TokenRegister: publicProcedure
        .input(z.string())
        .mutation(async ({ ctx, input }) => {

            const userexists = await ctx.db.user.findUnique({
                where: {
                    id: ctx.userId
                }
            })
            const user = await clerkClient.users.getUser(ctx.userId)
            const username = user.firstName + " " + user.lastName || ""
            const mail = user.emailAddresses[0]?.emailAddress

            if (!userexists) {

                await ctx.db.user.create({
                    data: {
                        id: ctx.userId,
                        name: username,
                        authToken: input,
                        mail: mail!,
                    }
                })
            }
            else {
                await ctx.db.user.update({
                    where: {
                        id: ctx.userId
                    },
                    data: {
                        authToken: input
                    }
                })
            }
        }),


    RetreiveToken: publicProcedure
        .query(async ({ ctx }) => {

            const user = await ctx.db.user.findUnique({
                where: {
                    id: ctx.userId
                }
            })



            if (user !== undefined) {
                return {
                    vercelAuthToken: user?.authToken
                }
            }
            else {
                throw new TRPCError({ code: "BAD_REQUEST", message: "AuthToken Error" })
            }

        }),


    GithubTokenRegister: publicProcedure
        .input(z.string())
        .mutation(async ({ ctx, input }) => {

            const userexists = await ctx.db.user.findUnique({
                where: {
                    id: ctx.userId
                }
            })
            const user = await clerkClient.users.getUser(ctx.userId)
            const username = user.firstName + " " + user.lastName || ""
            const mail = user.emailAddresses[0]?.emailAddress

            if (!userexists) {

                await ctx.db.user.create({
                    data: {
                        id: ctx.userId,
                        name: username,
                        githubAuthToken: input,
                        mail: mail!,
                    }
                })
            }
            else {
                await ctx.db.user.update({
                    where: {
                        id: ctx.userId
                    },
                    data: {
                        githubAuthToken: input
                    }
                })
            }
        }),


    GithubRetreiveToken: publicProcedure
        .query(async ({ ctx }) => {

            const user = await ctx.db.user.findUnique({
                where: {
                    id: ctx.userId
                }
            })

            try {
                if (user !== undefined) {
                    return {
                        githubAuthToken: user?.githubAuthToken
                    }
                }
                else {
                    throw new TRPCError({ code: "BAD_REQUEST", message: "GithubAuthToken Error" })
                }
            }
            catch (err) {
                throw new TRPCError({ code: "BAD_REQUEST", message: "GithubAuthToken Error" })
            }



        }),


    getGitAccessTokenandRegister: publicProcedure
        .input(z.object({
            code: z.string()
        }))
        .mutation(async ({ ctx, input }) => {
            const code = input.code
            const client_id = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID
            const clientSecret = process.env.GITHUB_CLIENT_SECRET
            const user = await clerkClient.users.getUser(ctx.userId)
            const username = user.firstName + " " + user.lastName || ""
            const mail = user.emailAddresses[0]?.emailAddress
            try {
                await axios.post(`https://github.com/login/oauth/access_token`, {}, {
                    params: {
                        client_id: client_id,
                        client_secret: clientSecret,
                        code: code,
                    },
                    headers: {
                        Accept: "application/json"
                    }
                }).then(async (res: { data: access_token_response }) => {
                    if (res.data.access_token !== undefined && res.data.access_token !== null) {

                        const userexists = await ctx.db.user.findUnique({
                            where: {
                                id: ctx.userId
                            }
                        })
                        if (!userexists) {

                            await ctx.db.user.create({
                                data: {
                                    id: ctx.userId,
                                    name: username,
                                    githubAuthToken: res.data.access_token,
                                    mail: mail!,
                                }
                            })
                        }
                        else {
                            console.log("updating token")
                            await ctx.db.user.update({
                                where: {
                                    id: ctx.userId
                                },
                                data: {
                                    githubAuthToken: res.data.access_token
                                }
                            })
                        }

                    }
                    else {
                        throw new TRPCError({ code: "BAD_REQUEST", message: "Token is undefined or null" })
                    }

                }).catch((err) => {
                    console.log(err)
                    console.log("error in fetching token")
                })
            }
            catch (err) {
                console.log(err)

            }
        })


})