import dbConnect from "@/app/lib/dbConnection";
import User from "@/app/lib/models/user";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    await dbConnect();
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return new NextResponse(
        JSON.stringify({ error: "Username already exists" }),
        { status: 400 }
      );
    }

    const newUser = new User({ username, password });
    await newUser.save();

    return new NextResponse(JSON.stringify({ userId: newUser._id }), {
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
