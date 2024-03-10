import { registerURL } from "../api_constants.mjs";
import { showMessage } from "../../utils/messages.mjs";
import { showLoader, hideLoader } from "../../utils/loader.mjs";


/**
 * Registers a new user profile.
 * @param {Object} profile - The profile information to register.
 * @param {string} profile.username - The username of the user.
 * @param {string} profile.email - The email address of the user.
 * @param {string} profile.password - The password for the user account.
 * @returns {Promise<void>} - A promise indicating the completion of the registration process.
 * @throws {Error} - Throws an error if registration fails.
 */

const method = "post";

export async function register(profile) {
  const body = JSON.stringify(profile);

  try {
    showLoader();

    const response = await fetch(registerURL, {
      headers: { "Content-Type": "application/json" },
      method,
      body,
    });
    const result = await response.json();

    if (response.ok) {
      showMessage(
        "Registration successful! Please log in to continue.",
        "success"
      );
      setTimeout(() => {
        window.location.href = "/profile/login/";
      }, 3000);
    } else {
      const errorMessage =
        result?.errors?.[0]?.message ||
        "Registration failed. Please try again.";
      showMessage(
        `Registration failed: ${errorMessage}`,
        errorMessage === "Profile already exists. Please login"
          ? "error"
          : "warning"
      );
      if (
        (errorMessage === "Profile already exists. Please login", "warning")
      ) {
        setTimeout(() => {
          window.location.href = "/profile/login/";
        }, 3000);
      }
    }
  } catch (error) {
    console.error("Error during registration:", error);
    showMessage("Registration failed. Please try again.", "error");
  } finally {
    hideLoader();
  }
}
