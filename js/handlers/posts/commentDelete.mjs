import { deleteComment } from "../../api/posts/deleteComment.mjs";

import { displayPosts, displayUserPosts } from "../index.mjs";

/**
 * Handles the click event when a user clicks on the "Delete Comment" button.
 * @param {Event} event - The click event object.
 * @param {string} postId - The ID of the post containing the comment.
 * @param {string} commentId - The ID of the comment to be deleted.
 */
export async function handleDeleteCommentButtonClick(event, postId, commentId) {
  event.preventDefault();

  const deleteCommentModal = new bootstrap.Modal(
    document.getElementById("deleteCommentModal")
  );
  deleteCommentModal.show();

  const confirmDeleteCommentButton = document.getElementById(
    "confirmDeleteCommentButton"
  );
  confirmDeleteCommentButton.addEventListener("click", async () => {
    try {
      await deleteComment(postId, commentId);
      deleteCommentModal.hide();

      if (document.querySelector("#userPosts")) {
        displayUserPosts();
      } else {
        displayPosts();
      }
    } catch (error) {
      console.error(`Error deleting comment ${commentId}:`, error);
    }
  });

  const cancelDeleteCommentButton = document.getElementById(
    "cancelDeleteCommentButton"
  );
  cancelDeleteCommentButton.addEventListener("click", () => {
    deleteCommentModal.hide();
  });
}
