import dbConnect from "@/app/lib/dbConnection";
import User from "@/app/lib/models/user";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { username, password } = await request.json();
    //connect to db
    await dbConnect();
    //check if user exist and password matches
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return new NextResponse(
        JSON.stringify({ error: "Invalid username or password" }),
        { status: 401 }
      );
    }
    //return userId
    return new NextResponse(
      JSON.stringify({
        userId: user._id,
      }),
      { status: 200 }
    );
  } catch {
    return new NextResponse(JSON.stringify({ error: "Error loging in" }), {
      status: 500,
    });
  }
}
