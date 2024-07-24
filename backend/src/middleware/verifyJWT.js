const jwt = require("jsonwebtoken");

const SECRET_KEY = "your_secret_key"; // Ensure this is the same key used for generating the token

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1]; // Assuming the token is in the format "Bearer <token>"

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token." });
    }
    // Attach user information to request object
    req.user = decoded;
    next();
  });
};

module.exports = { verifyJWT };
