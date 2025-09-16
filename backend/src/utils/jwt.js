const jwt = require("jsonwebtoken");

function generateToken(payload, secretKey, expiresIn = "1h") {
  return jwt.sign(payload, secretKey, { expiresIn });
}

function verifyToken(token, secretKey) {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    throw error;
  }
}

module.exports = { generateToken, verifyToken };
