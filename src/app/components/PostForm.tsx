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
    <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded">
      <h2 className="text-lg font-semibold">新しい記事を投稿</h2>
      <input
        type="text"
        value={title}
        placeholder="タイトル"
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <textarea
        placeholder="本文"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        追加
      </button>
    </form>
  );
}
