import { createRouter } from "./context";
import { z } from "zod";

export const exampleRouter = createRouter()
  .query("hello", {
    input: z.object({
      text: z.string(),
    }),
    resolve({ input }) {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    },
  })
  .mutation("storeMessage", {
    input: z.object({
      message: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      const newMessage = await ctx.prisma.testingMessage.create({
        data: { message: input.message },
      });
      return newMessage;
    },
  })
  .query("getAllMessages", {
    resolve: async ({ ctx }) => {
      const messages = await ctx.prisma.testingMessage.findMany({});
      return messages;
    },
  });
