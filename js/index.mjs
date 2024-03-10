import * as utils from "./utils/index.mjs";
import * as listeners from "./handlers/index.mjs";
import { handleLogout } from "./handlers/index.mjs";
import { router } from "./router.mjs";

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    listeners.setUpdatePostListener
  );
} else {
  listeners.setUpdatePostListener();
}

document.addEventListener("DOMContentLoaded", async () => {
  if (utils.updateProfileFromLocalStorage) {
    utils.updateProfileFromLocalStorage();
  }

  // Call the router function
  router();

  const logoutLink = document.getElementById("logoutLink");
  if (logoutLink) {
    logoutLink.addEventListener("click", handleLogout);
  }
});
