function handleLeftClick(event) {
  const elem = event.currentTarget;
  const icon = elem.querySelector(".icon");
  const number = elem.querySelector(".number");
  const nobody = elem.querySelector(".nobody");

  // Level is the number associated - like 2nd/3rd visits or lvl 2 drive
  let level = Number(elem.dataset.level) || 0;
  let total = elem.dataset.total || 1;

  // Increase level, resetting to 0 if it reaches the max
  total = Number(total) + Boolean(nobody);
  level = (level + 1) % (total + 1);
  elem.dataset.level = level;

  // Add nobody symbol on the last level
  const addNobody = nobody && level === total;

  // Set the number element source to the corresponding image
  if (number && level > 0 && !addNobody) {
    // Update number if this isn't the nobody level
    number.setAttribute("src", `img/numbers/${level}.png`);
  };

  // Set CSS classes if necessary
  if (addNobody) {
    // Show nobody symbol
    nobody.classList.add("opaque");
    return;
  };

  switch (level) {
    case 0:
      // Disabled
      icon.classList.remove("opaque");
      number && number.classList.remove("opaque");
      nobody && nobody.classList.remove("opaque");
      break;
    case 1:
      // First state, don't show number yet
      icon.classList.add("opaque");
      break;
    case 2:
      // Show number
      number.classList.add("opaque");
      break;
  };
};

function handleRightClick(event) {
  const elem = event.currentTarget;
  const secondary = elem.querySelector(".secondary");

  secondary && secondary.classList.toggle("opaque");
};

// Item clicking
document.querySelectorAll(".grid > div").forEach((element) => {
  element.onmousedown = (event) => {
    switch (event.button) {
      case 0:
        handleLeftClick(event);
        break;
      case 2:
        handleRightClick(event);
        break;
    }
  };

  element.oncontextmenu = (event) => {
    // We have our own events for right click and the context menu would be intrusive
    event.preventDefault();
  };
});

/* global theme:writable */

// Dark/light theme button
document.getElementById("theme-btn").onclick = (event) => {
  if (theme === "light") {
    theme = "dark";
    event.target.innerHTML = "Light Theme";
  } else {
    theme = "light";
    event.target.innerHTML = "Dark Theme";
  };

  document.documentElement.setAttribute("theme", theme);
  const cookieAge = 60 * 60 * 24 * 365;  // One year
  document.cookie = `theme=${theme}; max-age=${cookieAge}`;
};
