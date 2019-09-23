import bcrypt from "bcryptjs";

/**
 * Hash the users password
 *
 * @param {string} password Password to hash
 *
 * @returns {String} The hashed password
 */
const hashPassword =  (password: string) => {
  const saltRouds = 12;
  return bcrypt.hashSync(password, saltRouds);
};

export default hashPassword;
