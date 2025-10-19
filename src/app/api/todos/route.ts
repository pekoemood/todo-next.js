import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/client";
import type { Todo } from "@/generated/prisma";

export interface TodoResponse {
  data: Todo[];
}

export async function GET(): Promise<NextResponse<TodoResponse>> {
  const todos: Todo[] = await prisma.todo.findMany();
  return NextResponse.json({ data: todos });
}
