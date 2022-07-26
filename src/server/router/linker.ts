import { TRPCError } from "@trpc/server";
import { createRouter } from "./context";
import { z } from "zod";
import slug from "slug";

export const linkerRouter = createRouter()
  .middleware(async ({ ctx, next }) => {
    // Any queries or mutations after this middleware will
    // raise an error unless there is a current session
    if (!ctx.session) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next();
  })
  .mutation("create", {
    input: z.object({
      name: z.string(),
      description: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      const newLinker = await ctx.prisma.linker.create({
        data: {
          name: input.name,
          description: input.description,
          slug: slug(input.name),
        },
      });
      return newLinker;
    },
  })
  .query("getAllLinkers", {
    resolve: async ({ ctx }) => {
      const Linkers = await ctx.prisma.linker.findMany({});
      return Linkers;
    },
  });
