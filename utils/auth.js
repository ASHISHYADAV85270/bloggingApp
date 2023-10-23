import jwt from "jsonwebtoken";
const secretKey =
  "afgsfdbgfa+*+*/sgfsadfadda!$#^@fdfwer523435152435@tsdfjdtsehdjfghgdsefdvfd";

function createToken(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    fullName: user.fullName,
    profileImage: user.profileImage,
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
