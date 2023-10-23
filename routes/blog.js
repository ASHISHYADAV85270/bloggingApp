import express from "express";
import multer from "multer";
import path from "path";
import { createAnewBlogHandler } from "../controllers/blog.js";

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

blogRouter.get("/add-new", (req, res) => {
  return res.render("addBlog", { user: req.user });
});
blogRouter.post("/", upload.single("coverImageUrl"), createAnewBlogHandler);
export { blogRouter };
