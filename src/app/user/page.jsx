"use client";
import { useEffect, useState } from "react";
import { getUserExercises } from "../services/userServices";
import {
  DateComponent,
  Exercise,
  ExerciseComponent,
  UserHeader,
  UserPageNav,
} from "@/components/userComponents/userComponents";
import { deleteExercise } from "../services/exerciseService";

export default function UserPage() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  //  check if user is logged in
  async function fetchData() {
    try {
      const userId = localStorage.getItem("userId");

      const result = await getUserExercises(userId);
      if (result.error) {
        window.location.href = "/login";
        throw new Error(result.error);
      } else {
        setUserData(result);
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  async function handleDelete(exerciseId) {
    const userId = localStorage.getItem("userId");
    /* console.log(userId);
    console.log(exerciseId); */
    await deleteExercise(userId, exerciseId);
    await fetchData();
  }
  if (loading) {
    // Render loading indicator or placeholder content while fetching data
    return <p>Loading...</p>;
  }

  if (userData) {
    // construct the exercises
    const exercises = userData.exercises.map((exercise, i, arr) => {
      const isDifferentDate = i > 0 && exercise.date !== arr[i - 1].date;
      return (
        <div key={exercise._id}>
          {(i === 0 || isDifferentDate) && (
            <DateComponent date={exercise.date} />
          )}
          <ExerciseComponent
            id={exercise._id}
            name={exercise.name}
            type={exercise.type}
            duration={exercise.duration}
            calories={exercise.calories}
            difficulty={exercise.difficulty}
            fatigue={exercise.fatigue}
            date={exercise.date}
            time={exercise.time}
            notes={exercise.notes}
            handleDelete={handleDelete}
          />
        </div>
      );
    });

    return (
      <>
        <div>
          <UserHeader username={userData.username} />

          <UserPageNav />
          {exercises}
        </div>
      </>
    );
  }
}
