//move to exercises services

export async function handleLogin(username, password) {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: username, password: password }),
  });

  const result = await res.json();
  return result;
}
export async function handleRegister(username, password) {
  const res = await fetch("api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: username, password: password }),
  });

  const result = await res.json();
  return result;
}
// check if user is logged in
export async function checkUser(userId) {
  const res = await fetch(`api/check-user?userId=${userId}`);

  const result = await res.json();
  return result;
}
export function handleLogOut() {
  localStorage.removeItem("userId");
  window.location.href = "/login";
}
