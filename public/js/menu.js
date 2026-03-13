export function initMenu() {
  const menuBtn = document.querySelector(".menu-btn");
  const nav = document.querySelector("nav");

  if (!menuBtn || !nav) return;

  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}