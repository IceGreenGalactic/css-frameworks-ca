import { updatePost } from "../../api/posts/update.mjs";
import * as scrollUtils from "../../utils/index.mjs";

export function modalEditPost() {
  const editPostForm = document.querySelector("#editPostForm");
  const editPostModal = new bootstrap.Modal(
    document.getElementById("editPostModal")
  );

  editPostForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(editPostForm);
    const post = Object.fromEntries(formData.entries());
    try {
      const { title, body, media, id } = post;

      if (!id) {
        throw new Error("Update requires a postID");
      }

      await updatePost(title, body, media, id);

      editPostModal.hide();

      scrollUtils.storeScrollPosition();
      // Reload the page to reflect the updated post
      window.location.reload(true);
    } catch (error) {
      console.error("Error updating post:", error);
      editPostModal.hide();
      showMessage(
        "Failed to update post. Please try again." + error.message,
        "error"
      );
    }
  });
  setTimeout(() => {
    scrollUtils.restoreScrollPosition();
  }, 1000);
}
