import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

type tododat = {
  id: string,
  title: string,
  description: string,
  date: Date | null | undefined,
  done: boolean,
  user: object,
  group?: object
}


export const todoRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      date: z.date().optional().nullish(),
      teamId: z.string().optional()
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        const todoData: tododat = {
          id: input.id,
          title: input.title,
          description: input.description,
          date: input.date,
          done: false,
          user: {
            connect: {
              id: ctx.userId,
            },
          },
        };

        if (input.teamId) {
          todoData.group = {
            connect: {
              id: input.teamId,
            },
          };
        }

        await ctx.db.todo.create({
          data: todoData,
        });
      }
      catch (err) {
        console.log(err)
      }
    }),

  getTodos: publicProcedure
    .query(async ({ ctx }) => {
      const todos = await ctx.db.todo.findMany({
        where: {
          userId: ctx.userId
        },
        orderBy : [
          {
            date : "asc"
          }
        ]
      })
      return {
        count: todos.length,
        data: todos.map((td) => {
          return {
            id: td.id,
            title: td.title,
            description: td.description,
            date: td.date,
            done: td.done,
            userid: td.userId,
            groupid: td.groupId
          }
        })
      }
    }
    ),

  updateTodo: publicProcedure
  .input(z.object({
    done: z.boolean(),
    taskId: z.string()
  }))
  .mutation(async({ctx,input})=>{

    const todoexist = await ctx.db.todo.update({
      where : {
        userId : ctx.userId,
        id : input.taskId
      },
      data : {
        done : input.done
      }
    
    })
    if(todoexist){
    return {
      todoexist
    }}
    else {
      throw new TRPCError({code : "NOT_FOUND",message : "Todo not found"})
    }
  })
})