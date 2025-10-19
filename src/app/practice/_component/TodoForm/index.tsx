"use client";

import { useState, useTransition } from "react";
import { addTodo } from "../../_actions/todo-actions";

export default function TodoForm() {
  const [todo, setTodo] = useState<string>();
  const [message, setMessage] = useState<{
    type: "succee" | "error";
    text: string;
  } | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      const result = await addTodo(formData);

      if (result.success) {
        setMessage({ type: "succee", text: "タスクを追加しました" });
        setTodo("");
      } else {
        setMessage({
          type: "error",
          text: result.error || "エラーが発生しました",
        });
      }
    });
  };

  return (
    <form className="mt-6" action={handleSubmit}>
      <div className="max-w-2xl">
        <label
          htmlFor="todo"
          className="block text-sm/6 font-medium text-gray-900"
        >
          タスク
        </label>
        <input
          id="todo"
          name="todo"
          type="text"
          onChange={(e) => setTodo(e.target.value)}
          placeholder="今日のやるべきことを入力しよう！"
          className="out-line-gray-300 block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        />
        <button
          type="submit"
          className="mt-2 rounded-lg bg-indigo-600 px-5 py-1.5 font-semibold text-white"
        >
          追加
        </button>
      </div>
    </form>
  );
}
