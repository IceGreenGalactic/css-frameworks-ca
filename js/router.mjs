import * as listeners from "./handlers/index.mjs";

export function router() {
  const path = location.pathname;

  switch (path) {
    case "/profile/login/":
      listeners.setLoginFormListener();
      return;
    case "/profile/register/":
      listeners.setRegisterFormListener();
      return;
    case "/profile/":
      listeners.displayUserPosts();
      listeners.setCreatePostListener();
      listeners.modalEditPost();
      listeners.displayUserPostImages();
      listeners.displayAllUserImages();
      return;
    case "/profile/edit/":
      listeners.setUpdateProfileListener();
      return;
    case "/feed/":
      listeners.displayPosts();
      listeners.setCreatePostListener();
      listeners.modalEditPost();
      listeners.handleSortOptionChange();
      return;
  }
}
