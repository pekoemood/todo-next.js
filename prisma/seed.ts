import { Prisma, PrismaClient } from "@/generated/prisma";
import * as argon2 from "argon2";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  await prisma.post.deleteMany();
  await prisma.todo.deleteMany();

  const todo1 = await prisma.todo.create({
    data: {
      name: "ドクタートラストの志望動機作成",
    },
  });

  const todo2 = await prisma.todo.create({
    data: {
      name: "ランニングする",
    },
  });
  console.log("シードデータの読み込み完了");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
