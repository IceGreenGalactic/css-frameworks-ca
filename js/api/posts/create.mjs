import { API_SOCIAL_URL } from "../api_constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/posts";
const method = "Post";

export async function createPost(postData) {
  const createPostURL = API_SOCIAL_URL + action;

  const response = await authFetch(createPostURL, {
    method,
    body: JSON.stringify(postData),
  });

  return await response.json();
}