import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { clerkClient } from "@clerk/nextjs";
import { TRPCError } from "@trpc/server";
import { getServerAuthToken } from "@cord-sdk/server";
export const tokenRouter = createTRPCRouter({ 

    serverToken : publicProcedure
    .query(async({ctx})=>{

        if(process.env.NEXT_PUBLIC_CORD_APPLICATION_ID!== undefined && process.env.NEXT_PUBLIC_CORD_SECRET!== undefined){
            const token = getServerAuthToken(process.env.NEXT_PUBLIC_CORD_APPLICATION_ID, process.env.NEXT_PUBLIC_CORD_SECRET)
            console.log(token)
            return {
                token
            }
        }
        else {
            throw new TRPCError({code : "NOT_FOUND", message : "Application ID and Secret not found"})
        }
       
    })

})