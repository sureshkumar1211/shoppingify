import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const categories = await prisma.category.create({
    data: {
      name: "Fruites and vegetables",
      userId: "6476c49e9aa0419172d0d901",
    },
  });
  console.log(JSON.stringify(categories));
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
