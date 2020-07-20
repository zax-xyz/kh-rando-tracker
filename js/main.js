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
    // When in group, don't increase level if item unlocked for first time but already levelled
    level = (level + (end + offset) % end) % end;

  elem.dataset.level = level;

  if (nobody && level === total)
    // Show nobody symbol on last level
    nobody.classList.add("opaque");

  const imgNum = Math.min(level, total - Boolean(nobody))

  const group = elem.dataset.group;
  const elems = group ? document.querySelectorAll(`[data-group="${group}"]`) : [ elem ];

  elems.forEach((groupElem) => {
    // Change state for each item in group
    groupElem.dataset.level = level;

    let icon = groupElem.querySelector(".icon");
    const number = groupElem.querySelector(".number");
    const nobody = groupElem.querySelector(".nobody");

    icon = elem === groupElem ? icon : null;

    if (imgNum > 1)
      number?.setAttribute("src", `img/numbers/${imgNum}.png`);

    switch (level) {
      case 0:
        // Disable
        icon?.classList.remove("opaque");
        number?.classList.remove("opaque");
        nobody?.classList.remove("opaque");
        break;

      case 1:
        // First state, don't show number yet
        icon?.classList.add("opaque");
        number?.classList.remove("opaque");
        break;

      default:
        icon?.classList.add("opaque");
        number?.classList.add("opaque");
        break;
    }
  })
}

function handleSecondary(event) {
  const elem = event.currentTarget;
  if (elem.classList.contains("disabled"))
    return;

  const secondary = elem.querySelector(".secondary");
  if (!secondary)
    return;

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

// Item clicking
document.querySelectorAll(".grid > div").forEach((elem) => {
  elem.onmousedown = (event) => {
    switch (event.button) {
      case 0:
        // Left click
        handlePrimary(event);
        break;

      case 2:
        // Right click
        handleSecondary(event);
        break;

      case 1:
        // Middle click
        handleDisable(event);
        break;
    }
  };

  // We have our own events for right click so the context menu would be intrusive
  elem.oncontextmenu = (event) => event.preventDefault();

  // Scroll to increment/decrement
  elem.onwheel = (event) => {
    // Check setting is on
    if (localStorage.scroll !== "true")
      return;

    // Prevent page scroll
    event.preventDefault();

    // Increment/decrement
    const offset = event.deltaY < 0 ? 1 : -1;
    handlePrimary(event, offset);
  }
});

document.body.onmousedown = (event) => {
  if (event.button === 1)
    // Prevent autoscroll on middle click
    return false;
}
