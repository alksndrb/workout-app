import dbConnect from "@/app/lib/dbConnection";
import User from "@/app/lib/models/user";
import { NextResponse } from "next/server";
import { Types } from "mongoose";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    //check if userId exists and is valid
    if (!userId || !Types.ObjectId.isValid(userId)) {
      return new NextResponse(
        JSON.stringify({ error: "Invalid or missing userId" }),
        { status: 400 }
      );
    }
    //connect to db
    await dbConnect();
    //find user in db and return error if user doesnt exist
    const user = await User.findById(userId);
    if (!user) {
      return new NextResponse(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }
    //return status ok and username if user exists in db
    return new NextResponse(
      JSON.stringify({ status: "ok", username: user.username }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return new NextResponse(
      { error: "Error in checking user" },
      { status: 500 }
    );
  }
}
