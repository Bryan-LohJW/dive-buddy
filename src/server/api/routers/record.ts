import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const recordRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.record.findMany();
  }),
  getByUserId: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.record.findMany({
      where: { userId: ctx.session.user.id },
      orderBy: { createdAt: "desc" },
    });
  }),
  getLatest: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.record.findFirst({ orderBy: { createdAt: "desc" } });
  }),
  create: protectedProcedure
    .input(z.object({ milliseconds: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const record = await ctx.prisma.record.create({
        data: {
          userId: ctx.session.user.id,
          milliseconds: input.milliseconds,
        },
      });
      return record;
    }),
});
