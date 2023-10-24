import { blogModel } from "../models/blog.js";

async function createAnewBlogHandler(req, res, next) {
  const { title, body } = req.body;
  const blog = await blogModel.create({
    title,
    body,
    createdBy: req.user._id,
    coverImageUrl: `/uploads/${req.file.filename}`,
  });
  return res.redirect("/");
}
async function getBlogById(req, res, next) {
  const { id } = req.params;
  const blog = await blogModel.findById(id).populate("createdBy");
  return res.render("blog", { user: req.user, blog });
}
export { createAnewBlogHandler, getBlogById };
