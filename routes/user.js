import express from "express";
import { userModel } from "../models/user.js";
import bcrypt from "bcrypt";
const userRouter = express.Router();

userRouter.get("/signup", (req, res) => {
  res.render("signup");
});
userRouter.get("/signin", (req, res) => {
  res.render("signin");
});

userRouter.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password) {
    return res.status(400).json({ error: "Please fill all fields" });
  }
  const user = await userModel.create({ fullName, email, password });
  res.user = user;
  user.salt = undefined;
  user.password = undefined;
  return res.redirect("/");
});

userRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Please fill all fields" });
  }
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(400).json({ error: "Not a valid Email" });
  }
  const gen_hashedPassword = await bcrypt.hash(password, user.salt);
  if (user.password === gen_hashedPassword) {
    return res.json({ success: "true", message: "Login successful" });
  }
  return res.json({ success: "false", message: "Incorrect Password" });
});
export { userRouter };
