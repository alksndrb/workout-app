export function formatDate(dateString) {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  //format the date string as "DD day of week MM YYYY"
  return `${day} ${month} ${year}`;
}

export function formatDateToDayInWeek(dateString) {
  const date = new Date(dateString);
  //returns named day of the week
  return date.toLocaleString("default", { weekday: "short" });
}

export function getWeekOfTheMonth(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  // month is zero-indexed in JavaScript
  const dateObject = new Date(year, month - 1, day);
  //get the day of the week (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
  const dayOfWeek = dateObject.getDay();
  //adjust the day of the week to start from Monday
  const adjustedDayOfWeek = (dayOfWeek + 6) % 7;
  //get the date of the month
  const dateOfMonth = dateObject.getDate();
  //calculate the week of the month
  const weekOfMonth = Math.ceil((dateOfMonth + 6 - adjustedDayOfWeek) / 7);
  //return week of the month
  return weekOfMonth;
}

export function formatDateToMonthYear(dateString) {
  const dateParts = dateString.split("-");
  const year = parseInt(dateParts[0]);
  //adjusting month as it starts from 0
  const month = parseInt(dateParts[1]) - 1;

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const formattedDate = new Date(year, month);
  const formattedString =
    monthNames[formattedDate.getMonth()] + " " + formattedDate.getFullYear();

  return formattedString;
}
