import jwt from "jsonwebtoken";
import { secretKey } from "../app.js";
function createToken(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    fullName: user.fullName,
    profileImageUrl: user.profileImageUrl,
    role: user.role,
  };
  const token = jwt.sign(payload, secretKey);
  return token;
}

function validateToken(token) {
  if (!token) {
    return null;
  }
  return jwt.verify(token, secretKey);
}
export { validateToken, createToken };
