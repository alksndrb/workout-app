export async function getUserExercises(userId) {
  const res = await fetch(`api/user?userId=${userId}`);

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
