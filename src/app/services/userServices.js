export async function getUserExercises(userId) {
  const res = await fetch(`api/user?userId=${userId}`);

  const result = await res.json();
  return result;
}
export function handleLogOut() {
  localStorage.removeItem("userId");
  window.location.href = "/login";
}
