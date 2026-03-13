export function initMenu() {
  const menuBtn = document.querySelector(".menu-button");
  const menu = document.querySelector(".menu");

  if (!menuBtn || !menu) return;

  menuBtn.addEventListener("click", () => {
    menu.classList.toggle("closed");
    menu.classList.toggle("darker");
  });
}