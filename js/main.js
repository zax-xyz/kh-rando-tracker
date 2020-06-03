// Icon clicking
document.querySelectorAll(".toggle").forEach(element => {
  element.onclick = (event) => {
    const elem = event.target.parentElement;

    let total = elem.dataset.total || 1;
    const icon = elem.querySelector(".icon");

    // Level is the number associated - like 2nd/3rd visits or lvl 2 drive
    let level = Number(elem.dataset.level) || 0;

    const nobody = elem.querySelector(".nobody");

    if (nobody) {
      total = Number(total) + 2;
    } else {
      total = Number(total) + 1;
    }

    // Increase level, resetting to 0 if it reaches the max
    level = (level + 1) % (total);
    elem.dataset.level = level;

    const addNobody = nobody && level === total - 1;

    // Set the number element source to the corresponding image
    const number = elem.querySelector(".number");
    if (number && level > 0 && !addNobody) {
      number.setAttribute("src", `img/numbers/${level}.png`);
    }

    // Set CSS classes if necessary
    if (level === 0) {
      // Disabled
      icon.classList.remove("opaque");
      number && number.classList.remove("opaque");
      nobody && nobody.classList.remove("opaque");
    } else if (addNobody) {
      nobody.classList.add("opaque");
    } else if (level === 1) {
      // First state, don't show number yet
      icon.classList.add("opaque");
    } else if (level === 2) {
      // Show number
      number.classList.add("opaque");
    }
  };
})

// Dark/light theme button
document.getElementById("theme-btn").onclick = (event) => {
  if (theme === "light") {
    theme = "dark"
    event.target.innerHTML = "Light Theme";
  } else {
    theme = "light"
    event.target.innerHTML = "Dark Theme";
  }

  document.documentElement.setAttribute("theme", theme);
  document.cookie = `theme=${theme}`;
}
