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
 * @returns {HTMLButtonElement} The created scroll-to-top button element.
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

// Create the scroll-to-top button
const scrollToTopButton = createScrollToTopButton();

// Add click event listener to the scroll-to-top button
scrollToTopButton.addEventListener("click", scrollToTop);

/**
 * Handles the scroll event and toggles the visibility of the scroll-to-top button.
 * The button becomes visible when the user has scrolled down beyond a certain threshold.
 */
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
