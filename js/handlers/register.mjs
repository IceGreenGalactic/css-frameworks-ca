import { register } from "../api/auth/register.mjs";


export function setRegisterFormListener() {
  
  const form = document.querySelector("#registrationForm");


  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const profile = Object.fromEntries(formData.entries());


    // Send it to the API
    register(profile)
      .then(() => {
     
      })
      .catch((error) => {
        console.error("Error registering:", error);
      });
  
  });
}

// Call the function inside the DOMContentLoaded event listener
document.addEventListener("DOMContentLoaded", function() {
  console.log("Script loaded");

  // Call the function to set up the listener
  setRegisterFormListener();
});
