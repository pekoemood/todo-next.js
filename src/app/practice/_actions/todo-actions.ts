"use server";

import { prisma } from "../../../../prisma/client";
import { revalidatePath } from "next/cache";
import type { Todo } from "@/generated/prisma";

export async function addTodo(
  formData: FormData,
): Promise<{ success: boolean; todo?: Todo; error?: string }> {
  try {
    const todoName = formData.get("todo");

    if (!todoName || typeof todoName !== "string") {
      return { success: false, error: "タスク名を入力してください" };
    }

    const newTodo = await prisma.todo.create({
      data: {
        name: todoName.trim(),
      },
    });

    revalidatePath("/practice");

    return { success: true, todo: newTodo };
  } catch (error) {
    console.error("Todo作成エラー:", error);
    return { success: false, error: "タスクの作成に失敗しました" };
  }
}
