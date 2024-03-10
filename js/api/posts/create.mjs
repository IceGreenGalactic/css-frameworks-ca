import { API_SOCIAL_URL } from "../api_constants.mjs";
import { authFetch } from "../authFetch.mjs";
import { showMessage } from "../../utils/messages.mjs";
import { getPosts } from "./get.mjs";

const action = "/posts";
const method = "POST";

/**
 * Creates a new post.
 * @param {Object} postData - The data for the post to be created.
 * @returns {Promise<Object>} - A promise resolving to the created post object.
 * @throws {Error} - Throws an error if creating the post fails.
 */

export async function createPost(postData) {
  const createPostURL = API_SOCIAL_URL + action;

  try {
    const response = await authFetch(createPostURL, {
      method,
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create post: ${response.status}`);
    }

    const updatedPosts = await getPosts(); // Fetch the updated list of posts
    return updatedPosts; // Return the updated list of posts
  } catch (error) {
    console.error("Error creating post:", error);
    showMessage("Failed to create post. Please try again later.", "error");
    throw error;
  }
}
