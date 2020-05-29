// Theme script as separate file loaded first to avoid white flash
var theme = document.cookie
  .split("; ")
  .find(row => row.startsWith("theme"));

if (theme) {
  theme = theme.split("=")[1];
}

if (theme === "dark") {
  document.documentElement.setAttribute("theme", "dark");
} else {
  theme = "light";
}
