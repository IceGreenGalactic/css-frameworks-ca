import { createPost } from "../../api/posts/index.mjs";
import { showMessage } from "../../utils/messages.mjs";
import { displayPosts, displayUserPosts } from "../index.mjs";

export function setCreatePostListener() {
  const form = document.querySelector("#newPostForm");
  const createPostModal = new bootstrap.Modal(
    document.getElementById("createPostModal")
  );
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      const post = Object.fromEntries(formData.entries());

      // Makes tags optional
      const tags = formData.has("tags")
        ? formData
            .get("tags")
            .split(",")
            .map((tag) => tag.trim())
        : undefined;
      if (tags) {
        post.tags = tags;
      }

      // Send it to the API
      createPost(post)
        .then((data) => {
          // Form is valid, close the modal
          createPostModal.hide();
          form.reset();
          showMessage("Post created successfully!", "success");
      
          if (document.querySelector("#userPosts")) {
            displayUserPosts();
          } else {
            displayPosts();
          }

      
        })
        .catch((error) => {
          console.error("Error creating post:", error);
          showMessage("Error creating post:" + error.message, error);
        });
    });
  }
}
