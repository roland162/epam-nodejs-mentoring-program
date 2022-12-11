import jwt from "jsonwebtoken";

export const authorizationHandlerMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  if (req.url.includes("login")) {
    next();
  } else if (!authorization) {
    console.log("No authorization header")
    res.status(401).send("Unauthorized");
  } else {
    const token = authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(403).send("Forbidden Error");
      } else {
        req.user = decoded;
        next();
      }
    });
  }
};
