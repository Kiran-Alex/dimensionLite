import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { clerkClient } from "@clerk/nextjs";
import { TRPCError } from "@trpc/server";

export const GroupRouter = createTRPCRouter({

    Create : publicProcedure
    .input(z.object({
        groupId : z.string(),
        groupName : z.string(),
    }))
    .mutation(async({ctx,input})=>{
        await ctx.db.group.create({
            data : {
                id : input.groupId,
                name : input.groupName,
                users : {
                    connect : {
                        id : ctx.userId
                    }
                },
            }
        })
    }),


  Join : publicProcedure
  .input(z.string())
  .mutation(async({ctx,input})=>{
    const groupidCheck = await ctx.db.group.findUnique({
        where : {
            id : input
        }
    })

    if(!groupidCheck){
        throw new TRPCError({
            code :"NOT_FOUND",
            message : "Group not found"
        })
    }
    else{
        
    }
    }
    )
})