import Link from "next/link";

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export default async function Posts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts: Post[] = await res.json();

  return (
    <div className="py-10">
      <header>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Posts
          </h1>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ul role="list" className="divide-y divide-gray-200">
          {posts.map((post) => (
            <li
              key={post.id}
              className="flex items-center justify-between gap-x-6 py-5"
            >
              <div className="min-w-0">
                <div className="flex items-start gap-x-3">
                  <p className="text-sm/6 font-semibold text-gray-900">
                    {post.title}
                  </p>
                </div>
                <div className="mt-1 flex items-center gap-x-2 text-xs/5 text-gray-500">
                  <p className="truncate">{post.body}</p>
                </div>
              </div>
              <div className="flex flex-none items-center gap-x-4">
                <Link
                  href={`/posts/${post.id}`}
                  className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 sm:block"
                >
                  View detail
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
