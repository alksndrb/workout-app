export async function handleAddExercise(userId, exercise) {
  const res = await fetch(`api/add-exercise?userId=${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(exercise),
  });

  const result = await res.json();
  return result;
}
export function formatDate(dateString) {
  // Parse the date string
  const date = new Date(dateString);

  // Get the day, day of the week, month, and year
  const day = date.getDate();
  const dayOfWeek = date.toLocaleString("default", { weekday: "long" });
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  // Format the date string as "DD day of week MM YYYY"
  return `${day} ${month} ${year}`;
}
export function formatDateToDayInWeek(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString("default", { weekday: "short" });
}
