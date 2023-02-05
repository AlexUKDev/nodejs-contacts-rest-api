const express = require('express');
const router = express.Router();

const {
  signupValidation,
  loginValidation,
  checkAuth,
  updateSubscriptionValidation,
  upload,
} = require('../../middlewares/index');

const {
  userRegistration,
  userLogin,
  currentUser,
  userLogout,
  updateSubscription,
  updateUserAvatar,
  verifyUserEmail,
} = require('../../controllers/usersController');

router.post('/signup', signupValidation, userRegistration);
router.post('/login', loginValidation, userLogin);

router.get('/current', checkAuth, currentUser);
router.get('/logout', checkAuth, userLogout);
//  verify email route
router.get('/verify/:verificationToken', verifyUserEmail);

router.patch('/', checkAuth, updateSubscriptionValidation, updateSubscription);

// update user avatar route
router.patch('/avatars', checkAuth, upload.single('avatar'), updateUserAvatar);

module.exports = router;
