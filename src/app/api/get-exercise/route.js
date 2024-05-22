import dbConnect from "@/app/lib/dbConnection";
import User from "@/app/lib/models/user";
import Exercise from "@/app/lib/models/exercise";
import { NextResponse } from "next/server";
import { Types } from "mongoose";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const exerciseId = searchParams.get("exerciseId");
    const userId = searchParams.get("userId");
    //check if userId exists and is valid
    if (!userId || !Types.ObjectId.isValid(userId)) {
      return new NextResponse(
        JSON.stringify({ error: "Invalid or missing userId" }, { status: 400 })
      );
    }
    //check if exerciseId exists and is valid
    if (!exerciseId || !Types.ObjectId.isValid(exerciseId)) {
      return new NextResponse(
        JSON.stringify(
          { error: "Invalid or missing exerciseId" },
          { status: 400 }
        )
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
    //find exercise in db and return error if exercise doesnt exist
    const exercise = await Exercise.findOne({ _id: exerciseId, user: userId });
    if (!exercise) {
      return new NextResponse(
        JSON.stringify(
          {
            error: "Exercise not found or does not belong to the user",
          },
          { status: 404 }
        )
      );
    }
    //return username and exercise if tis found
    return new NextResponse(
      JSON.stringify({ username: user.username, exercise: exercise }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Error in getting exercise" }, { status: 500 })
    );
  }
}
