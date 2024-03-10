/**
 * Stores the current scroll position in sessionStorage.
 */
export function storeScrollPosition() {
  const scrollPosition = window.scrollY;
  sessionStorage.setItem("scrollPosition", scrollPosition);
}

/**
 * Restores the scroll position from sessionStorage.
 */
export function restoreScrollPosition() {
  const scrollPosition = sessionStorage.getItem("scrollPosition");
  if (scrollPosition !== null) {
    window.scrollTo(0, parseInt(scrollPosition));
    sessionStorage.removeItem("scrollPosition");
  }
}

/**
 * Scrolls the page to the top when the scroll-to-top button is clicked.
 */
export function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Smooth scrolling behavior
  });
}

/**
 * Creates a scroll-to-top button and appends it to the document body.
 * @returns {HTMLButtonElement} The created scroll-to-top button.
 */
export function createScrollToTopButton() {
  const scrollToTopButton = document.createElement("button");
  scrollToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollToTopButton.classList.add(
    "scroll-to-top-button",
    "btn",
    "btn-info",
    "btn-floating",
    "btn-md"
  );
  document.body.appendChild(scrollToTopButton);
  return scrollToTopButton;
}
const scrollToTopButton = createScrollToTopButton();
scrollToTopButton.addEventListener("click", scrollToTop);

function handleScroll() {
  const scrollToTopButton = document.querySelector(".scroll-to-top-button");
  if (window.scrollY > 5000) {
    scrollToTopButton.classList.add("visible");
  } else {
    scrollToTopButton.classList.remove("visible");
  }
}

// Attach scroll event listener to window
window.addEventListener("scroll", handleScroll);
