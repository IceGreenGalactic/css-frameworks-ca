import { updatePost } from "../../api/posts/update.mjs";
import { displayPosts, displayUserPosts } from "../index.mjs";
import { showMessage } from "../../utils/messages.mjs";

let editPostModal; // Declare the variable outside the functions

export function handleEditButtonClick(event, postData) {
  if (!editPostModal) {
    editPostModal = new bootstrap.Modal(
      document.getElementById("editPostModal")
    );
  }

  // Populate the form fields with existing post data
  document.getElementById("editTitle").value = postData.title;
  document.getElementById("editBody").value = postData.body;
  document.getElementById("editMedia").value = postData.media;
  document.getElementById("editPostId").value = postData.id;

  // Show the edit post modal
  editPostModal.show();

  return editPostModal;
}

export function setUpdatePostListener() {
  document.addEventListener("DOMContentLoaded", () => {
    const editPostForm = document.querySelector("#editPostForm");

    if (editPostForm) {
      editPostForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(editPostForm);
        const post = Object.fromEntries(formData.entries());

        // Send it to the API
        try {
          const { title, body, media, id } = post;
          const updatedPost = await updatePost(title, body, media, id);
          console.log("Updated Post:", updatedPost);
        } catch (error) {
          console.error("Error updating post:", error);
        }
      });
    }
  });
}

export function modalEditPost() {
  if (!editPostModal) {
    editPostModal = new bootstrap.Modal(
      document.getElementById("editPostModal")
    );
  }

  const editPostForm = document.querySelector("#editPostForm");

  editPostForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(editPostForm);
    const post = Object.fromEntries(formData.entries());

    try {
      const { title, body, media, id } = post;

      if (!id) {
        throw new Error("Update requires a postID");
      }

      // Update the post via API
      await updatePost(title, body, media, id);

      if (document.querySelector("#userPosts")) {
        displayUserPosts();
      } else {
        displayPosts();
      }
      
      showMessage("Post updated successfully.", "success");

      editPostModal.hide();
    } catch (error) {
      console.error("Error updating post:", error);

      editPostModal.hide();
      showMessage("Failed to update post. Please try again.", "error");
    }
  });
}
