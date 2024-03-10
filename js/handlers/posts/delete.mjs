import { getPostById } from "../../api/posts/get.mjs";
import { removePost } from "../../api/posts/delete.mjs";
import { showMessage } from "../../utils/messages.mjs";
import { createSinglePostElement } from "../../templates/index.mjs";
import { displayPosts, displayUserPosts } from "../index.mjs";

export async function handleDeleteButtonClick(event, postId) {
  event.preventDefault();

  const deletePostModal = new bootstrap.Modal(
    document.getElementById("deletePostModal")
  );

  try {
    // Fetch the post data by its ID
    const postData = await getPostById(postId);

    const modalContent = deletePostModal._element.querySelector(".modal-body");
    modalContent.innerHTML = "";

    const deletePostElement = createSinglePostElement(postData);

    modalContent.appendChild(deletePostElement);
    // Event listener to the confirm delete button
    const confirmDeleteButton = document.getElementById("confirmDeleteButton");
    confirmDeleteButton.addEventListener("click", async () => {
      try {
        // Call the removePost function to delete the post
        await removePost(postId);
        deletePostModal.hide();

        showMessage("Post deleted successfully!", "success");
   
        
        if (document.querySelector("#userPosts")) {
          displayUserPosts();
        } else {
          displayPosts();
        }
        
      } catch (error) {
        const errorMessage = "Could not delete post:" + error.message;

        showMessage(errorMessage, "error");
      }
    });

    deletePostModal.show();
  } catch (error) {
    const errorMessage = "Error fetching post data:" + error.message;
    showMessage(errorMessage, "error");
    console.error("Error fetching post data:", error);
  }
}
