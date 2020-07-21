// Open relevant popup if its button is clicked
document.querySelectorAll("footer .popup > button").forEach((elem) => {
  elem.onclick = (event) => {
    elem.nextElementSibling.classList.toggle("active");
  }
});

// Hide popup when clicking outside its area
document.querySelectorAll("footer .popup > .content").forEach((elem) => {
  elem.onmousedown = (event) => {
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

const themeElem = document.getElementById("theme");
themeElem.checked = theme === "dark";
themeElem.onchange = (event) => {
  theme = event.target.checked ? "dark" : "light";
  setTheme();
};

const scrollElem = document.getElementById("scroll");
try {
  scrollElem.checked = localStorage.scroll === "true";
} catch {
  console.error("Could not read localStorage, using scroll setting");
}
scrollElem.onchange = (event) => {
  localStorage.scroll = event.target.checked;
};

const columnsElem = document.getElementById("columns");
try {
  columnsElem.value = localStorage.columns ?? null;
} catch {
  console.error("Could not read localStorage, using default columns");
}
columnsElem.oninput = (event) => {
  const columns = event.target.value;
  const grid = document.querySelector(".grid");

  grid.style.gridTemplateColumns = columns ? `repeat(${columns}, auto)`: null;
  localStorage.columns = columns;
};
columnsElem.oninput({ target: columnsElem });
