// Theme script as separate file loaded first to avoid white flash
function setTheme() {
  document.documentElement.setAttribute("theme", theme);
  try { localStorage.theme = theme }
  catch {}
}

try {
  var theme = localStorage.theme;
} catch {
  console.error("Could not read localStorage, using defaults");
}

if (theme === undefined) {
  theme = "dark";
}

if (theme === "dark") {
  setTheme();
} else {
  theme = "light";
}
