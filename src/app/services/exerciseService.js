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
export async function getStatistics(userId, monthYear) {
  const res = await fetch(`api/get-statistics?userId=${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ monthYear }),
  });
  const result = await res.json();
  return result;
}
//move to date services
export function formatDate(dateString) {
  // Parse the date string
  const date = new Date(dateString);

  // Get the day, day of the week, month, and year
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  // Format the date string as "DD day of week MM YYYY"
  return `${day} ${month} ${year}`;
}
//move to date services
export function formatDateToDayInWeek(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString("default", { weekday: "short" });
}
//move to date services
export function getWeekOfTheMonth(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);

  // Create a new Date object
  const dateObject = new Date(year, month - 1, day); // Month is zero-indexed in JavaScript

  // Get the day of the week (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
  const dayOfWeek = dateObject.getDay();

  // Adjust the day of the week to start from Monday (0 for Monday, 1 for Tuesday, ..., 6 for Sunday)
  const adjustedDayOfWeek = (dayOfWeek + 6) % 7;

  // Get the date of the month
  const dateOfMonth = dateObject.getDate();

  // Calculate the week of the month
  const weekOfMonth = Math.ceil((dateOfMonth + 6 - adjustedDayOfWeek) / 7);

  return weekOfMonth;
}
