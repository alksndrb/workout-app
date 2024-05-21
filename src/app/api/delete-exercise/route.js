import dbConnect from "@/app/lib/dbConnection";
import User from "@/app/lib/models/user";
import Exercise from "@/app/lib/models/exercise";
import { NextResponse } from "next/server";
import { Types } from "mongoose";

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const exerciseId = searchParams.get("exerciseId");
    const userId = searchParams.get("userId");

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return new NextResponse(
        JSON.stringify({ error: "Invalid or missing userId" }, { status: 400 })
      );
    }
    if (!exerciseId || !Types.ObjectId.isValid(exerciseId)) {
      return new NextResponse(
        JSON.stringify(
          { error: "Invalid or missing exerciseId" },
          { status: 400 }
        )
      );
    }

    console.log("waiting to connect");
    await dbConnect();

    const user = await User.findById(userId);
    if (!user) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }
    console.log(user);
    const exercise = await Exercise.findOne({ _id: exerciseId, user: userId });

    if (!exercise) {
      JSON.stringify(
        {
          message: "Exercise not found or does not belong to the user",
        },
        { status: 404 }
      );
    }

    await Exercise.findByIdAndDelete(exerciseId);
    return new NextResponse(JSON.stringify({ message: "Exercise deleted" }), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify(
        { message: "Error in deleting note", error },
        { status: 500 }
      )
    );
  }
}
