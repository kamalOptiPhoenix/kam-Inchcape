let lastScrollY = window.scrollY;

function showBarFixed() {
  const bar = document.getElementById("t2butterbar");
  if (!bar) return;
  bar.classList.remove("at-top", "hidden");
  bar.classList.add("fixed-top");
}

function moveBarAboveNav() {
  const bar = document.getElementById("t2butterbar");
  const header = document.querySelector(
    ".header-regions-wrapper .site.header"
  );

  if (!bar || !header) return;

  // Put bar before header
  header.insertAdjacentElement("beforebegin", bar);
  bar.classList.remove("fixed-top", "hidden");
  bar.classList.add("at-top");
}

export default function handleScroll() {
  const currentY = window.scrollY;
  const scrollingUp = currentY < lastScrollY;

  lastScrollY = currentY;

  // === At very top of page ===
  if (currentY === 0) {
    moveBarAboveNav();
    return;
  }

  // === SCROLLING UP ===
  if (scrollingUp) {
    showBarFixed();
  }
}

export { moveBarAboveNav };

