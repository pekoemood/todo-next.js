import { NextResponse } from "next/server";

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
}

export interface ApiResponse<T> {
  data: T;
  status: "success" | "error";
  count?: number;
  message?: string;
  code?: string;
}

export interface ErrorResponse {
  status: "error";
  message: string;
  code?: string;
}

export type UsersApiResponse = ApiResponse<User[]>;

export async function GET(): Promise<NextResponse<UsersApiResponse>> {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!res.ok) {
      throw new Error(`External API error:${res.status}`);
    }

    const users: User[] = await res.json();
    return NextResponse.json({
      data: users,
      status: "success",
      count: users.length,
    });
  } catch (error) {
    return NextResponse.json(
      {
        data: [],
        status: "error",
        message: "Internal server error",
        code: "FETCH_ERROR",
      },
      { status: 500 },
    );
  }
}
