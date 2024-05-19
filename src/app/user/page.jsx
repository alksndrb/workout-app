"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getUserExercises, handleLogOut } from "../services/userServices";

export default function UserPage() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    fetchData();
  }, []);

  if (loading) {
    // Render loading indicator or placeholder content while fetching data
    return <p>Loading...</p>;
  }

  if (userData) {
    const exercises = userData.exercises.map((exercise) => (
      <span key={exercise._id} id={exercise._id}>
        <hr />
        name: {exercise.name} <br />
        type: {exercise.type} <br />
        duration: {String(Math.floor(exercise.duration / 60)).padStart(2, "0")}
        min:{String(exercise.duration % 60).padStart(2, "0")}sec
        <br />
        calories: {exercise.calories} <br />
        difficulty: {exercise.difficulty} <br />
        fatigue: {exercise.fatigue} <br />
        date: {exercise.date} <br />
        time: {exercise.time} <br />
        notes: {exercise.notes} <br />
      </span>
    ));

    return (
      <>
        <div>
          <h1>User Page</h1>
          <p>Username: {userData.username}</p>
        </div>
        {exercises}
        <hr />
        <Link href="/add-exercise">Add new exercise</Link>
        <button onClick={handleLogOut}>Log out</button>
      </>
    );
  }
}
