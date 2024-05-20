"use client";
import { useEffect, useState } from "react";
import { handleRegister } from "../services/registerService";
import Link from "next/link";
import { checkUser } from "../services/userServices";
import {
  ErrorMessage,
  FormBox,
  FormButton,
  FormMessage,
  TextInput,
} from "@/components/inputComponents/inputComponents";

export default function Register() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //redirect to user page if user is already logged in
  useEffect(() => {
    async function fetchData() {
      try {
        const userId = localStorage.getItem("userId");

        const result = await checkUser(userId);

        if (result.status === "ok") {
          window.location.href = "/user";
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;
    const confirmPassword = e.target.elements.confirmPassword.value;
    //add validation for username and password
    /* setLoading(true); */
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
    } finally {
      /* setLoading(false); */
    }
  }

  if (loading) {
    // Render loading indicator or placeholder content while fetching data
    return <p>Loading...</p>;
  }
  //add style to the component
  return (
    <>
      <div>
        <form
          onSubmit={handleSubmit}
          className="flex justify-center pt-[100px]"
        >
          <FormBox>
            <TextInput name="username" label="Username" type="text" />
            <TextInput name="password" label="Password" type="password" />
            <TextInput
              name="confirmPassword"
              label="Confirm password"
              type="password"
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
