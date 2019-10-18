/**
 * Checks if the user has verified his email
 *
 * @param {Object} user User entity
 *
 * @returns {Boolean} User has verified email or not
 */
const hasVerifiedEmail = (user: { email: { verified: boolean } }) => {
  const { email } = user;
  return email && email.verified;
};

export default hasVerifiedEmail;
