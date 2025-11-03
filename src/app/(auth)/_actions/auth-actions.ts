"use server";

import { redirect } from "next/navigation";
import { prisma } from "../../../../prisma/client";
import * as z from "zod";
import bcrypt from "bcryptjs";
import {
  createSession,
  deleteSession,
  validateSessionToken,
} from "@/app/lib/auth";
import { cookies } from "next/headers";
import { error } from "console";
import { fi } from "zod/locales";

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

const LoginUser = z.object({
  email: z.email("有効なメールアドレスを入力してください"),
  password: z.string().min(1, "パスワードを入力してください"),
});

export type ActionResult = {
  success: boolean;
  fieldErrors?: Record<string, string[]>;
  message?: string;
};

export async function signin(
  prevState: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const formObject = Object.fromEntries(formData);
  const result = User.safeParse(formObject);
  if (!result.success) {
    const fieldErrors = z.flattenError(result.error).fieldErrors;
    return { success: false, fieldErrors: fieldErrors };
  }

  const exists = await prisma.user.findUnique({
    where: { email: result.data.email },
  });
  if (exists) {
    return {
      success: false,
      fieldErrors: { email: ["このメールアドレスは既に登録されています"] },
    };
  }

  try {
    const hashedPassword = await bcrypt.hash(result.data.password, 10);
    const user = await prisma.user.create({
      data: {
        name: result.data.name,
        email: result.data.email,
        password: hashedPassword,
      },
    });

    const session = await createSession(user.id);
    const cookieStore = await cookies();
    cookieStore.set("sessionToken", session.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
    });
  } catch (error) {
    return { success: false, message: "登録に失敗しました" };
  }
  redirect("/");
}

export async function logout() {
  const sessionToken = (await cookies()).get("sessionToken")?.value;
  if (!sessionToken) return null;
  const session = await validateSessionToken(sessionToken);
  if (!session) return null;
  await deleteSession(session.id);
  (await cookies()).delete("sessionToken");
  redirect("/");
}

export async function login(
  prevState: ActionResult,
  formData: FormData,
): Promise<ActionResult | undefined> {
  const formObject = Object.fromEntries(formData);
  const result = LoginUser.safeParse(formObject);
  if (!result.success) {
    const fieldErrors = z.flattenError(result.error).fieldErrors;
    return { success: false, fieldErrors: fieldErrors };
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
        password: true,
      },
    });

    if (!user) return { success: false, message: "ログインに失敗しました" };

    const isMatch = await bcrypt.compare(result.data.password, user.password);

    if (!isMatch) return { success: false, message: "ログインに失敗しました" };

    const session = await createSession(user.id);
    const cookieStore = await cookies();
    cookieStore.set("sessionToken", session.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
    });
    redirect("/pokemon");
  } catch (error) {
    return { success: false, message: "ログインに失敗しました" };
  }
}
