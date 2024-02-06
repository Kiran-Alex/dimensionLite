import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { clerkClient } from "@clerk/nextjs";
import { TRPCError } from "@trpc/server";

export const IntegrationRouter = createTRPCRouter({
    TokenRegister:publicProcedure
    .input(z.string())
    .mutation(async({ctx,input})=>{
      const user =await clerkClient.users.getUser(ctx.userId)
      const username =  user.firstName+" "+user.lastName || ""
     await ctx.db.user.create({
            data : {
                id : ctx.userId,
                name : username,
                authToken : input
            }
        })

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
       
    })


})