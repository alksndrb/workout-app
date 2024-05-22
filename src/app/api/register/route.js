import dbConnect from "@/app/lib/dbConnection";
import User from "@/app/lib/models/user";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { username, password } = await request.json();
    //connect to db
    await dbConnect();
    //check if username already exists and return error if ti does
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return new NextResponse(
        JSON.stringify({ error: "Username already exists" }),
        { status: 400 }
      );
    }
    //create and save new user
    const newUser = new User({ username, password });
    await newUser.save();
    //return userId
    return new NextResponse(JSON.stringify({ userId: newUser._id }), {
      status: 201,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: "Error creating user" }), {
      status: 500,
    });
  }
}
