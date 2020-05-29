document.querySelectorAll(".toggle").forEach(element => {
  element.onclick = (event) => {
    const elem = event.target.parentElement;

    const total = elem.dataset.total;
    const icon = elem.querySelector(".icon");

    if (total === undefined) {
      // If there is no "total" data attribute, then it is a simple toggle
      icon.classList.toggle("opaque");
      return;
    }

    // Level is the number associated - like 2nd/3rd visits or lvl 2 drive
    let level = Number(elem.dataset.level);
    if (Number.isNaN(level)) {
      // Initialise level to 0 if not found
      level = 0;
    }

    // Increase level, resetting to 0 if it reaches the max
    level = (level + 1) % (Number(total) + 1);
    elem.dataset.level = level;

    // Set the number element source to the corresponding image
    const number = elem.querySelector(".number");
    if (level !== 0) {
      number.setAttribute("src", `img/${level}.png`);
    }

    // Set CSS classes if necessary
    if (level === 0) {
      // Disabled
      icon.classList.remove("opaque");
      number.classList.remove("opaque");
    } else if (level === 1) {
      // First state, don't show number yet
      icon.classList.add("opaque");
    } else if (level === 2) {
      // Show number
      number.classList.add("opaque");
    }
  };
})
