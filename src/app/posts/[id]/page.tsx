"use client";

import { use } from "react";

export default function Post({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  return (
    <>
      <div className="container mx-auto">
        <div className="inline-flex bg-red-500">
          <span>🔵</span>
          <span>🔴</span>
        </div>
        <div>ここは記事{id}</div>
      </div>
    </>
  );
}
