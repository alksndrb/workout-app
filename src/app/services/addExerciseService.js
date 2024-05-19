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
