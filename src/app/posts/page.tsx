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
      <header className="mb-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-gray900 text-3xl font-bold tracking-tight">
            Posts
          </h1>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ul>
          {posts.map((post: Post) => (
            <Link key={post.id} href={`/posts/${post.id}`}>
              <li>{post.title}</li>
            </Link>
          ))}
        </ul>
      </main>
    </div>
  );
}
