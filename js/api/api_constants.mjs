export const API_HOST_URL = "https://api.noroff.dev";
export const API_BASE = "/api/v1";
export const API_AUTH = "/auth";
export const API_REGISTER = "/register";
export const API_LOGIN = "/login";
export const API_SOCIAL_BASE = "/social";
export const API_KEY_URL = "/create-api-key";

/**
 * The base URL of the social API.
 * @type {string}
 */
export const API_SOCIAL_URL = `${API_HOST_URL}${API_BASE}${API_SOCIAL_BASE}`;

/**
 * The URL for registering a new user.
 * @type {string}
 */
export const registerURL = `${API_HOST_URL}${API_BASE}${API_SOCIAL_BASE}${API_AUTH}${API_REGISTER}`;

/**
 * The URL for retrieving posts.
 * @type {string}
 */
export const postsURL = `${API_SOCIAL_URL}/posts`;
