"use client";
import { useEffect, useState } from "react";

import { handleAddExercise } from "../services/exerciseService";

import { UserHeader } from "@/components/userComponents/userComponents";
import { GreenLine } from "@/components/styleComponents/styleComponents";
import {
  ExerciseDuration,
  ExerciseInput,
  ExerciseSelect,
  ExerciseSubmitButton,
  ExerciseTextArea,
  NavLink,
} from "@/components/inputComponents/inputComponents";

export default function AddExercise() {
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(null);
  //check if user is logged in
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
    let exercise = {
      name: e.target.elements.name.value,
      type: e.target.elements.type.value,
      calories: e.target.elements.calories.value,
      difficulty: e.target.elements.difficulty.value,
      fatigue: e.target.elements.fatigue.value,
      date: e.target.elements.date.value,
      time: e.target.elements.time.value,
    };
    setError("");
    for (const property in exercise) {
      if (exercise[property] === "") {
        setError(`Please enter exercise ${property}`);
        return;
      }
    }
    if (duration === 0) {
      setError("Please enter exercise duration");
      return;
    }
    exercise = { ...exercise, duration, notes: e.target.elements.notes.value };
    const result = await handleAddExercise(userId, exercise);
    if (!result.error) {
      alert("Success");
      window.location.href = "/user";
    }
  }
  const exerciseTypes = ["cardio", "core", "strength", "felxibility"];
  const numValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <>
      <div>
        <UserHeader></UserHeader>
        <GreenLine />
        <form onSubmit={handleSubmit} className=" max-w-[1200px] m-auto">
          <div className="text-xl py-2 font-semibold border-b-2">
            Add new exercise
          </div>
          <ExerciseInput name="name" type="text" label="Name" />
          <ExerciseSelect
            name="type"
            label="Type"
            options={exerciseTypes}
            placeholder="Select type of exercise"
          />
          <ExerciseInput name="calories" type="number" label="Calories" />
          <ExerciseSelect
            name="difficulty"
            label="Difficulty"
            options={numValues}
            placeholder="Select difficulty"
            maxWidth="200px"
          />
          <ExerciseSelect
            name="fatigue"
            label="Fatigue"
            options={numValues}
            placeholder="Select fatigue"
            maxWidth="200px"
          />
          <ExerciseDuration
            label="Duration"
            nameMin="durationMin"
            nameSec="durationSec"
          />
          <ExerciseInput
            name="date"
            type="date"
            label="Date"
            maxWidth="200px"
          />
          <ExerciseInput
            name="time"
            type="time"
            label="Time"
            maxWidth="200px"
          />
          <ExerciseTextArea name="notes" label="Note" />
          <ExerciseSubmitButton value="Add new exercise" />
          <span className="ml-10">
            <NavLink src={"/user"} value="Back" />
          </span>
          {error && <p>{error}</p>}
        </form>
        <GreenLine />
      </div>
    </>
  );
}
