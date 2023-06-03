import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // const shoppingHistory = await prisma.shoppingHistory.create({
  //   data: {
  //     userId: "6476c49e9aa0419172d0d901",
  //     title: "Summer spl",
  //     status: "completed",
  //     shoppingIds: ["64779ecbf10401ba5720bceb"],
  //   },
  // });
  const shoppingHistory = await prisma.shoppingHistory.findMany({
    where: {
      userId: "6476c49e9aa0419172d0d901",
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      createdAt: true,
      status: true,
      shoppingItems: true,
    },
  });
  console.log(JSON.stringify(shoppingHistory));
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
