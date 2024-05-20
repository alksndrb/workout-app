"use client";

import { useState } from "react";
import { getStatistics } from "../services/exerciseService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function statistics() {
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));
  //consider adding loading state while fetching data
  //add the check if the user is logged in
  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const formattedDate = `${year}-${month}`;
    return formattedDate;
  }
  function handleOnChange(date) {
    setSelectedDate(formatDate(date));
  }
  async function handleSubmit() {
    const userId = localStorage.getItem("userId");
    const result = await getStatistics(userId, selectedDate);
    console.log(result);
  }
  //display statistics
  //add style
  return (
    <div>
      <DatePicker
        selected={selectedDate}
        onChange={handleOnChange}
        dateFormat="MM/yyyy"
        showMonthYearPicker
        showFullMonthYearPicker
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
