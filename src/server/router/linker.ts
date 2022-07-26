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
          userId: ctx.session?.user?.id,
        },
      });
      return newLinker;
    },
  })
  .query("getAllLinkersOfUser", {
    resolve: async ({ ctx }) => {
      const linkers = await ctx.prisma.linker.findMany({
        where: { userId: ctx.session?.user?.id },
      });

      return linkers;
    },
  })
  .query("getLinker", {
    input: z.object({
      slug: z.string(),
    }),
    resolve: async ({ input, ctx }) => {
      const linker = await ctx.prisma.linker.findUnique({
        where: { slug: input.slug },
      });
      if (!linker) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
      const links = await ctx.prisma.link.findMany({
        where: { linkerId: linker.id },
      });
      return { linker, links };
    },
  });
