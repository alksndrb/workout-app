//move to user services
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
