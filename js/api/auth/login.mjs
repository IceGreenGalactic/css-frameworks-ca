import { API_SOCIAL_URL } from "../api_constants.mjs";
import * as storage from "../../storage/index.mjs";
import { showMessage } from "../../utils/messages.mjs";
import { showLoader, hideLoader } from "../../utils/loader.mjs";

/**
 * Logs in the user with the provided profile.
 *
 * @param {Object} profile The user profile containing login credentials.
 * @param {string} profile.username The username of the user.
 * @param {string} profile.password The password of the user.
 * @returns {Promise<void>} A Promise that resolves when the login process is complete.
 * @throws {Error} If the login process fails.
 */

const action = "/auth/login";
const method = "post";

export async function login(profile) {
  const loginURL = API_SOCIAL_URL + action;
  const body = JSON.stringify(profile);

  try {
    showLoader();

    const response = await fetch(loginURL, {
      headers: {
        "Content-Type": "application/json",
      },
      method,
      body,
    });

    if (!response.ok) {
      if (response.status === 401) {
        const error = new Error("Wrong password or email");
        error.type = "warning";
        throw error;
      } else {
        throw new Error(`Failed to login: ${response.status}`);
      }
    }

    const { accessToken, ...user } = await response.json();

    storage.save("token", accessToken);
    storage.save("profile", user);

    if (accessToken) {
      setTimeout(() => {
        window.location.href = "../../../profile/";
      }, 2000);
    } else {
      throw new Error("No access token provided, please register");
    }
  } catch (error) {
    console.error("Error logging in:", error);
    const errorMessage = `Failed to login: ${error.message}`;
    showMessage(errorMessage, error.type || "error"); // Set the default type to "error"
    throw error;
  } finally {
    hideLoader();
  }
}
