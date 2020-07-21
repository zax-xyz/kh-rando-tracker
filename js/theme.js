// Theme script as separate file loaded first to avoid white flash
function setTheme() {
  document.documentElement.setAttribute("theme", theme);
  localStorage.theme = theme;
}

try {
  var theme = localStorage.theme;
} catch {
  console.error("Could not read localStorage, defaulting to dark theme");
  theme = "dark";
}

if (theme === undefined) {
  theme = "dark";
}

if (theme === "dark") {
  setTheme();
} else {
  theme = "light";
}
