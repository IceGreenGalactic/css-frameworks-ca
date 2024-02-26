import { load } from "../storage/index.mjs";

export function updateProfileFromLocalStorage() {
  // Retrieve user profile from localStorage
  const userProfile = load("profile");

  if (userProfile) {
    // Replace "user name" with the user's name
    const elementsWithUsername = document.querySelectorAll(".replace-username");
    elementsWithUsername.forEach((element) => {
      element.textContent = element.textContent.replace(
        "user name",
        userProfile.name
      );
    });

    // Replace "img" with the user's avatar image URL or default avatar if not provided
    const elementsWithAvatar = document.querySelectorAll(".replace-avatar");
    elementsWithAvatar.forEach((element) => {
      const avatarImage = userProfile.avatar
        ? userProfile.avatar
        : "../../image/default-avatar.JPG";
      element.src = avatarImage;
      element.alt =
        "profile picture default - silhouette of a person in profile with paint around head";
    });

    // Set banner image
    const bannerImage = document.querySelector(".profile-banner");
    if (bannerImage) {
      if (userProfile.banner) {
        bannerImage.style.backgroundImage = `url(${userProfile.banner})`;
      } else {
        // Use default banner image if userProfile.banner is null
        bannerImage.style.backgroundImage = `url(../../image/default-banner.JPG)`;
      }
    }
  }
}
// Execute profile update logic when DOM content is loaded
document.addEventListener("DOMContentLoaded", updateProfileFromLocalStorage);
