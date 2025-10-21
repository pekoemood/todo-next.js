"use client";

import { Todo } from "@/generated/prisma";
import { useTransition } from "react";
import { deleteTodo } from "../../_actions/todo-actions";

export default function TodoItem({ todo }: { todo: Todo }) {
  const [isPending, startTransition] = useTransition();

  const handleClickDelete = (todoId: number) => {
    const confirmed = confirm(`${todo.name}を削除しますか？`);

    if (confirmed) {
      startTransition(async () => {
        await deleteTodo(todoId);
      });
    }
  };

  return (
    <li className="flex items-center justify-between space-y-8">
      <p>{todo.name}</p>
      <div className="flex items-center gap-4">
        <button className="rounded-lg bg-indigo-400 px-3 py-1.5 font-semibold text-white hover:bg-indigo-600">
          編集
        </button>
        <button
          onClick={() => handleClickDelete(todo.id)}
          className="rounded-lg bg-red-400 px-3 py-1.5 font-semibold text-white hover:bg-red-600 disabled:opacity-50"
          disabled={isPending}
        >
          {isPending ? "削除中..." : "削除"}
        </button>
      </div>
    </li>
  );
}
