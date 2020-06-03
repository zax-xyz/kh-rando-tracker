// Theme script as separate file loaded first to avoid white flash
var theme = document.cookie
  .split("; ")
  .find(row => row.startsWith("theme"));

if (theme) {
  theme = theme.split("=")[1];
}

if (theme === "dark") {
  document.documentElement.setAttribute("theme", "dark");
  // Update cookie expiry date
  const cookieAge = 60 * 60 * 24 * 365;  // One year
  document.cookie = `theme=dark; max-age=${cookieAge}`;
} else {
  theme = "light";
}
