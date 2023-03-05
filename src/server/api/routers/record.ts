import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const recordRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.record.findMany();
  }),
  getByUserId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.record.findMany({ where: { id: input.id } });
    }),
});
