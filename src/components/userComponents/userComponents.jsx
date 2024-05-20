import {
  formatDate,
  formatDateToDayInWeek,
} from "@/app/services/exerciseService";
import { handleLogOut } from "@/app/services/userServices";
import Link from "next/link";

//consider reorganizing components
export function UserHeader({ username }) {
  return (
    <>
      <div className="w-full text-xl bg-primary border-b-accent border-b-2 py-3 px-1">
        <div className="max-w-[1200px] m-auto flex justify-between">
          <p>Username: {username}</p>
          <div className="w-[30%] flex justify-between">
            <Link href="/add-exercise">Add exercise</Link>
            <button onClick={handleLogOut}>Log out</button>
          </div>
        </div>
      </div>
    </>
  );
}

export function Exercise({
  name,
  type,
  duration,
  calories,
  difficulty,
  fatigue,
  date,
  time,
  notes,
  id,
}) {
  return (
    <div className="border-b-2 py-2">
      <div className=" max-w-[1200px] m-auto">
        <div className="flex">
          <div className="flex-1 flex items-center">
            <span>{time}</span> &nbsp;&nbsp;
            <span className="text-xl">
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
            <button className="w-fit px-3  bg-light border-accent border-2 mr-5">
              Edit
            </button>
            <button className="w-fit px-3  bg-red-500 border-red-500 border-2">
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
  return (
    <>
      <div className="bg-secondary">
        <div className="max-w-[1200px] m-auto">
          {dayInWeek} {formatDate(date)}
        </div>
      </div>
    </>
  );
}
