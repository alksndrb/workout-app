"use client";
import { useEffect, useState } from "react";

import { UserHeader } from "@/components/userComponents";
import { GreenLine } from "@/components/styleComponents";
import {
  ExerciseDuration,
  ExerciseInput,
  ExerciseSelect,
  ExerciseSubmitButton,
  ExerciseTextArea,
} from "@/components/exerciseComponents";
import { getExercise, updateExercise } from "@/app/services/exerciseService";
import { NavLink } from "@/components/inputComponents";

export default function EditExercise({ params }) {
  const [error, setError] = useState("");
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState("");
  const [exercise, setExercise] = useState({});

  //check if user is logged and fetch innit data of exercise
  async function fetchData() {
    try {
      //check for saved userId
      const storedUserId = localStorage.getItem("userId");
      if (!storedUserId) {
        window.location.href = "/login";
      }
      setUserId(storedUserId);
      //fetch exercise from the db for inital values
      const result = await getExercise(storedUserId, params.slug);
      if (result.error) {
        window.location.href = "/login";
      } else {
        setUsername(result.username);
        setExercise(result.exercise);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  async function handleSubmit(e) {
    e.preventDefault();
    // remove previously set errors
    setError("");
    //validate input values
    for (const property in exercise) {
      if (property === "notes") {
        break;
      }
      if (exercise["duration"] === 0) {
        setError(`Please enter exercise duration`);
        return;
      }
      if (exercise[property] === "") {
        setError(`Please enter exercise ${property}`);
        return;
      }
    }
    const result = await updateExercise(userId, exercise);

    if (!result.error) {
      alert("Success");
      window.location.href = "/user";
    }
  }
  //for handling state change of input fields
  function handleChange(e) {
    const { name, value } = e.target;
    setExercise((prevExercise) => ({
      ...prevExercise,
      [name]: value,
    }));
  }
  //types of exercises
  const exerciseTypes = ["cardio", "core", "strength", "felxibility"];
  // allowed values for difficulty and fatigue
  const numValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <>
      <div>
        <UserHeader username={username}></UserHeader>
        <GreenLine />
        <form onSubmit={handleSubmit} className=" max-w-[1200px] m-auto">
          <div className="text-xl py-2 font-semibold border-b-2">
            Edit exercise
          </div>
          <ExerciseInput
            name="name"
            type="text"
            label="Name"
            value={exercise.name}
            onChange={handleChange}
          />
          <ExerciseSelect
            name="type"
            label="Type"
            options={exerciseTypes}
            placeholder="Select type of exercise"
            value={exercise.type}
            onChange={handleChange}
          />
          <ExerciseInput
            name="calories"
            type="number"
            label="Calories"
            value={exercise.calories}
            onChange={handleChange}
          />
          <ExerciseSelect
            name="difficulty"
            label="Difficulty"
            options={numValues}
            placeholder="Select difficulty"
            maxWidth="200px"
            value={exercise.difficulty}
            onChange={handleChange}
          />
          <ExerciseSelect
            name="fatigue"
            label="Fatigue"
            options={numValues}
            placeholder="Select fatigue"
            maxWidth="200px"
            value={exercise.fatigue}
            onChange={handleChange}
          />
          <ExerciseDuration
            label="Duration"
            nameMin="durationMin"
            nameSec="durationSec"
            value={exercise.duration}
            setExercise={setExercise}
          />
          <ExerciseInput
            name="date"
            type="date"
            label="Date"
            maxWidth="200px"
            value={exercise.date}
            onChange={handleChange}
          />
          <ExerciseInput
            name="time"
            type="time"
            label="Time"
            maxWidth="200px"
            value={exercise.time}
            onChange={handleChange}
          />
          <ExerciseTextArea
            name="notes"
            label="Notes"
            value={exercise.notes}
            onChange={handleChange}
          />
          <ExerciseSubmitButton value="Edit exercise" />
          <span className="ml-10">
            <NavLink src={"/user"} value="Back" />
          </span>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </form>
        <GreenLine />
      </div>
    </>
  );
}
