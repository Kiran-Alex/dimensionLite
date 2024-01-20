import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";


const outputParser = new StringOutputParser();

const chatModel = new ChatOpenAI({
    openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
    temperature:0
});

const prompt = ChatPromptTemplate.fromMessages([
    ["system", "you are a world class technical document writer who summarizes the conversations"],
    ["user", "{input}"],
]);


const chain = prompt.pipe(chatModel).pipe(outputParser);

export const openaiRouter = createTRPCRouter({
    summarizer: publicProcedure
        .input(z.object({
            texts : z.array(z.string())
        }))
        .mutation(async({ input }) => {
                const k = await chain.invoke({
                  input: input.texts
                });
                console.log(k)

                return k
        })
})