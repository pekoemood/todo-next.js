"use client";

import { use } from "react";

export default function Post({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  return <h1>hello{id}</h1>;
}
