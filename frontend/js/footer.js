// Open relevant popup if its button is clicked
$$("footer .popup > button").forEach(elem => {
  elem.onclick = event => {
    elem.nextElementSibling.classList.toggle("active");
  }
});

// Hide popup when clicking outside its area
$$("footer .popup > .content").forEach(elem => {
  elem.onmousedown = event => {
    // Remove active if target wasn't a child
    if (elem === event.target)
      elem.classList.remove("active");
  }
});

// Hide popups on Escape key
document.onkeydown = event => {
  if (event.key === "Escape") {
    $("footer .popup > .content.active")?.classList.remove("active");
  }
};

const themeElem = $("#theme");
themeElem.checked = theme === "dark";
themeElem.onchange = event => {
  theme = event.target.checked ? "dark" : "light";
  setTheme();
};

const scrollElem = $("#scroll");
try { scrollElem.checked = localStorage.scroll === "true" }
catch {}
scrollElem.onchange = event => {
  try { localStorage.scroll = event.target.checked }
  catch {}
};

const columnsElem = $("#columns");
try { columnsElem.value = localStorage.columns ?? null }
catch {}
columnsElem.oninput = event => {
  const columns = event.target.value;
  const grid = $(".grid");

  grid.style.gridTemplateColumns = columns ? `repeat(${columns}, auto)`: null;

  try { localStorage.columns = columns }
  catch {}
};
columnsElem.oninput({ target: columnsElem });

const bgInputElem = $("#background");
try { bgInputElem.value = localStorage.bg ?? null }
catch {}
bgInputElem.oninput = event => {
  const bg = event.target.value;

  [ $(".grid"), $("footer") ].forEach(elem => {
    elem.style.background = bg;
  });
  
  $$("footer .popup .content .body").forEach(elem => {
    elem.style.background = bg;
  });

  try { localStorage.bg = bg }
  catch {}
};

const atlantica100Acre = $("#atlantica_100_acre");
try { atlantica100Acre.checked = localStorage.atlantica100Acre === "true" }
catch {}
atlantica100Acre.onchange = event => {
  // Lower total if setting enabled
  const value = event.target.checked ? 5 : 6;

  [ $(".atlantica"), $(".hundred_acre") ].forEach(elem => {
    elem.dataset.total = value;
  });

  try { localStorage.atlantica100Acre = event.target.checked }
  catch {}
};
