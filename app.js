import express from "express";
import path from "path";
import { config } from "dotenv";
import { userRouter } from "./routes/user.js";
import { blogRouter } from "./routes/blog.js";
import { commentRouter } from "./routes/comment.js";

import { connectMongoDB } from "./connection.js";
import cookieParser from "cookie-parser";
import { checkforAuthenticationCookie } from "./middleware/authentication.js";
import { blogModel } from "./models/blog.js";
config({
  path: "./.env",
});
const app = express();
const PORT = process.env.PORT || 8002;
const dblink = process.env.dblink;
export const secretKey = process.env.secretKey;

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
