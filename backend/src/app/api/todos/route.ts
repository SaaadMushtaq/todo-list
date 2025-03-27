import { NextRequest, NextResponse } from "next/server";
import { todos } from "../../lib/todos";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const GET = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new NextResponse("Unauthorized", {
        status: 401,
        headers: { "Access-Control-Allow-Origin": "*" },
      });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, JWT_SECRET as string);

    return NextResponse.json(todos, {
      status: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  } catch (error) {
    return new NextResponse("Invalid or expired token", {
      status: 401,
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  }
};

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new NextResponse("Unauthorized", {
        status: 401,
        headers: { "Access-Control-Allow-Origin": "*" },
      });
    }

    const token = authHeader.split(" ")[1];
    jwt.verify(token, JWT_SECRET as string);

    const data = await req.json();
    const { text }: { text: string } = data;
    if (!text) {
      return new NextResponse("Text is required", {
        status: 400,
        headers: { "Access-Control-Allow-Origin": "*" },
      });
    }

    const newTodo = {
      id: String(Date.now()),
      text,
    };
    todos.push(newTodo);

    return NextResponse.json(newTodo, {
      status: 201,
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return new NextResponse("Invalid or expired token", {
        status: 401,
        headers: { "Access-Control-Allow-Origin": "*" },
      });
    }

    return new NextResponse("Internal Server Error", {
      status: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  }
};

export const OPTIONS = async (): Promise<NextResponse> => {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Authorization, Content-Type",
    },
  });
};
