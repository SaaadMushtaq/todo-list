import { NextResponse } from "next/server";
import { users } from "../../../lib/users";
import bcrypt from "bcryptjs";

export const POST = async (req) => {
  try {
    const { firstName, lastName, username, password } = await req.json();

    const exists = users.find((u) => u.username === username);
    if (exists) {
      return new NextResponse("User already exists", {
        status: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    users.push({ firstName, lastName, username, passwordHash });

    return new NextResponse("User created", {
      status: 201,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    return new NextResponse("Invalid request", {
      status: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
};

export const OPTIONS = async () => {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
};
