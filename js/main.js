function handlePrimary(event, offset = 1) {
  const elem = event.currentTarget;
  if (elem.classList.contains("disabled"))
    // If the world/item is disabled, don't do anything
    return;

  const nobody = elem.querySelector(".nobody");

  const total = Number(elem.dataset.total ?? 1) + Boolean(nobody);
  const end = total + 1;

  // Change level, resetting to 0 if >total, or wrapping to the end if <0
  let level = Number(elem.dataset.level ?? 0)
  if (level === 0 || elem.querySelector(".icon").classList.contains("opaque"))
    // Only increase level if the summon isn't being unlocked for the first time
    level = (level + (end + offset) % end) % end;

  elem.dataset.level = level;

  if (nobody && level === total)
    // Show nobody symbol on last level
    return nobody.classList.add("opaque");

  const group = elem.dataset.group;
  const elems = group ? document.querySelectorAll(`[data-group="${group}"]`) : [ elem ];

  elems.forEach((groupElem) => {
    groupElem.dataset.level = level;

    const icon = groupElem.querySelector(".icon");
    const number = groupElem.querySelector(".number");
    const nobody = groupElem.querySelector(".nobody");

    if (level > 1)
      number?.setAttribute("src", `img/numbers/${level}.png`);

    switch (level) {
      case 0:
        // Disable
        if (elem === groupElem) icon.classList.remove("opaque");
        number?.classList.remove("opaque");
        nobody?.classList.remove("opaque");
        break;
      case 1:
        // First state, don't show number yet
        if (elem === groupElem) icon.classList.add("opaque");
        number?.classList.remove("opaque");
        break;
      default:
        // For if 
        if (elem === groupElem) icon.classList.add("opaque");
        // Show number
        number?.classList.add("opaque");
        break;
    }
  })
}

function handleSecondary(event) {
  const elem = event.currentTarget;
  if (elem.classList.contains("disabled"))
    // If the world/item is disabled, don't do anything
    return;

  const secondary = elem.querySelector(".secondary");
  if (!secondary)
    // Cell has no secondary image
    return;

  // Get images
  let files = secondary.dataset.files;
  if (!files)
    // A single image rather than an array
    return secondary.classList.toggle("opaque");

  // Otherwise, parse JSON array
  files = JSON.parse(secondary.dataset.files);

  // Increment image index
  let index = Number(secondary.dataset.index ?? 0) + 1;
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
  event.currentTarget.classList.toggle('disabled');
}

document.body.onmousedown = (event) => {
  if (event.button === 1)
    // Prevent autoscroll on middle click
    return false;
}

function handleWheel(event) {
  event.preventDefault();

  const offset = event.deltaY < 0 ? 1 : -1;
  handlePrimary(event, offset);
}

const scrollElem = document.getElementById("scroll");

scrollElem.checked = localStorage.scroll === "true";
scrollElem.onchange = (event) => {
  const checked = event.target.checked;
  const handler = checked ? handleWheel : null;

  localStorage.scroll = checked;

  document.querySelectorAll(".grid > div").forEach((elem) => elem.onwheel = handler);
};

// Run once to use saved settings
scrollElem.onchange({ target: scrollElem });

// Item clicking
document.querySelectorAll(".grid > div").forEach((elem) => {
  elem.onmousedown = (event) => {
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

  // We have our own events for right click so the context menu would be intrusive
  elem.oncontextmenu = (event) => event.preventDefault();
});

// Open relevant popup if its button is clicked
document.querySelectorAll("footer .popup > button").forEach((elem) => {
  elem.onclick = (event) => {
    elem.nextElementSibling.classList.toggle("active");
  }
});

// Hide popup when clicking outside its area
document.querySelectorAll("footer .popup > .content").forEach((elem) => {
  elem.onclick = (event) => {
    // Remove active if target wasn't a child
    if (elem === event.target)
      elem.classList.remove("active");
  }
});

// Hide popups on Escape key
document.onkeydown = (event) => {
  if (event.key === "Escape") {
    const activeElem = document.querySelector("footer .popup > .content.active");
    activeElem?.classList.remove("active");
  }
};

/* global theme:writable, setTheme */

const themeElem = document.getElementById("theme");

themeElem.checked = theme === "dark";
themeElem.onchange = (event) => {
  theme = event.target.checked ? "dark" : "light";
  setTheme();
};
