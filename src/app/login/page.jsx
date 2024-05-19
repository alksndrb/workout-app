"use client";
import { useEffect, useState } from "react";
import { handleLogin } from "../services/loginService";
import Link from "next/link";
import { checkUser } from "../services/userServices";

export default function Login() {
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
        <form onSubmit={handleSubmit}>
          Username: <input name="username" type="text" />
          <br />
          Password: <input name="password" type="password" />
          <br />
          <button type="submit">Login</button>
        </form>
        {error && <p>{error}</p>}
        <p>
          No Account? Register{" "}
          <Link href="/register" className="text-red-500">
            Here
          </Link>
        </p>
      </div>
    </>
  );
}
