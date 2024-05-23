import { handleLogOut } from "@/app/services/userServices";
import Link from "next/link";
import { NavLink } from "./inputComponents";
import { formatDate, formatDateToDayInWeek } from "@/app/services/dateServices";

//displays username and logout button
export function UserHeader({ username }) {
  return (
    <>
      <div className="w-full text-xl bg-primary border-b-accent border-b-2 py-3 px-1">
        <div className="max-w-[1200px] m-auto flex justify-between">
          <p>Username: {username}</p>
          <div className="w-[30%] flex justify-end">
            <button onClick={handleLogOut}>Log out</button>
          </div>
        </div>
      </div>
    </>
  );
}

export function ExerciseComponent({
  name,
  type,
  duration,
  calories,
  difficulty,
  fatigue,
  time,
  notes,
  id,
  handleDelete,
}) {
  return (
    <div className="border-b-2 py-2">
      <div className=" max-w-[1200px] m-auto">
        <div className="flex">
          <div className="flex-1 flex items-center">
            <span>{time}</span> &nbsp;&nbsp;
            <span className="text-xl w-[500px]">
              {name}
              &nbsp; - &nbsp;
              {type}
            </span>
          </div>
          <div className="flex-1 flex flex-col">
            <span>Calories: {calories}</span>
            <span>
              {" "}
              Duration: {Math.floor(duration / 60)} min :{" "}
              {(duration % 60).toString().padStart(2, "0")} sec
            </span>
          </div>
          <div className="flex-1 flex flex-col">
            <span> Difficulty: {difficulty}</span>
            <span> Fatigue: {fatigue}</span>
          </div>

          <div className="flex-shrink-0 w-20 flex items-center justify-end">
            <Link
              href={`/edit-exercise/${id}`}
              className="w-fit px-3  bg-light border-accent border-2 mr-5"
            >
              Edit
            </Link>
            <button
              onClick={() => {
                handleDelete(id);
              }}
              className="w-fit px-3  bg-red-500 border-red-500 border-2"
            >
              Delete
            </button>
          </div>
        </div>
        {notes != "" && (
          <div className="flex justify-between">
            <div className="flex flex-1">
              Notes:
              <br />
              {notes}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export function DateComponent({ date }) {
  const dayInWeek = formatDateToDayInWeek(date);
  let dayColor = "text-black font-semibold";
  if (dayInWeek === "Sun") {
    dayColor = "text-red-500 font-semibold";
  } else if (dayInWeek === "Sat") {
    dayColor = "text-blue-500 font-semibold";
  }

  return (
    <>
      <div className="bg-secondary">
        <div className="max-w-[1200px] m-auto ">
          <span className={dayColor}>{dayInWeek}</span> {formatDate(date)}
        </div>
      </div>
    </>
  );
}

export function UserPageNav() {
  return (
    <>
      <div className="w-full text-xl px-1">
        <div className="max-w-[1200px] m-auto flex justify-between">
          <div className="font-semibold flex w-full items-center">
            Your exercises:
          </div>
          <div className=" flex justify-end text-base">
            <NavLink src="/add-exercise" value="+ Add exercise" />
            &nbsp; &nbsp; &nbsp; &nbsp;
            <NavLink src="/statistics" value="View Statistics" />
          </div>
        </div>
      </div>
    </>
  );
}
