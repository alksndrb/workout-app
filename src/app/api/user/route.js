import dbConnect from "@/app/lib/dbConnection";
import User from "@/app/lib/models/user";
import { NextResponse } from "next/server";
import { Types } from "mongoose";
import Exercise from "@/app/lib/models/exercise";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    //check to see if useId is valid
    if (!userId || !Types.ObjectId.isValid(userId)) {
      return new NextResponse(
        JSON.stringify({ error: "Invalid or missing userId" }),
        { status: 400 }
      );
    }

    await dbConnect();
    //check to see if user is in database
    const user = await User.findById(userId);
    if (!user) {
      return new NextResponse(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }
    //return the user - change later to return users exercies
    const exercises = await Exercise.find({ user: new Types.ObjectId(userId) });
    return new NextResponse(
      JSON.stringify({ username: user.username, exercises: exercises }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return new NextResponse(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
