const bcrypt = require("bcrypt");

/**
 * Bcrypt method to encrypt a password
 * @param {*} textPlain the password original text
 * @returns encrypted password
 */
const encrypt = async (textPlain) => {
  const hash = await bcrypt.hash(textPlain, 10);
  return hash;
};

/**
 * Bcrypt method to compare a encrypted password with a non-one
 * @param {*} passwordPlain original password
 * @param {*} hashPassword encrypted password
 * @returns
 */
const compare = async (passwordPlain, hashPassword) => {
  return await bcrypt.compare(passwordPlain, hashPassword);
};

module.exports = { encrypt, compare };
