"use client";
import { useEffect, useState } from "react";

import Link from "next/link";
import { handleAddExercise } from "../services/addExerciseService";

export default function AddExercise() {
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (!storedUserId) {
      window.location.href = "/login";
    }
    setUserId(storedUserId);
  }, []);
  async function handleSubmit(e) {
    e.preventDefault();

    const exercise = {
      name: e.target.elements.name.value,
      type: e.target.elements.type.value,
      duration: e.target.elements.duration.value,
      calories: e.target.elements.calories.value,
      difficulty: e.target.elements.difficulty.value,
      fatigue: e.target.elements.fatigue.value,
      notes: e.target.elements.notes.value,
    };

    const result = await handleAddExercise(userId, exercise);
    if (result.error) {
      setError(result.error);
    } else {
      alert("Success");
      window.location.href = "/user";
    }
  }

  return (
    <>
      <div>
        Adding new exercise
        <form onSubmit={handleSubmit}>
          Name:{" "}
          <input
            name="name"
            type="text"
            className="border-solid border-black border-b-2"
          />
          <br />
          Type:{" "}
          <input
            name="type"
            type="text"
            className="border-solid border-black border-b-2"
          />
          <br />
          Duration:{" "}
          <input
            name="duration"
            type="text"
            className="border-solid border-black border-b-2"
          />
          <br />
          Calories:{" "}
          <input
            name="calories"
            type="number"
            className="border-solid border-black border-b-2"
          />
          <br />
          Difficulty:{" "}
          <input
            name="difficulty"
            type="number"
            className="border-solid border-black border-b-2"
          />
          <br />
          Fatigue:{" "}
          <input
            name="fatigue"
            type="number"
            className="border-solid border-black border-b-2"
          />
          <br />
          Notes:{" "}
          <input
            name="notes"
            type="string"
            className="border-solid border-black border-b-2"
          />
          <br />
          <button type="submit">Add new exercise</button>
          <Link href="/user">Back</Link>
        </form>
        {error && <p>{error}</p>}
      </div>
    </>
  );
}
