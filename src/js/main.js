const headContainer = document.querySelector(".header__container--mood-icons");
const calendarContainer = document.querySelector(".calendar__container");
const buttons = document.querySelectorAll(".btn");
const functionButtons = document.querySelector(".function__container");

const weeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const month = [
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

// Colors array for random function
const colors = ["#2d6b5f", "#72e3a6", "#dff4c7", "#edbf98", "#ea3d36"];

// store current color using this global variable
let activeColor = "";

// default color of calendar buttons
let defaultColor = "#0000004d";

// Add or Remove active class of icons and store current color to global active color variable
const iconButtons = (e) => {
  const buttonClick = e.target.closest(".btn");
  if (!buttonClick) return;
  if (buttonClick.classList.contains("active")) {
    buttonClick.classList.remove("active");
    activeColor = defaultColor;
  } else {
    buttons.forEach((el) => el.classList.remove("active"));
    buttonClick.classList.add("active");
    activeColor = getComputedStyle(buttonClick).getPropertyValue("color");
  }
};

headContainer.addEventListener("click", iconButtons);

// Get days of each month
function getDaysInMonth(month, year) {
  let days = [];
  const date = new Date(year, month, 1);
  const startDate = date.getDay();

  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return [days, startDate];
}

// Declare an empty string to store final html markup
let html = "";

// Creating html markup for each week in the calendar
const getWeeks = weeks.map((el) => `<h5>${el}</h5>`).join("");

// For every month append every html markup
for (let i = 0; i < month.length; i++) {
  const daysInMonth = getDaysInMonth(i, 2023);
  const days = daysInMonth[0].map((el) => el.getDate());

  // Display days of each month
  const getDays = days
    .map((el) => `<button class="date-buttons">${el}</button>`)
    .join("");

  // Getting the day of the month
  const startDate = daysInMonth[1];

  // Add dummy element/s to correct the calendar format
  let emptyEl = `<span></span>`.repeat(startDate);

  // append each instance of the month in the calendar
  html += `   
    <div class="calendar__container--item">
        <h3>${month[i]}</h3>
        <div class="week-container">
          ${getWeeks}
          ${emptyEl}
          ${getDays}
        </div>
    </div> `;
}

// Display calendar container html
calendarContainer.innerHTML = html;

const dateBtns = document.querySelectorAll(`.date-buttons`);

// Set color on click in calendar
dateBtns.forEach((el) =>
  el.addEventListener("click", (e) => {
    e.target.style.background = activeColor;
  })
);

// randomize calendar or reset calendar
const buttonsFunc = (e) => {
  const buttonClick = e.target.closest(".f-btn");
  if (!buttonClick) return;
  if (buttonClick.classList.contains("reset")) {
    dateBtns.forEach((el) => (el.style.background = defaultColor));
  }
  if (buttonClick.classList.contains("random")) {
    const randomColor = () => Math.trunc(Math.random() * colors.length);

    dateBtns.forEach((el) => (el.style.background = colors[randomColor()]));
  }
};

// click event on function buttons reset and random
functionButtons.addEventListener("click", buttonsFunc);
