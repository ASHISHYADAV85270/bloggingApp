import { validateToken } from "../utils/auth.js";

function checkforAuthenticationCookie(req, res, next) {
  const tokenCookie = req?.cookies?.token;
  req.user = null;
  if (!tokenCookie) {
    return next();
  }
  const user = validateToken(tokenCookie);
  req.user = user;
  return next();
}

export { checkforAuthenticationCookie };
