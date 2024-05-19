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
    const duration =
      Number(e.target.elements.durationMin.value * 60) +
      Number(e.target.elements.durationSec.value);

    const exercise = {
      name: e.target.elements.name.value,
      type: e.target.elements.type.value,
      duration: duration,
      calories: e.target.elements.calories.value,
      difficulty: e.target.elements.difficulty.value,
      fatigue: e.target.elements.fatigue.value,
      notes: e.target.elements.notes.value,
      date: e.target.elements.date.value,
      time: e.target.elements.time.value,
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
            name="durationMin"
            placeholder="min"
            min="0"
            type="number"
            className="border-solid border-black border-b-2"
          />
          :
          <input
            name="durationSec"
            type="number"
            min="0"
            max="59"
            placeholder="sec"
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
          Date:{" "}
          <input
            name="date"
            type="date"
            className="border-solid border-black border-b-2"
          />
          <br />
          Time:{" "}
          <input
            name="time"
            type="time"
            className="border-solid border-black border-b-2"
          />
          <br />
          Notes: <br />
          <textarea
            name="notes"
            type="string"
            className="border-solid border-black border-b-2"
          />{" "}
          <br />
          <button type="submit">Add new exercise</button>
          <Link href="/user">Back</Link>
        </form>
        {error && <p>{error}</p>}
      </div>
    </>
  );
}
