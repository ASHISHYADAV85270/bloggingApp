import express from "express";
import { handleCommentOnaParticularBlogId } from "../controllers/comment.js";
const commentRouter = express.Router();
commentRouter.post("/:blogId", handleCommentOnaParticularBlogId);
export { commentRouter };
