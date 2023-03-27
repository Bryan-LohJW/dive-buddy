import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { prisma } from "~/server/db";

export const recordRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.record.findMany();
  }),
  getByUserId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.record.findMany({ where: { id: input.id } });
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
