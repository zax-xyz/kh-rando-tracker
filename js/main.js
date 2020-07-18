function handlePrimary(event, offset = 1) {
  const elem = event.currentTarget;
  if (elem.classList.contains("disabled"))
    // If the world/item is disabled, don't do anything
    return;

  const icon = elem.querySelector(".icon");
  const number = elem.querySelector(".number");
  const nobody = elem.querySelector(".nobody");

  // Level is the number associated - like 2nd/3rd visits or lvl 2 drive
  let level = Number(elem.dataset.level) || 0;
  let total = elem.dataset.total || 1;

  // Increase level, resetting to 0 if it reaches the max
  total = Number(total) + Boolean(nobody);
  const end = total + 1;
  level = (level + (end + offset) % end) % (end);
  elem.dataset.level = level;

  if (nobody !== null && level === total) {
    // Show nobody symbol on last level
    nobody.classList.add("opaque");
    return;
  }

  if (number !== null && level > 1)
    number.setAttribute("src", `img/numbers/${level}.png`);

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
      number && number.classList.remove("opaque");
      break;
    default:
      // For if 
      icon.classList.add("opaque");
      // Show number
      number && number.classList.add("opaque");
      break;
  }
}

function handleSecondary(event) {
  const elem = event.currentTarget;
  if (elem.classList.contains("disabled"))
    // If the world/item is disabled, don't do anything
    return;

  const secondary = elem.querySelector(".secondary");

  if (secondary === null)
    // Cell has no secondary image
    return;

  // Get images
  let files = secondary.dataset.files;
  if (files === undefined) {
    // A single image rather than an array
    secondary.classList.toggle("opaque");
    return;
  }

  // Otherwise, parse JSON array
  files = JSON.parse(secondary.dataset.files);

  // Increment image index
  let index = Number(secondary.dataset.index) + 1 || 1;
  if (index % (files.length + 1) === 0)
    index = 0;
  else
    secondary.setAttribute("src", `img/secondary/${files[index - 1]}.png`);

  // We toggle the opaque class for 0 (disable) and 1 (enable)
  if (index < 2)
    secondary.classList.toggle("opaque");

  secondary.dataset.index = index;
}

function handleDisable(event) {
  const elem = event.currentTarget;
  elem.classList.toggle('disabled');
}

document.body.onmousedown = (event) => {
  if (event.button === 1)
    // Prevent autoscroll on middle click
    return false;
}

function handleWheel(event) {
  event.preventDefault();
  if (event.deltaY > 0)
    handlePrimary(event);
  else
    handlePrimary(event, -1);
}

const scrollElem = document.getElementById("scroll");

scrollElem.checked = localStorage.scroll;
scrollElem.onchange = (event) => {
  let handler;
  const checked = event.target.checked;
  if (checked === true)
    handler = handleWheel;
  else
    handler = null;

  localStorage.scroll = checked;

  document.querySelectorAll(".grid > div").forEach((element) => {
    element.onwheel = handler;
  });
};
// Run once to use saved settings
scrollElem.onchange({ target: scrollElem });

// Item clicking
document.querySelectorAll(".grid > div").forEach((element) => {
  element.onmousedown = (event) => {
    switch (event.button) {
      case 0:
        handlePrimary(event);
        break;
      case 2:
        handleSecondary(event);
        break;
      case 1:
        handleDisable(event);
        break;
    }
  };

  element.oncontextmenu = (event) => {
    // We have our own events for right click so the context menu would be intrusive
    event.preventDefault();
  };
});

// Open relevant popup if its button is clicked
document.querySelectorAll("footer .popup > button").forEach((element) => {
  element.onclick = (event) => {
    const content = element.nextElementSibling;
    content.classList.toggle("active");
  };
});

// Hide popup when clicking outside its area
document.querySelectorAll("footer .popup > .content").forEach((element) => {
  element.onclick = (event) => {
    if (element !== event.target)
      // Child was clicked, ignore
      return;

    element.classList.remove("active");
  }
});

// Hide popups on Escape key
document.onkeydown = (event) => {
  if (event.key === "Escape") {
    const activeElem = document.querySelector("footer .popup > .content.active");
    if (activeElem !== null)
      // Hide popup if it is active
      activeElem.classList.remove("active");
  }
};

/* global theme:writable, setTheme */

const themeElem = document.getElementById("theme");
themeElem.checked = theme === "dark";
themeElem.onchange = (event) => {
  if (event.target.checked === true)
    theme = "dark";
  else
    theme = "light";

  setTheme();
};
// Run once to use saved settings
themeElem.onchange({ target: themeElem });
