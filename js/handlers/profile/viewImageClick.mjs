import { showMessage } from "../../utils/messages.mjs";

export async function handleViewImageClick(event, imageUrl) {
  event.preventDefault();

  const viewImageModal = new bootstrap.Modal(
    document.getElementById("viewImageModal")
  );

  try {
    // Create an image element
    const imageElement = document.createElement("img");
    imageElement.src = imageUrl;
    imageElement.classList.add("img-fluid");
    imageElement.style.height = "40vh";
    // Clear modal content
    const modalContent =
      viewImageModal._element.querySelector(".image-modal-body");
    modalContent.innerHTML = "";
    console.log(modalContent);
    modalContent.appendChild(imageElement);

    // Show the modal
    viewImageModal.show();
  } catch (error) {
    const errorMessage = "Error displaying image:" + error.message;
    showMessage(errorMessage, "error");
    console.error("Error displaying image:", error);
  }
}
