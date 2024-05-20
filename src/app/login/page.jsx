"use client";
import { useEffect, useState } from "react";
import { handleLogin } from "../services/loginService";
import Link from "next/link";
import { checkUser } from "../services/userServices";
import {
  ErrorMessage,
  FormBox,
  FormButton,
  FormMessage,
  TextInput,
} from "@/components/inputComponents/inputComponents";

export default function Login() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //redirect to user page if user is already logged in
  /* useEffect(() => {
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
  }, []); */

  async function handleSubmit(e) {
    e.preventDefault();
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;

    /* setLoading(true); */
    try {
      const result = await handleLogin(username, password);
      if (result.error) {
        setError(result.error);
      } else {
        localStorage.setItem("userId", result.userId);
        window.location.href = "/user";
      }
    } catch (error) {
      setError("An error occured during login");
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
