"use client";
import { useEffect, useState } from "react";
import { handleRegister } from "../services/registerService";
import Link from "next/link";
import { checkUser } from "../services/userServices";
import { set } from "mongoose";

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
    }
    if (password.length < 3) {
      setError("Password must have at least 3 characters");
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
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
        <form onSubmit={handleSubmit}>
          Username: <input name="username" type="text" />
          <br />
          Password: <input name="password" type="password" />
          <br />
          Confirm password: <input name="confirmPassword" type="password" />
          <br />
          <button type="submit">Register</button>
        </form>
        {error && <p>{error}</p>}
        <p>
          Have Account? Login{" "}
          <Link href="/login" className="text-red-500">
            Here
          </Link>
        </p>
      </div>
    </>
  );
}
