import { likePost } from "../../api/posts/like.mjs";
import { subject } from "../observers/commonObservers.mjs";
import { showMessage } from "../../utils/messages.mjs";

export async function handleLikeButtonClick(event, postId, symbol) {
  try {
    await likePost(postId, symbol);

    subject.notify(postId);
  } catch (error) {
    console.error("Error liking post:" + error.message, error);
    showMessage(
      "An unexpected error occurred. Please try again later.",
      "error",
      error
    );
  }
}
