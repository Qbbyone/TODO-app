const darkModeCheckbox = document.getElementById("dark-mode-checkbox");

darkModeCheckbox.addEventListener("change", () => {
  // change the theme of the website
  document.body.classList.toggle("dark");
});