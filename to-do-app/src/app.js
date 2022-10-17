import authRouter from "./routers/auth.js";
import taskRouter from "./routers/task.js";
import { checkLoggedIn } from "./middleware/auth.middleware.js";

const app = (urlArray, body, method, headers) => {
  console.log(urlArray, method);
  if (urlArray[0] === "auth") {
    return authRouter(urlArray, body, method);
  } else if (urlArray[0] === "task") {
    if (checkLoggedIn(headers["x-access-token"])) {
      return taskRouter(urlArray, body, method);
    }
    return {
        status:false,
        message:"Please Log in to continue"
    }
  }
  return {
    status:false,
    message:"Invalid Route"
}
};

export default app;
