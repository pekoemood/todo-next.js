"use client";

import { useState } from "react";

export default function PostForm({
  addPost,
}: {
  addPost: (title: string, body: string) => void;
}) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !body) return;
    addPost(title, body);
    setTitle("");
    setBody("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded border p-4">
      <h2 className="text-lg font-semibold">新しい記事を投稿</h2>
      <input
        type="text"
        value={title}
        placeholder="タイトル"
        onChange={(e) => setTitle(e.target.value)}
        className="w-full rounded border p-2"
      />
      <textarea
        placeholder="本文"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="w-full rounded border p-2"
      />
      <button
        type="submit"
        className="rounded bg-blue-500 px-4 py-2 text-white"
      >
        追加
      </button>
    </form>
  );
}
