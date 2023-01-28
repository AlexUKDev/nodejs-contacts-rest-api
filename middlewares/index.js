const {
  addContactValidation,
  updateContactValidation,
  updateStatusValidation,
  signupValidation,
  loginValidation,
  updateSubscriptionValidation,
} = require('./validationMiddleware');

const { checkAuth } = require('./checkAuth');
const { upload } = require('./uploadMiddleware');

module.exports = {
  addContactValidation,
  updateContactValidation,
  updateStatusValidation,
  signupValidation,
  loginValidation,
  checkAuth,
  updateSubscriptionValidation,
  upload,
};
