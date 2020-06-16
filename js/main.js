function handleLeftClick(event) {
    const elem = event.currentTarget;
    const icon = elem.querySelector(".icon");
    const number = elem.querySelector(".number");
    const nobody = elem.querySelector(".nobody");
    let level = Number(elem.dataset.level) || 0;
    let total = elem.dataset.total || 1;
    total = Number(total) + Boolean(nobody);
    level = (level + 1) % (total + 1);
    elem.dataset.level = level;
    if (nobody !== null && level === total) {
        nobody.classList.add("opaque");
        return;
    }
    if (number !== null && level > 1) {
        number.setAttribute("src", `img/numbers/${level}.png`);
    }
    switch (level) {
      case 0:
        icon.classList.remove("opaque");
        number && number.classList.remove("opaque");
        nobody && nobody.classList.remove("opaque");
        break;

      case 1:
        icon.classList.add("opaque");
        break;

      case 2:
        number.classList.add("opaque");
        break;
    }
}

function handleRightClick(event) {
    const elem = event.currentTarget;
    const secondary = elem.querySelector(".secondary");
    secondary && secondary.classList.toggle("opaque");
}

document.querySelectorAll(".grid > div").forEach(element => {
    element.onmousedown = (event => {
        switch (event.button) {
          case 0:
            handleLeftClick(event);
            break;

          case 2:
            handleRightClick(event);
            break;
        }
    });
    element.oncontextmenu = (event => {
        event.preventDefault();
    });
});

document.querySelectorAll("footer .popup > button").forEach(element => {
    element.onclick = (event => {
        const content = element.nextElementSibling;
        content.classList.toggle("active");
    });
});

document.querySelectorAll("footer .popup > .content").forEach(element => {
    element.onclick = (event => {
        if (element !== event.target) {
            return;
        }
        element.classList.remove("active");
    });
});

document.onkeydown = (event => {
    if (event.key === "Escape") {
        const activeElem = document.querySelector("footer .popup > .content.active");
        if (activeElem !== null) {
            activeElem.classList.remove("active");
        }
    }
});

const themeBtn = document.querySelector("#theme-btn");

if (theme === "dark") {
    themeBtn.innerHTML = "Light Theme";
} else {
    themeBtn.innerHTML = "Dark Theme";
}

themeBtn.onclick = (event => {
    if (theme === "light") {
        theme = "dark";
        themeBtn.innerHTML = "Light Theme";
    } else {
        theme = "light";
        themeBtn.innerHTML = "Dark Theme";
    }
    setTheme();
});