import { TodoResponse } from "../api/todos/route";
import TodoForm from "./_component/TodoForm";

export default async function Example() {
  const baseUrl = process.env.BASE_URL;

  const response = await fetch(`${baseUrl}/api/todos`);
  const { data: todos }: TodoResponse = await response.json();

  return (
    <div className="mx-auto max-w-7xl px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900">Todoリスト</h1>
      <TodoForm />
      <ul className="mt-6">
        {todos.map((todo) => (
          <li key={todo.id}>{todo.name}</li>
        ))}
      </ul>
    </div>
  );
}
