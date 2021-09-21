// const darkModeCheckbox = document.getElementById("dark-mode-checkbox");

// darkModeCheckbox.addEventListener("change", () => {
//   // change the theme of the website
//   document.body.classList.toggle("dark");
// });


let darkMode = localStorage.getItem("darkMode");
const darkModeCheckbox = document.getElementById("dark-mode-checkbox");

const enableDarkMode = () => {
  document.body.classList.add("dark");
  localStorage.setItem("darkMode", "enabled");
  darkModeCheckbox.checked = true
};

const disableDarkMode = () => {
  document.body.classList.remove("dark");
  localStorage.setItem("darkMode", null);
  darkModeCheckbox.checked = false
};

if (darkMode === "enabled") {
  enableDarkMode();
}

darkModeCheckbox.addEventListener("change", () => {
  darkMode = localStorage.getItem("darkMode");
  if (darkMode !== "enabled") {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
});
