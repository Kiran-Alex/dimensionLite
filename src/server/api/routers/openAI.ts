import { z } from "zod";
import { LLMChain } from "langchain/chains"
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { OpenAI } from "@langchain/openai";
import { PromptTemplate } from "langchain/prompts"



const model = new OpenAI({
    openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
    modelName: "gpt-3.5-turbo",
    temperature: 0.5,
})



export const openaiRouter = createTRPCRouter({

    taskCategorizer: publicProcedure
        .input(z.object({
            title: z.string(),
            description: z.string().optional()
        }))
        .mutation(async ({ ctx, input }) => {
            console.log("control reached here")
            const template = `
            Given the title: {title} and description: {description}, select the relevant tag from the Project type array : [Web,Cloud,Mobile,Desktop,Server,Other] and Project Tag array : [Bug,Feature,Improvement,Refactor,Other] . Ensure to choose only one of the most suitable tags based on the provided arrays. Answer with the selected tag only; no need for explanations. If the title and description are empty, return "Other".
OUTPUT FORMAT: JSon Object with the selected tag as the value of the key "Project_Type" and "Project_Tag`

            const prompt = new PromptTemplate({
                template,
                inputVariables: ["title", "description"]
            })

            const chain = new LLMChain({
                prompt,
                llm: model
            })

            const response = await chain.call({

                title: input.title,
                description: input.description

            })

            return {
                response: response

            }
        })


})