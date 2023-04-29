import { TrainingType } from "@prisma/client";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const trainingRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        referenceMilliseconds: z.number(),
        type: z.nativeEnum(TrainingType),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const record = await ctx.prisma.training.create({
        data: {
          userId: ctx.session.user.id,
          type: input.type,
          referenceMilliseconds: input.referenceMilliseconds,
        },
      });
      return record;
    }),
});
