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
try { scrollElem.checked = localStorage.scroll === "true" }
catch {}
scrollElem.onchange = (event) => {
  try { localStorage.scroll = event.target.checked }
  catch {}
};

const columnsElem = document.getElementById("columns");
try { columnsElem.value = localStorage.columns ?? null }
catch {}
columnsElem.oninput = (event) => {
  const columns = event.target.value;
  const grid = document.querySelector(".grid");

  grid.style.gridTemplateColumns = columns ? `repeat(${columns}, auto)`: null;

  try { localStorage.columns = columns }
  catch {}
};
columnsElem.oninput({ target: columnsElem });

const bgInputElem = document.getElementById("background")
try { bgInputElem.value = localStorage.bg ?? null }
catch {}
bgInputElem.oninput = (event) => {
  const bg = event.target.value;

  [ document.querySelector(".grid"), document.querySelector("footer") ].forEach((elem) => {
    elem.style.background = bg;
  });
  
  document.querySelectorAll("footer .popup .content .body").forEach((elem) => {
    elem.style.background = bg;
  });

  try { localStorage.bg = bg }
  catch {}
};
