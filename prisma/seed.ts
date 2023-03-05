import { prisma } from "../src/server/db";
import { TrainingType } from "@prisma/client";

async function main() {
  const id = "1";
  await prisma.user.upsert({
    where: {
      id,
    },
    create: {
      id,
      name: "Diver Boy",
      email: "diverboy@gmail.com",
      image:
        "https://cdn.dribbble.com/users/947358/screenshots/15822222/media/d11254b9e017be1b6cd0723ba8295839.png?compress=1&resize=400x300",
    },
    update: {},
  });

  await prisma.record.upsert({
    where: {
      id,
    },
    create: {
      id,
      userId: id,
      milliseconds: 60000,
    },
    update: {},
  });

  await prisma.training.upsert({
    where: {
      id,
    },
    create: {
      id,
      userId: id,
      referenceMilliseconds: 60000,
      type: TrainingType.CO2,
    },
    update: {},
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
