import dbConnect from "@/app/lib/dbConnection";
import Exercise from "@/app/lib/models/exercise";
import User from "@/app/lib/models/user";
import { Types } from "mongoose";

import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { searchParams } = new URL(request.url);

    const userId = searchParams.get("userId");

    const body = await request.json();

    const { name, type, duration, calories, difficulty, fatigue, notes } = body;

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return new NextResponse(
        JSON.stringify({ error: "Invalid or missing userId" }),
        { status: 400 }
      );
    }

    await dbConnect();

    const user = await User.findById(userId);
    if (!user) {
      return new NextResponse(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    const newExercise = new Exercise({
      user: new Types.ObjectId(userId),
      name,
      type,
      duration,
      calories,
      difficulty,
      fatigue,
      notes,
    });

    await newExercise.save();

    return new NextResponse(
      JSON.stringify({ message: "Exercise created", exercise: newExercise }),
      { status: 201 }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Error in creating new exercise" }),
      { status: 500 }
    );
  }
}
