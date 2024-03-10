/**
 * Creates a single post element based on the provided post data.
 * @param {Object} postData - The data of the post.
 * @returns {HTMLElement} - The created single post element.
 */
export function createSinglePostElement(postData) {
  try {
    const singlePostElement = document.createElement("div");
    singlePostElement.classList.add("single-post");

    const title = document.createElement("h4");
    title.classList.add("card-title", "text-center");
    title.textContent = postData.title || "Title";

    const media = document.createElement("img");
    media.src = postData.media;
    media.alt = "Post Media";
    media.classList.add("img-fluid");
    media.style.maxHeight = "50vh";

    const body = document.createElement("p");
    body.classList.add("card-text", "text-center");
    body.textContent = postData.body;

    singlePostElement.appendChild(title);
    singlePostElement.appendChild(media);
    singlePostElement.appendChild(body);

    return singlePostElement;
  } catch (error) {
    console.error("Error creating single post element:", error);
    return null; // Return null in case of error
  }
}
