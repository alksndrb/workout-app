"use client";
import { useEffect, useState } from "react";

import Link from "next/link";
import { checkUser, handleLogin } from "../services/userServices";
import {
  ErrorMessage,
  FormBox,
  FormButton,
  FormMessage,
  TextInput,
} from "@/components/inputComponents";

export default function Login() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  //redirect to user page if user is already logged in
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
  useEffect(() => {
    fetchData();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const result = await handleLogin(user.username, user.password);
      if (result.error) {
        setError(result.error);
      } else {
        localStorage.setItem("userId", result.userId);
        window.location.href = "/user";
      }
    } catch (error) {
      setError("An error occured during login");
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

  if (loading) {
    // Render loading indicator or placeholder content while fetching data
    return <p>Loading...</p>;
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
            <FormButton value="Log in" type="submit" />
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </FormBox>
        </form>
        <FormMessage>
          <p>
            No Account? Register{" "}
            <Link href="/register" className="text-accent text-bold">
              Here
            </Link>
          </p>
        </FormMessage>
      </div>
    </>
  );
}
