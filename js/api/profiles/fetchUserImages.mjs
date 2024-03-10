import { showMessage } from "../../utils/messages.mjs";
import { getUserProfilePosts } from "../../api/posts/get.mjs";

export async function fetchUserPostImages() {
  try {
    // Fetch user's posts
    const userPosts = await getUserProfilePosts();

    // Extract images from user's posts
    const images = userPosts.reduce((imageList, post) => {
      if (post.media && post.media.length > 0) {
        imageList.push(post.media);
      }
      return imageList;
    }, []);

    return images;
  } catch (error) {
    console.error("Error fetching user post images:", error);
    showMessage(
      "Failed to fetch user post images. Please try again later.",
      "error"
    );
    throw error;
  }
}
