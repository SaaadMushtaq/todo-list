import { NextResponse } from "next/server";
import { users } from "../../../lib/users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const POST = async (req) => {
  try {
    const { username, password } = await req.json();

    const user = users.find((u) => u.username === username);
    if (!user) {
      return new NextResponse(JSON.stringify(users), {
        status: 401,
        headers: { "Access-Control-Allow-Origin": "*" },
      });
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return new NextResponse("Invalid username or password", {
        status: 401,
        headers: { "Access-Control-Allow-Origin": "*" },
      });
    }

    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });

    return NextResponse.json(
      { message: "Login successful", token },
      {
        status: 200,
        headers: { "Access-Control-Allow-Origin": "*" },
      }
    );
  } catch (error) {
    return new NextResponse("Invalid request", {
      status: 400,
      headers: { "Access-Control-Allow-Origin": "*" },
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
