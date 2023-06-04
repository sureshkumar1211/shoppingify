import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // const shoppingHistory = await prisma.shoppingHistory.create({
  //   data: {
  //     userId: "6476c49e9aa0419172d0d901",
  //     title: "Summer-3 spl",
  //     status: "completed",
  //     purchaseItems: {
  //       create: [
  //         { quantity: 2, shoppingId: "64779ecbf10401ba5720bceb" },
  //         { quantity: 2, shoppingId: "6477a199f10401ba5720bcf5" },
  //       ],
  //     },
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
      purchaseItems: true,
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
