import { User, UsersApiResponse } from "../api/hello/route";

export default async function Example() {
  const baseUrl = process.env.BASE_URL;

  try {
    const response = await fetch(`${baseUrl}/api/hello`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const apiResponse: UsersApiResponse = await response.json();

    if (apiResponse.status === "error") {
      throw new Error(apiResponse.message || "API Error");
    }

    const users = apiResponse.data;

    return (
      <div className="mx-auto max-w-7xl px-8 py-8">
        <h1 className="text-4xl font-bold">Email List</h1>
        <div className="mt-10 items-center space-y-2 divide-y divide-gray-200">
          {users.map((user) => (
            <div key={user.id} className="rounded-lg py-4">
              <p className="text-2xl font-bold">{user.name}</p>
              <p>{user.email}</p>
              <p>{user.address.city}</p>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="mx-auto mt-10 max-w-7xl px-8">
        <div className="text-red-500">
          <h1 className="text-xl font-bold">Error</h1>
          <p>{error.message}</p>
        </div>
      </div>
    );
  }
}
