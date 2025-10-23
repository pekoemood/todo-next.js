"use server";

import { prisma } from "../../../../prisma/client";
import { revalidatePath } from "next/cache";
import type { Todo } from "@/generated/prisma";
import { ActionState } from "../_component/TodoForm";

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

export async function newAddTodo(
  prevState: ActionState,
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
    return { success: false, error: "タスクの作成に失敗しました" };
  }
}

export async function deleteTodo(todoId: number): Promise<void> {
  try {
    await prisma.todo.delete({
      where: {
        id: todoId,
      },
    });
    revalidatePath("/practice");
  } catch (error) {
    console.error("Todo削除エラー:", error);

    if (error instanceof Error) {
      if (error.message.includes("Record to delete does not exist")) {
        throw new Error("該当するタスクが見つかりません");
      }
    }
    throw new Error("削除に失敗しました");
  }
}

export async function updateTodo(
  todoId: number,
  todoName: string,
): Promise<void> {
  try {
    await prisma.todo.update({
      where: {
        id: todoId,
      },
      data: {
        name: todoName,
      },
    });
    revalidatePath("/practice");
  } catch (error) {
    console.error("Todo更新エラー", error);
    throw new Error("更新に失敗しました");
  }
}
