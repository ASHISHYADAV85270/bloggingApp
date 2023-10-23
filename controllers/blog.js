import { blogModel } from "../models/blog.js";

async function createAnewBlogHandler(req, res, next) {
  console.log(req.body);
  const { title, body } = req.body;

  const blog = await blogModel.create({
    title,
    body,
    createdBy: req.user._id,
    coverImageUrl: `uploads/${req.file.filename}`,
  });
  return res.redirect("/");
}
export { createAnewBlogHandler };
