const jwt = require('jsonwebtoken');
const cookie = require('cookie');

const SECRET_KEY = 'your_secret_key'; // Ensure this is the same key used for generating the token

const verifyJWT = (req, res, next) => {
  const cookies = cookie.parse(req.headers.cookie || '');
  const token = cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token.' });
    }
    // Attach user information to request object
    req.user = decoded;
    next();
  });
};

module.exports = verifyJWT;