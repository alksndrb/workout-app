"use client";
import { useState } from "react";
import { handleLogin } from "../services/loginService";

export default function Login() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;

    setLoading(true);
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
          Password: <input name="password" type="password" />
          <br />
          <button type="submit">Login</button>
        </form>
        {error && <p>{error}</p>}
      </div>
    </>
  );
}
