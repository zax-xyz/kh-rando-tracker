function handleLeftClick(e){const t=e.currentTarget,a=t.querySelector(".icon"),o=t.querySelector(".nobody");let c=Number(t.dataset.level)||0,n=t.dataset.total||1;c=(c+1)%(n=Number(n)+(o?2:1)),t.dataset.level=c;const r=o&&c===n-1,s=t.querySelector(".number");s&&c>0&&!r&&s.setAttribute("src",`img/numbers/${c}.png`),0===c?(a.classList.remove("opaque"),s&&s.classList.remove("opaque"),o&&o.classList.remove("opaque")):r?o.classList.add("opaque"):1===c?a.classList.add("opaque"):2===c&&s.classList.add("opaque")}function handleRightClick(e){const t=e.currentTarget.querySelector(".secondary");t&&t.classList.toggle("opaque")}document.querySelectorAll(".grid > div").forEach(e=>{e.onmousedown=(e=>{switch(e.button){case 0:handleLeftClick(e);break;case 2:handleRightClick(e)}}),e.oncontextmenu=(e=>{e.preventDefault()})}),document.getElementById("theme-btn").onclick=(e=>{"light"===theme?(theme="dark",e.target.innerHTML="Light Theme"):(theme="light",e.target.innerHTML="Dark Theme"),document.documentElement.setAttribute("theme",theme);document.cookie=`theme=${theme}; max-age=31536000`});