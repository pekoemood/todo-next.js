"use server";

import { redirect } from "next/navigation";
import { prisma } from "../../../../prisma/client";
import * as z from "zod";
import bcrypt from "bcryptjs";

const User = z.object({
  name: z.string().min(1, "名前は必須です").max(50, "名前は50文字以内"),
  email: z.email("有効なメールアドレスを入力してください"),
  password: z
    .string()
    .min(4, "パスワードは4文字以上")
    .max(100, "パスワードは100文字以内")
    .regex(/[A-Z]/, "英大文字を含めてください")
    .regex(/[a-z]/, "英小文字を含めてください")
    .regex(/[0-9]/, "数字を含めてください"),
});

type UserSchema = z.infer<typeof User>;

export async function signin(prevState: UserSchema, formData: FormData) {
  const formObject = Object.fromEntries(formData);
  const result = User.safeParse(formObject);
  if (!result.success) {
    return { error: result.error };
  }

  const exists = await prisma.user.findUnique({
    where: { email: result.data.email },
  });
  if (exists) {
    return { error: { email: "このメールアドレスは既に登録されています" } };
  }

  try {
    const hashedPassword = await bcrypt.hash(result.data.password, 10);
    await prisma.user.create({
      data: {
        name: result.data.name,
        email: result.data.email,
        password: hashedPassword,
      },
    });
  } catch (error) {
    return { error: "登録に失敗しました" };
  }
  redirect("/");
}
