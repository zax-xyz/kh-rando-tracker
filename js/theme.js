// Theme script as separate file loaded first to avoid white flash
function setTheme() {
  document.documentElement.setAttribute("theme", theme);
  const cookieAge = 60 * 60 * 24 * 365;  // One year
  document.cookie = `theme=${theme}; max-age=${cookieAge}`;
}

var theme = document.cookie
  .split("; ")
  .find((row) => row.startsWith("theme"));

if (theme) {
  theme = theme.split("=")[1];
} else {
  theme = "dark";
}

if (theme === "dark") {
  setTheme();
} else {
  theme = "light";
}
