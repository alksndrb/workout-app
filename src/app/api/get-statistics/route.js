import dbConnect from "@/app/lib/dbConnection";
import User from "@/app/lib/models/user";
import Exercise from "@/app/lib/models/exercise";
import { Types } from "mongoose";
import { NextResponse } from "next/server";
import { getWeekOfTheMonth } from "@/app/services/exerciseService";
//convert to GET method - see DELETE
export async function POST(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const { monthYear } = await request.json();
    console.log(monthYear);
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
    //get all exercises
    const exercises = await Exercise.find({ user: new Types.ObjectId(userId) });
    // filter exercises by selcted month
    const filteredExercises = exercises.filter(
      (exercise) => monthYear === exercise.date.slice(0, 7)
    );
    //sort exercies in the weeks of the month
    const exercisesByWeek = {};
    filteredExercises.forEach((exercise) => {
      const weekOfMonth = getWeekOfTheMonth(exercise.date);
      if (!exercisesByWeek[weekOfMonth]) {
        exercisesByWeek[weekOfMonth] = [];
      }
      exercisesByWeek[weekOfMonth].push(exercise);
    });
    // get statistics for each week
    const statistics = [];
    let weekNum = 0;
    for (const week in exercisesByWeek) {
      statistics[weekNum] = {
        week: week,
        totalDuration: 0,
        totalNumber: 0,
      };

      let difficultySum = 0;
      let fatigueSum = 0;
      for (const exercise in exercisesByWeek[week]) {
        const ex = exercisesByWeek[week][exercise];
        statistics[weekNum].totalDuration += ex.duration;
        statistics[weekNum].totalNumber++;
        difficultySum += ex.difficulty;
        fatigueSum += ex.fatigue;
      }

      statistics[weekNum].avgDifficulty =
        difficultySum / statistics[weekNum].totalNumber;
      statistics[weekNum].avgFatigue =
        fatigueSum / statistics[weekNum].totalNumber;

      weekNum++;
    }

    return new NextResponse(JSON.stringify({ statistics: statistics }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
