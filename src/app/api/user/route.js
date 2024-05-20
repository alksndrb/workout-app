import dbConnect from "@/app/lib/dbConnection";
import User from "@/app/lib/models/user";
import { NextResponse } from "next/server";
import { Types } from "mongoose";
import Exercise from "@/app/lib/models/exercise";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    //check to see if userId is valid
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

    const exercises = await Exercise.find({ user: new Types.ObjectId(userId) });
    // sort the exercises, decending
    const sortedExercises = exercises.sort((a, b) => {
      // compare by date in descending order
      const dateComparison = b.date.localeCompare(a.date);
      if (dateComparison !== 0) {
        return dateComparison;
      }

      // if dates are the same, compare by time in descending order
      return b.time.localeCompare(a.time);
    });
    return new NextResponse(
      JSON.stringify({ username: user.username, exercises: sortedExercises }),
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
