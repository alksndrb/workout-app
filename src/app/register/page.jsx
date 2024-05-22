"use client";
import { useEffect, useState } from "react";

import Link from "next/link";
import { checkUser, handleRegister } from "../services/userServices";
import {
  ErrorMessage,
  FormBox,
  FormButton,
  FormMessage,
  TextInput,
} from "@/components/inputComponents";

export default function Register() {
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  async function fetchData() {
    try {
      const userId = localStorage.getItem("userId");

      const result = await checkUser(userId);

      if (result.status === "ok") {
        window.location.href = "/user";
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  }
  //redirect to user page if user is already logged in
  useEffect(() => {
    fetchData();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;
    const confirmPassword = e.target.elements.confirmPassword.value;
    //add validation for username and password

    if (username.length < 3) {
      setError("Username must have at least 3 characters");
      return;
    }
    if (password.length < 3) {
      setError("Password must have at least 3 characters");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const result = await handleRegister(username, password);
      if (result.error) {
        setError(result.error);
      } else {
        alert("Registration successful");
        localStorage.setItem("userId", result.userId);
        window.location.href = "/user";
      }
    } catch (error) {
      setError("An error occured during registration");
    }
  }
  //for handling state change of input fields
  function handleChange(e) {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  }
  return (
    <>
      <div>
        <form
          onSubmit={handleSubmit}
          className="flex justify-center pt-[100px]"
        >
          <FormBox>
            <TextInput
              name="username"
              label="Username"
              type="text"
              value={user.username}
              onChange={handleChange}
            />
            <TextInput
              name="password"
              label="Password"
              type="password"
              value={user.password}
              onChange={handleChange}
            />
            <TextInput
              name="confirmPassword"
              label="Confirm password"
              type="password"
              value={user.confirmPassword}
              onChange={handleChange}
            />
            <FormButton value="Register" type="submit" />
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </FormBox>
        </form>
        <FormMessage>
          <p>
            Already have an account? Log in{" "}
            <Link href="/login" className="text-accent text-bold">
              Here
            </Link>
          </p>
        </FormMessage>
      </div>
    </>
  );
}
