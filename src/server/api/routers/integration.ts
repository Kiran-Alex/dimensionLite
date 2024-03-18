import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { clerkClient } from "@clerk/nextjs";
import { TRPCError } from "@trpc/server";

export const IntegrationRouter = createTRPCRouter({
    TokenRegister:publicProcedure
    .input(z.string())
    .mutation(async({ctx,input})=>{

        const userexists =  await ctx.db.user.findUnique({
            where : {
                id : ctx.userId
            }
        })
        const user =await clerkClient.users.getUser(ctx.userId)
        const username =  user.firstName+" "+user.lastName || ""
        const mail  =  user.emailAddresses[0]?.emailAddress 

        if(!userexists ) {
           
           await ctx.db.user.create({
                  data : {
                      id : ctx.userId,
                      name : username,
                      authToken : input,
                      mail  :mail!,
                  }
              })
        }
        else {
            await  ctx.db.user.update({
                where: {
                    id: ctx.userId
                },
                data: {
                    authToken : input
                }
            })
        }
    }),


    RetreiveToken:publicProcedure
    .query(async({ctx})=>{
            
        const user =await ctx.db.user.findUnique({
            where : {
                id : ctx.userId
            }
        })
      


        if (user !== undefined) {
            return {
                vercelAuthToken : user?.authToken
            }
        }
        else {
            throw new TRPCError({code : "BAD_REQUEST",message : "AuthToken Error"})
        }
       
    }),


    GithubTokenRegister:publicProcedure
    .input(z.string())
    .mutation(async({ctx,input})=>{

        const userexists =  await ctx.db.user.findUnique({
            where : {
                id : ctx.userId
            }
        })
        const user =await clerkClient.users.getUser(ctx.userId)
        const username =  user.firstName+" "+user.lastName || ""
        const mail  =  user.emailAddresses[0]?.emailAddress 

        if(!userexists ) {
           
           await ctx.db.user.create({
                  data : {
                      id : ctx.userId,
                      name : username,
                      githubAuthToken : input,
                      mail  :mail!,
                  }
              })
        }
        else {
            await  ctx.db.user.update({
                where: {
                    id: ctx.userId
                },
                data: {
                    githubAuthToken : input
                }
            })
        }
    }),


    GithubRetreiveToken:publicProcedure
    .query(async({ctx})=>{
            
        const user =await ctx.db.user.findUnique({
            where : {
                id : ctx.userId
            }
        })
      


        if (user !== undefined) {
            return {
                githubAuthToken : user?.githubAuthToken 
            }
        }
        else {
            throw new TRPCError({code : "BAD_REQUEST",message : "GithubAuthToken Error"})
        }
       
    })


})