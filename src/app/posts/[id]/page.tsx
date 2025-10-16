import type { Post } from "../page";

export default async function Post({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const post: Post = await res.json();

  return (
    <div className="py-10">
      <header className="mb-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Post
          </h1>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-2xl font-semibold text-gray-600">{post.title}</p>
        <p className="text-gray-500">{post.body}</p>
      </main>
    </div>
  );
}
