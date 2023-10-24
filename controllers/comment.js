import { commentModel } from "../models/comments.js";
async function handleCommentOnaParticularBlogId(req, res) {
  const { blogId } = req.params;
  const { content } = req.body;
  const createdBy = req.user._id;
  if (!content) {
    return res.render("home", { error: "Please enter a comment" });
  }
  try {
    const comment = await commentModel.create({
      content,
      createdBy,
      blogId,
    });
    return res.redirect(`/blog/${blogId}`);
  } catch (error) {
    return res.render("home", { error: "Error from comment Handler" });
  }
}
export { handleCommentOnaParticularBlogId };
