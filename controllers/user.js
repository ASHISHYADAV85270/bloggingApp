import { userModel } from "../models/user.js";
import bcrypt from "bcrypt";
import { createToken } from "../utils/auth.js";

async function signUpUserHandler(req, res) {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res
        .status(401)
        .render("signup", { error: "Please fill all fields" });
    }
    let user = await userModel.findOne({ email });
    if (user) {
      return res.status(401).render("signup", { error: "User already exists" });
    }
    user = await userModel.create({ fullName, email, password });
    const token = createToken(user);
    user.salt = undefined;
    user.password = undefined;
    res.user = user;
    return res.cookie("token", token).render("home", { user: user });
  } catch (error) {
    return res
      .status(401)
      .render("signup", { error: "Error from server side" });
  }
}
async function signInUserHandler(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(401)
        .render("signin", { error: "Please fill all fields" });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).render("signin", { error: "Not a valid Email" });
    }
    const gen_hashedPassword = await bcrypt.hash(password, user.salt);
    if (user.password != gen_hashedPassword) {
      return res
        .status(401)
        .render("signin", { error: "Not a valid Password" });
    }
    const token = createToken(user);
    return res.cookie("token", token).render("home", { user: user });
  } catch (error) {
    return res.status(401).render("signin", { error: "error from server" });
  }
}

async function logoutUserHandler(req, res) {
  return res.clearCookie("token").redirect("/");
}

export { signUpUserHandler, signInUserHandler, logoutUserHandler };
