import dbConnect from "@/app/lib/dbConnection";
import User from "@/app/lib/models/user";
import Exercise from "@/app/lib/models/exercise";
import { NextResponse } from "next/server";
import { Types } from "mongoose";

export async function PATCH(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const body = await request.json();
    const {
      _id,
      name,
      type,
      duration,
      calories,
      difficulty,
      fatigue,
      date,
      time,
      notes,
    } = body;
    //check if userId exists and is valid
    if (!userId || !Types.ObjectId.isValid(userId)) {
      return new NextResponse(
        JSON.stringify({ error: "Invalid or missing userId" }, { status: 400 })
      );
    }
    //check if exerciseId exists and is valid
    if (!_id || !Types.ObjectId.isValid(_id)) {
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
    const exercise = await Exercise.findOne({ _id: _id, user: userId });
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
    //find and update the exercise
    const updatedExercise = await Exercise.findByIdAndUpdate(
      _id,
      {
        name,
        type,
        duration,
        calories,
        difficulty,
        fatigue,
        date,
        time,
        notes,
      },
      { new: true }
    );

    return new NextResponse(
      JSON.stringify(
        { message: "Exercise updated", exercise: updatedExercise },
        { status: 200 }
      )
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Error updating exercise" }, { status: 500 })
    );
  }
}
