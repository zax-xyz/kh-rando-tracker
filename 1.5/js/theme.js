"use strict";function setTheme(){document.documentElement.setAttribute("theme",theme);try{localStorage.theme=theme}catch(a){}}try{var theme=localStorage.theme}catch(a){console.error("Could not read localStorage, using defaults")}theme===void 0&&(theme="dark"),"dark"===theme?setTheme():theme="light";

//# sourceMappingURL=theme.js.map