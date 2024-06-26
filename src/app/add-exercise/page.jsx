"use client";
import { useEffect, useState } from "react";
import { handleAddExercise } from "../services/exerciseService";
import { UserHeader } from "@/components/userComponents";
import { GreenLine } from "@/components/styleComponents";
import { ErrorMessage, NavLink } from "@/components/inputComponents";
import { checkUser } from "../services/userServices";
import {
  ExerciseDuration,
  ExerciseInput,
  ExerciseSelect,
  ExerciseSubmitButton,
  ExerciseTextArea,
} from "@/components/exerciseComponents";

export default function AddExercise() {
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  //initalize exercise object so all properties are empty strings
  const [exercise, setExercise] = useState({
    name: "",
    type: "",
    calories: "",
    difficulty: "",
    fatigue: "",
    duration: "",
    date: "",
    time: "",
    notes: "",
  });
  //check if user is logged in
  async function checkUserInnit() {
    try {
      //check for saved userId
      const storedUserId = localStorage.getItem("userId");
      if (!storedUserId) {
        window.location.href = "/login";
      }
      setUserId(storedUserId);
      // check if user is in db
      const result = await checkUser(storedUserId);
      if (result.error) {
        window.location.href = "/login";
      } else setUsername(result.username);
    } catch (error) {
      console.error("Error getting user: ", error);
    }
  }
  useEffect(() => {
    checkUserInnit();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    // remove previously set errors
    setError("");
    //validate input values
    for (const property in exercise) {
      //note is allowed to be empty
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
    //save the exercise to db
    const result = await handleAddExercise(userId, exercise);
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
            Add new exercise
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
          <ExerciseSubmitButton value="Add new exercise" />
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
