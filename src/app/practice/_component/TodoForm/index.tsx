"use client";

import { useActionState, useEffect, useState, useTransition } from "react";
import { newAddTodo } from "../../_actions/todo-actions";
import { Todo } from "@/generated/prisma";

export interface ActionState {
  success: boolean;
  error?: string;
  todo?: Todo;
}

export default function TodoForm() {
  const [state, formAction, isPending] = useActionState(newAddTodo, {
    success: false,
    error: undefined,
    todo: undefined,
  });

  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    if (state.success || state.error) {
      setShowMessage(true);

      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [state.success, state.error]);

  return (
    <div>
      <form className="mt-6" action={formAction}>
        <div className="max-w-2xl">
          <label
            htmlFor="todo"
            className="block text-sm/6 font-medium text-gray-900"
          >
            タスク
          </label>
          <div className="flex items-center gap-2">
            <input
              id="todo"
              name="todo"
              type="text"
              placeholder="今日のやるべきことを入力しよう！"
              className="out-line-gray-300 block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 disabled:opacity-50 sm:text-sm/6"
              disabled={isPending}
            />
            <button
              type="submit"
              className="shrink-0 rounded-lg bg-indigo-600 px-3 py-1.5 font-semibold text-white"
            >
              {isPending ? "追加中..." : "追加"}
            </button>
          </div>
        </div>
      </form>
      {state.success && showMessage && (
        <div className="mt-4 rounded-md border border-green-200 bg-green-50 p-4 text-green-800">
          {state.todo?.name}を追加しました
        </div>
      )}

      {state.error && showMessage && (
        <div
          id="todo-error"
          className="mt-4 rounded-md border border-red-200 bg-red-50 p-4 text-red-800"
        >
          {state.error}
        </div>
      )}
    </div>
  );
}
