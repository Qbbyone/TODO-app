const date = document.querySelector("#date");
const weekDay = document.querySelector("#weekday");
const time = document.querySelector("#time")

function updateInfo() {
  let now = new Date();
  let month = now.getMonth();
  let day = now.getDate();
  let dayOfWeek = now.getDay();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let period = "AM";

  if (hours == 0) {
    hours = 12;
  }

  if (hours > 12) {
    hours = hours - 12;
    period = "PM";
  }

  hours = ("0" + hours).slice(-2);
  minutes = ("0" + minutes).slice(-2);

  let week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  date.innerHTML = `${months[month]}, ${day}`;
  weekDay.innerHTML = `${week[dayOfWeek]}`;
  time.innerHTML = `${hours}:${minutes} ${period}`;
}

function initInfo() {
  updateInfo();
  window.setInterval("updateInfo()", 1);
}












