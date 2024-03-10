import { API_SOCIAL_URL } from "../api_constants.mjs";
import { authFetch } from "../authFetch.mjs";
import { showMessage } from "../../utils/messages.mjs";
import { load } from "../../storage/index.mjs";
import { showLoader, hideLoader } from "../../utils/loader.mjs";

const POST_ACTION = "/posts";
const PROFILE_ACTION = "/profiles/";
const QUERY_PARAMS = "_author=true&_comments=true";
/**
 * Retrieves all posts from the server.
 * @returns {Promise<Object[]>} An array of post objects.
 * @throws {Error} If fetching posts fails.
 */

export async function getPosts() {
  showLoader();
  const getPostURL = `${API_SOCIAL_URL}${POST_ACTION}?${QUERY_PARAMS}`;

  try {
    const response = await authFetch(getPostURL);
    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.status}`);
    }
    hideLoader();
    return await response.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    showMessage("Failed to fetch posts. Please try again later.", "error");
    throw error;
  }
}

/**
 * Retrieves comments for a post from the server.
 * @param {string} postId - The ID of the post to retrieve comments for.
 * @returns {Promise<Object[]>} An array of comment objects.
 * @throws {Error} If fetching comments fails.
 */

export async function getPostById(id) {
  if (!id) {
    throw new Error("Get requires a postID");
  }
  showLoader();
  const getPostByIdURL = `${API_SOCIAL_URL}${POST_ACTION}/${id}?${QUERY_PARAMS}`;

  try {
    const response = await authFetch(getPostByIdURL);
    if (!response.ok) {
      throw new Error(`Failed to fetch post: ${response.status}`);
    }
    hideLoader();
    return await response.json();
  } catch (error) {
    console.error("Error fetching post by ID:", error);
    showMessage("Failed to fetch post by ID. Please try again later.", "error");
    throw error;
  }
}

/**
 * Retrieves posts for a specific user's profile from the server.
 * @param {string} username - The username of the user whose posts to fetch.
 * @returns {Promise<Object[]>} An array of post objects.
 * @throws {Error} If fetching posts fails.
 */
export async function getUserProfilePosts() {
  showLoader();
  const userProfile = load("profile");
  const userName = userProfile.name;
  const getUserPostsURL = `${API_SOCIAL_URL}${PROFILE_ACTION}${userName}${POST_ACTION}?${QUERY_PARAMS}`;
  try {
    const response = await authFetch(getUserPostsURL);
    if (!response.ok) {
      throw new Error(`Failed to fetch user's posts: ${response.status}`);
    }
    hideLoader();
    return await response.json();
  } catch (error) {
    console.error("Error fetching user's posts:", error);
    showMessage(
      "Failed to fetch user's posts. Please try again later.",
      "error"
    );
    throw error;
  }
}
