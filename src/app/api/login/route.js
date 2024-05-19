import dbConnect from "@/app/lib/dbConnection";
import User from "@/app/lib/models/user";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { username, password } = await request.json();
    await dbConnect();

    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return new NextResponse(
        JSON.stringify({ error: "Invalid username or password" }),
        { status: 401 }
      );
    }
    return new NextResponse(
      JSON.stringify({
        userId: user._id,
      }),
      { status: 200 }
    );
  } catch {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
