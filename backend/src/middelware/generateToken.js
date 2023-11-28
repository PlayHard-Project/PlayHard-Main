const jwt = require("jsonwebtoken");

/**
 * Generate a new jwt token
 *
 * @param {*} user source to generate token
 * @returns signed token
 */
const tokenSign = async (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "2h",
    }
  );
};

/**
 * Verify if the param is a valid and real jwt token
 * @param {*} token to validate with jwt secret value
 * @returns true if it was succefully authenticated
 */
const verifyToken = async (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return null;
  }
};

/**
 * Decode a jwt object send in params
 * @param {*} token  to be decoded
 * @returns the decoded token
 */
const decodeSign = (token) => {
  return jwt.decode(token, null);
};

module.exports = { tokenSign, decodeSign, verifyToken };
