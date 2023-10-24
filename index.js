import express from "express";
import path from "path";
import { userRouter } from "./routes/user.js";
import { blogRouter } from "./routes/blog.js";
import { commentRouter } from "./routes/comment.js";

import { connectMongoDB } from "./connection.js";
import cookieParser from "cookie-parser";
import {
  checkforAuthenticationCookie,
  checkLogin,
} from "./middleware/authentication.js";
import { blogModel } from "./models/blog.js";
const app = express();
const PORT = 8000;
const dblink =
  "mongodb+srv://ashish_practice:qwer1234@mybackend.mhfbkfd.mongodb.net/?retryWrites=true&w=majority";

connectMongoDB(dblink);
app.use(express.static(path.resolve("./public")));
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(cookieParser());
app.use(checkforAuthenticationCookie);
app.use(express.urlencoded({ extended: false }));
app.use("/user", userRouter);
app.use("/blog", blogRouter);
app.use("/comment", commentRouter);

app.get("/", async (req, res) => {
  const sortparameters = { createdAt: -1 };
  const allBlogs = await blogModel.find({}).sort(sortparameters);
  res.render("home", { user: req.user, blogs: allBlogs });
});

app.listen(PORT, () => {
  console.log(`server started at port ${PORT}`);
});
