import { NextRequest, NextResponse } from "next/server";
import { todos } from "../../../lib/todos";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

interface Params {
  params: {
    id: string;
  };
}

export const DELETE = async (
  req: NextRequest,
  { params }: Params
): Promise<NextResponse> => {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader?.startsWith("Bearer ")) {
      return new NextResponse("Unauthorized", {
        status: 401,
        headers: { "Access-Control-Allow-Origin": "*" },
      });
    }

    const token = authHeader.split(" ")[1];
    jwt.verify(token, JWT_SECRET);

    const paramsData = await params;
    const { id } = paramsData;
    const index = todos.findIndex((todo) => todo.id === id);

    if (index === -1) {
      return new NextResponse(
        `Todo with id ${id} not found in todos ${JSON.stringify(todos)}`,
        {
          status: 404,
          headers: { "Access-Control-Allow-Origin": "*" },
        }
      );
    }

    todos.splice(index, 1);

    return new NextResponse("Todo deleted", {
      status: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  } catch {
    return new NextResponse("Invalid or expired token", {
      status: 401,
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  }
};

export const OPTIONS = async (): Promise<NextResponse> => {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Authorization, Content-Type",
    },
  });
};
