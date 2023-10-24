import express from "express";
import multer from "multer";
import path from "path";
import { createAnewBlogHandler, getBlogById } from "../controllers/blog.js";
import { blogModel } from "../models/blog.js";
import { checkLogin } from "../middleware/authentication.js";

const blogRouter = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads/`)); // callback function (error, destination)
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}_${file.originalname}`;
    cb(null, fileName); // callback function (error, filename)
  },
});
const upload = multer({ storage: storage });

blogRouter.get("/add-new", checkLogin, (req, res) => {
  return res.render("addBlog", { user: req.user });
});
blogRouter.get("/:id", getBlogById);
blogRouter.post("/", upload.single("coverImageUrl"), createAnewBlogHandler);
export { blogRouter };
