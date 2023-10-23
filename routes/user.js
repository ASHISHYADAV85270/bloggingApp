import express from "express";
import {
  signUpUserHandler,
  signInUserHandler,
  logoutUserHandler,
} from "../controllers/user.js";
const userRouter = express.Router();

userRouter.get("/signup", (req, res) => {
  res.render("signup");
});
userRouter.get("/signin", (req, res) => {
  res.render("signin");
});
userRouter.get("/logout", logoutUserHandler);
userRouter.post("/signup", signUpUserHandler);
userRouter.post("/signin", signInUserHandler);
export { userRouter };
