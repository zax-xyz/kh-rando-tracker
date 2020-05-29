document.querySelectorAll(".toggle").forEach(element => {
  element.onclick = (event) => {
    let elem = event.target.parentElement;

    let total = elem.dataset.total;
    let icon = elem.querySelector(".icon");

    if (total === undefined) {
      // If there is no "total" data attribute, then it is a simple toggle
      icon.classList.toggle("opaque");
      return;
    }

    // Current is the number associated - like 2nd/3rd visits or lvl 2 drive
    let current = Number(elem.dataset.current);
    if (Number.isNaN(current)) {
      // Initialise current to 0 if not found
      current = 0;
    }

    // Increase current, resetting to 0 if it reaches the max
    let new_current = (current + 1) % (Number(total) + 1);
    elem.dataset.current = new_current;

    // Set the number element source to the corresponding image
    let number = elem.querySelector(".number");
    if (new_current !== 0) {
      number.setAttribute("src", `img/${new_current}.png`);
    }

    // Set CSS classes if necessary
    if (new_current === 0) {
      // Disabled
      icon.classList.remove("opaque");
      number.classList.remove("opaque");
    } else if (new_current === 1) {
      // First state, don't show number yet
      icon.classList.add("opaque");
    } else if (new_current === 2) {
      // Show number
      number.classList.add("opaque");
    }
  };
})
