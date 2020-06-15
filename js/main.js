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

  if (nobody !== null && level === total) {
    // Show nobody symbol on last level
    nobody.classList.add("opaque");
    return;
  }

  if (number !== null && level > 1) {
    number.setAttribute("src", `img/numbers/${level}.png`);
  }

  switch (level) {
    case 0:
      // Disable
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
  }
}

function handleRightClick(event) {
  // Toggle secondary icons
  const elem = event.currentTarget;
  const secondary = elem.querySelector(".secondary");

  secondary && secondary.classList.toggle("opaque");
}

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
    // We have our own events for right click so the context menu would be intrusive
    event.preventDefault();
  };
});

document.querySelectorAll("footer .popup > button").forEach((element) => {
  // Open relevant popup if its button is clicked
  element.onclick = (event) => {
    const content = element.nextElementSibling;
    content.classList.toggle("active");
  };
});

document.querySelectorAll("footer .popup > .content").forEach((element) => {
  element.onclick = (event) => {
    if (element !== event.target) {
      // Child was clicked, ignore
      return;
    }

    element.classList.remove("active");
  }
});

document.onkeydown = (event) => {
  if (event.key === "Escape") {
    const activeElem = document.querySelector("footer .popup > .content.active");
    if (activeElem !== null) {
      // Hide popup if it is active
      activeElem.classList.remove("active");
    }
  }
};

/* global theme:writable, setTheme */

// Dark/light theme button
document.getElementById("theme-btn").onclick = (event) => {
  if (theme === "light") {
    theme = "dark";
    event.target.innerHTML = "Light Theme";
  } else {
    theme = "light";
    event.target.innerHTML = "Dark Theme";
  }

  setTheme();
};
