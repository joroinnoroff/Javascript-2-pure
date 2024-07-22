// LoginForm.js

import { login } from "../../login/index";

export function setLoginFormListener() {
  const form = document.querySelector("#loginForm");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const profile = Object.fromEntries(formData.entries());
    // Send it to the API
    login(profile);
  });
}
