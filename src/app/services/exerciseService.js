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
export async function getUserExercises(userId) {
  const res = await fetch(`api/user?userId=${userId}`);

  const result = await res.json();
  return result;
}
export async function getStatistics(userId, monthYear) {
  const res = await fetch(
    `/api/get-statistics?userId=${userId}&monthYear=${monthYear}`
  );
  const result = await res.json();
  return result;
}

export async function getExercise(userId, exerciseId) {
  const res = await fetch(
    `/api/get-exercise?userId=${userId}&exerciseId=${exerciseId}`
  );
  const result = await res.json();
  return result;
}

export async function updateExercise(userId, exercise) {
  const res = await fetch(`/api/edit-exercise?userId=${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(exercise),
  });

  const result = await res.json();
  return result;
}

export async function deleteExercise(userId, exerciseId) {
  const res = await fetch(
    `/api/delete-exercise?userId=${userId}&exerciseId=${exerciseId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const result = await res.json();
  return result;
}
//move to date services
