import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const blogSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    coverImageUrl: { type: String },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);
const blogModel = mongoose.model("blogs", blogSchema);
export { blogModel };
