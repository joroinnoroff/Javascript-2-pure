import { setRegisterformListener } from "./register";

import { setLoginFormListener } from "./login";

setRegisterformListener();
setLoginFormListener();

const path = location.pathname;

if (path === "/profile/login") {
  setLoginFormListener();
} else if (path === "/profile/register") {
  setRegisterformListener();
}
