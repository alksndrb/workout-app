"use client";
import { useState } from "react";
import { handleRegister } from "../services/registerService";

export default function Register() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;
    //add validation for username and password
    setLoading(true);
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
      setLoading(false);
    }
  }
  //create a loading component

  //add style to the component
  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          Username: <input name="username" type="text" />
          <br />
          Password: <input name="password" type="text" />
          <br />
          <button type="submit">Register</button>
        </form>
        {error && <p>{error}</p>}
      </div>
    </>
  );
}
