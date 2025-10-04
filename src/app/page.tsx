"use client";

import { useState } from "react";
import PostForm from "./components/PostForm";
import Link from "next/link";

type Post = {
  id: number;
  title: string;
  body: string;
};

export default function Home() {
  const [posts, setPosts] = useState([
    { id: 1, title: "テスト投稿", body: "これはテスト投稿です" },
  ]);

  const addPost = (title: string, body: string) => {
    setPosts((prev) => [...prev, { id: posts.length + 1, title, body }]);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">ブログ一覧</h1>
      <PostForm addPost={addPost} />

      <ul className="mt-6 space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="border p-4 rounded">
            <Link href={`/posts/${post.id}`}>
              <h2 className="text-lg font-semibold">{post.title}</h2>
            </Link>
            <p className="text-gray-600">{post.body}</p>
          </li>
        ))}
        <li>hi</li>
      </ul>
    </div>
  );
}
