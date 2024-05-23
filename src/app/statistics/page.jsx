"use client";

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UserHeader } from "@/components/userComponents";
import { GreenLine } from "@/components/styleComponents";
import Link from "next/link";
import { getStatistics } from "../services/exerciseService";
import { formatDateToMonthYear } from "../services/dateServices";
import { checkUser } from "../services/userServices";

export default function statistics() {
  const [selectedDate, setSelectedDate] = useState(formatDateYM(new Date()));
  const [statistics, setStatistics] = useState(null);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState("");
  //check if user is logged in
  async function checkUserInnit() {
    try {
      //check for saved userId
      const storedUserId = localStorage.getItem("userId");
      if (!storedUserId) {
        window.location.href = "/login";
      }
      setUserId(storedUserId);
      // check if user is in db
      const result = await checkUser(storedUserId);
      if (result.error) {
        window.location.href = "/login";
      } else setUsername(result.username);
    } catch (error) {
      console.error("Error getting user: ", error);
    }
  }
  useEffect(() => {
    checkUserInnit();
  }, []);
  function formatDateYM(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const formattedDate = `${year}-${month}`;
    return formattedDate;
  }
  function handleOnChange(date) {
    setSelectedDate(formatDateYM(date));
  }
  async function handleSubmit() {
    const userId = localStorage.getItem("userId");
    const result = await getStatistics(userId, selectedDate);
    setStatistics(result.statistics);
  }
  function renderStatistics() {
    if (statistics.length === 0) {
      return <div className="text-xl pb-2">No exercises in this month</div>;
    }
    if (statistics) {
      return statistics.map((stat, index) => (
        <div key={index} className="border-t-2 py-3">
          <div className="text-xl font-semibold">Week {stat.week}</div>
          <div className="text-lg">
            Total duration: {Math.floor(stat.totalDuration / 60)}min :{" "}
            {String(stat.totalDuration % 60).padStart(2, "0")}sec
          </div>
          <div className="text-lg">Number of exercises: {stat.totalNumber}</div>
          <div className="text-lg">
            Average Difficulty:{" "}
            {stat.avgDifficulty % 1 !== 0
              ? stat.avgDifficulty.toFixed(1)
              : stat.avgDifficulty}
          </div>
          <div className="text-lg">
            Average Fatigue:{" "}
            {stat.avgFatigue % 1 !== 0
              ? stat.avgFatigue.toFixed(1)
              : stat.avgFatigue}
          </div>
        </div>
      ));
    }
    return null;
  }
  return (
    <>
      <UserHeader username={username} />
      <div className="max-w-[1200px] m-auto">
        <div className="py-5">
          <label htmlFor="date" className="text-lg">
            Select Month:{" "}
          </label>
          <DatePicker
            id="date"
            selected={selectedDate}
            onChange={handleOnChange}
            dateFormat="MM/yyyy"
            showMonthYearPicker
            showFullMonthYearPicker
            className="w-[110px] px-5 bg-light border-b-2"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-fit px-5 text-xl py-1 bg-tertiary mb-5"
        >
          Submit
        </button>
        <Link
          href="/user"
          className="w-fit ml-5 px-5 text-xl py-1 bg-tertiary mb-5 border-2 border-tertiary"
        >
          Back
        </Link>
      </div>
      <GreenLine />
      {statistics && (
        <div className="max-w-[1200px] m-auto">
          <h2 className="text-xl font-bold py-2">
            Statistics for {formatDateToMonthYear(selectedDate)}
          </h2>
          <div>{renderStatistics()}</div>
        </div>
      )}
      {statistics && <GreenLine />}
    </>
  );
}
