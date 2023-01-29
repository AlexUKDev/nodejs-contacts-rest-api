const gravatar = require('gravatar');
const { Unauthorized } = require('http-errors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../models/userModel');
const { imgResize } = require('../helpers/imgResize');

const path = require('path');
const fs = require('fs/promises');

const avatarsDir = path.join(__dirname, '../', 'public/avatars');

const userRegistration = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const candidate = await User.findOne({ email });

    if (candidate) {
      return res.status(409).json({ message: 'Email in use' });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Add generation random avatar for new users
    const avatarURL = gravatar.url(email, { s: '250' });

    const newUser = await User({
      email,
      password: hashedPassword,
      avatarURL,
    });
    await newUser.save();

    return res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL,
      },
    });
  } catch (error) {
    next(error);
  }
};

const userLogin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const dbUser = await User.findOne({ email });

    if (!dbUser)
      res.status(401).json({ message: 'Email or password is wrong' });

    const isPasswordValid = await bcrypt.compare(password, dbUser.password);

    if (!isPasswordValid)
      res.status(401).json({ message: 'Email or password is wrong' });

    const { JWT_SECRET } = process.env;

    dbUser.token = jwt.sign({ id: dbUser._id }, JWT_SECRET, {
      expiresIn: '1h',
    });

    dbUser.save();

    return res.status(200).json({
      token: dbUser.token,
      user: {
        email: dbUser.email,
        subscription: dbUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

const currentUser = async (req, res, next) => {
  try {
    if (!req.user) throw new Unauthorized('Not authorized');
    return res
      .status(200)
      .json({ email: req.user.email, subscription: req.user.subscription });
  } catch (error) {
    next(error);
  }
};

const userLogout = async (req, res, next) => {
  const { id } = req.user;

  try {
    await User.findByIdAndUpdate(id, { token: null });

    return res.status(204).end();
  } catch (error) {
    next(error);
  }
};

const updateSubscription = async (req, res, next) => {
  const { id } = req.user;
  const { subscription } = req.body;

  try {
    const contactDetail = await User.findByIdAndUpdate(
      id,
      {
        $set: { subscription },
      },
      { new: true }
    );
    return res.status(200).json({
      message: `Success. Subscription changed on '${contactDetail.subscription.toUpperCase()}'`,
    });
  } catch (error) {
    next(error);
  }
};

const updateUserAvatar = async (req, res, next) => {
  const { path: tempDir, originalname } = req.file;
  const { _id: id } = req.user;

  const uniqueAvatarName = `${id}_${originalname}`;

  try {
    const resultPath = path.join(avatarsDir, uniqueAvatarName);

    // use resize fn to change image size
    await imgResize(tempDir, 250);
    await fs.rename(tempDir, resultPath);

    const avatarURL = path.join('public', 'avatars', uniqueAvatarName);

    await User.findByIdAndUpdate(id, { avatarURL });

    return res.status(200).json({
      avatarURL,
    });
  } catch (error) {
    await fs.unlink(tempDir);

    next(error);
  }
};

module.exports = {
  userRegistration,
  userLogin,
  currentUser,
  userLogout,
  updateSubscription,
  updateUserAvatar,
};
