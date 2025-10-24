"use client";

import { Todo } from "@/generated/prisma";
import { useOptimistic, useState, useTransition } from "react";
import { deleteTodo, updateTodo } from "../../_actions/todo-actions";

export default function TodoItem({ todo }: { todo: Todo }) {
  const [isPending, startTransition] = useTransition();
  const [editMode, setEditMode] = useState(false);
  const [text, setText] = useState(todo.name);
  const [isTime, Transition] = useTransition();
  const [optimistic, addOptimistic] = useOptimistic(
    todo,
    (currentTodo, newName: string) => ({
      ...currentTodo,
      name: newName,
    }),
  );

  const handleClickDelete = (todoId: number) => {
    const confirmed = confirm(`${todo.name}を削除しますか？`);

    if (confirmed) {
      startTransition(async () => {
        try {
          await deleteTodo(todoId);
        } catch (error) {
          alert("削除に失敗しました");
        }
      });
    }
  };

  const handleClickUpdate = (id: number, name: string) => {
    Transition(async () => {
      addOptimistic(name);
      await updateTodo(id, name);
    });
    setEditMode(false);
  };

  return (
    <li className="flex items-center justify-between space-y-8">
      {editMode ? (
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={todo.name}
          className="rounded-md border border-gray-200 px-2"
        />
      ) : (
        <p>{optimistic.name}</p>
      )}
      <div className="flex items-center gap-4">
        {editMode ? (
          <button
            className="rounded-lg bg-indigo-400 px-3 py-1.5 font-semibold text-white hover:bg-indigo-600"
            onClick={() => handleClickUpdate(todo.id, text)}
          >
            保存
          </button>
        ) : (
          <button
            className="rounded-lg bg-indigo-400 px-3 py-1.5 font-semibold text-white hover:bg-indigo-600"
            onClick={() => setEditMode(!editMode)}
          >
            編集
          </button>
        )}
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
