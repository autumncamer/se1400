const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const mobileMenu = window.matchMedia("(max-width: 500px)");

if (!(header instanceof HTMLElement) || !(menuButton instanceof HTMLButtonElement) ||
    !(siteNav instanceof HTMLElement)) {
  throw new Error("The responsive navigation controls could not be found.");
}

function closeMenu() {
  header.classList.remove("menu-open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation");
}

function updateMenuMode() {
  header.classList.toggle("has-menu-toggle", mobileMenu.matches);
  if (!mobileMenu.matches) {
    closeMenu();
  }
}

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  header.classList.toggle("menu-open", !isOpen);
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
});

siteNav.addEventListener("click", (event) => {
  if (event.target instanceof Element && event.target.closest("a")) {
    closeMenu();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && header.classList.contains("menu-open")) {
    closeMenu();
    menuButton.focus();
  }
});

mobileMenu.addEventListener("change", updateMenuMode);
updateMenuMode();
