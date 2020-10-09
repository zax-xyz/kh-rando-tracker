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
bgInputElem.oninput({ target: bgInputElem });

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
atlantica100Acre.onchange({ target: atlantica100Acre });

const disableShadows = $("#disable_shadows");
try { disableShadows.checked = localStorage.disableShadows === "true" }
catch {}
disableShadows.onchange = event => {
  const filter = event.target.checked ? "none" : null;

  $$("img").forEach(elem => {
    elem.style.filter = filter;
  });

  try { localStorage.disableShadows = event.target.checked }
  catch {}
};
disableShadows.onchange({ target: disableShadows });

const icons = Array.from($$(".item"));
const grid = $(".grid");

const iconOrder = $("#order");
try { iconOrder.value = localStorage.order ?? null }
catch {}
iconOrder.oninput = event => {
  const order = event.target.value.trim();
  grid.innerHTML = "";

  if (order)
    order.split(" ").forEach(i => grid.appendChild(icons[i - 1]));
  else
    icons.forEach(icon => grid.appendChild(icon));

  try { localStorage.order = event.target.value }
  catch {}
};
if (iconOrder.value) iconOrder.oninput({ target: iconOrder });

const iconRemove = $("#remove");
try { iconRemove.value = localStorage.remove ?? null }
catch {}
iconRemove.oninput = event => {
  const remove = event.target.value.trim().split(" ").map(i => parseInt(i) - 1);
  grid.innerHTML = "";

  for (const [index, icon] of icons.entries()) {
    if (!(remove.includes(index))) {
      grid.appendChild(icon);
    }
  }

  try { localStorage.remove = event.target.value }
  catch {}
};
if (iconRemove.value) iconRemove.oninput({ target: iconRemove });

function useStyle(style) {
  const dir = style ? `img/${style}/` : "img/";
  $$(".icon").forEach(elem => {
    const src = elem.dataset.src;
    let iconDir = dir;
    if (style == "classic" && !(src.startsWith("drive/") || src.startsWith("summons/"))) {
      iconDir = "img/"
    }
    elem.src = iconDir + src;
  });
}
try {
  let iconStyle = localStorage.iconStyle;
  if (!("iconStyle" in localStorage) && "minimalIcons" in localStorage) {
    iconStyle = localStorage.minimalIcons === "true" ? "simple" : "";
    localStorage.iconStyle = iconStyle;
    // TODO: delete localStorage.minimalIcons
  }
  icon_style.value = iconStyle;
  useStyle(iconStyle);
} catch {
  useStyle("");
}
icon_style.onchange = ev => {
  useStyle(ev.target.value);
  try { localStorage.iconStyle = ev.target.value }
  catch {}
};
