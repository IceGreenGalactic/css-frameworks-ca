import { addComment } from "../../api/posts/comment.mjs";
import { subject } from "../observers/commonObservers.mjs";
import { showMessage } from "../../utils/messages.mjs";
import { displayPosts, displayUserPosts } from "../index.mjs";

/**
 * Opens the comment modal.
 */
function openCommentModal() {
  const commentModal = new bootstrap.Modal(
    document.getElementById("commentModal")
  );
  commentModal.show();
}

/**
 * Handles the click event on the comment button.
 * @param {Event} event - The click event object.
 * @param {string} postId - The ID of the post.
 */
export function handleCommentButtonClick(event, postId) {
  try {
    openCommentModal();
    // Get the submit button outside the event listener
    const submitCommentBtn = document.getElementById("submitCommentBtn");

    // Define the event listener function
    async function submitCommentHandler() {
      event.preventDefault();
      const commentText = document.getElementById("commentText").value;
      if (commentText.trim() === "") {
        showMessage("Please enter a comment.", "error");
        return;
      }

      // Add the comment
      try {
        await addComment(postId, commentText);
        subject.notify(postId);
        showMessage("Comment added successfully.", "success");
        document.getElementById("commentText").value = "";
       
          if (document.querySelector("#userPosts")) {
            displayUserPosts();
          } else {
            displayPosts();
          }
      } catch (error) {
        console.error("Error adding comment:", error);
        showMessage(
          "Failed to add comment. Please try again later.",
          "error",
          error
        );
      }
      // Close the modal after adding the comment
      const commentModal = bootstrap.Modal.getInstance(
        document.getElementById("commentModal")
      );
      commentModal.hide();

      // Remove the event listener after submitting the comment
      submitCommentBtn.removeEventListener("click", submitCommentHandler);
    }

    submitCommentBtn.addEventListener("click", submitCommentHandler);
  } catch (error) {
    console.error("Error handling comment click:", error);
    showMessage(
      "An unexpected error occurred. Please try again later.",
      "error",
      error
    );
  }
}
