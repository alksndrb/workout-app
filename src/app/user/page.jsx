"use client";
import { useEffect, useState } from "react";

import {
  DateComponent,
  ExerciseComponent,
  UserHeader,
  UserPageNav,
} from "@/components/userComponents";
import { deleteExercise, getUserExercises } from "../services/exerciseService";

export default function UserPage() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  //  check if user is logged in
  async function fetchData() {
    try {
      const storedUserId = localStorage.getItem("userId");
      if (!storedUserId) {
        window.location.href = "/login";
      }
      setUserId(storedUserId);
      const result = await getUserExercises(storedUserId);
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
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this exercis?"
    );
    if (isConfirmed) {
      await deleteExercise(userId, exerciseId);
      await fetchData();
    }
  }
  if (loading) {
    // Render loading indicator or placeholder content while fetching data
    return <p>Loading...</p>;
  }
  //Add message when there are no exercises to display
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
          {exercises.length === 0 && (
            <p className="max-w-[1200px] m-auto text-lg">
              You have no saved exercises
            </p>
          )}
          {exercises}
        </div>
      </>
    );
  }
}
