// Theme script as separate file loaded first to avoid white flash
function setTheme() {
  document.documentElement.setAttribute("theme", theme);
  localStorage.theme = theme;
}

var theme = localStorage.theme;

if (theme === undefined) {
  theme = "dark";
}

if (theme === "dark") {
  setTheme();
} else {
  theme = "light";
}
