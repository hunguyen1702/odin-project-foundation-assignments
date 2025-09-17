(() => {
  const container = document.querySelector(".container")
  const imgCreditLight = document.querySelector(".img-credit.light");
  const imgCreditDark = document.querySelector(".img-credit.dark");
  let theme = "light"

  alert("Double click to toggle theme");

  container.addEventListener("dblclick", (e) => {
    e.stopPropagation()
    container.classList.toggle(theme)
    theme = theme === "light" ? "dark" : "light"
    container.classList.toggle(theme)
    if (theme === "light") {
      imgCreditLight.style.display = "block"
      imgCreditDark.style.display = "none"
    } else {
      imgCreditLight.style.display = "none"
      imgCreditDark.style.display = "block"
    }
  })
})();
