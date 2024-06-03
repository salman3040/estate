import User from '../models/user.model.js';
import errorHandler from '../utils/error.js';
import Listing from '../models/list.model.js';
import bcryptjs from 'bcryptjs';

export const updateUser = async (req, res, next) => {
  const id = req.params.id;
  if (req.user.id !== id) {
    return next(errorHandler(401, 'You can update your own account'));
  }
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updateUser = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );
    const { password, ...data } = updateUser._doc;
    res.status(200).json({ data, message: 'User updated successfully' });
  } catch (error) {
    next(error);
  }
};

export const getUserListings = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    try {
      const listing = await Listing.find({ userRef: req.params.id });
      res.status(200).json(listing);
    } catch (error) {
      next(error);
    }
  } else {
    next(errorHandler(401, 'You can only view your own listings'));
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(errorHandler(404, 'User not found'));
    const { password: pas, ...data } = user._doc;
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    if (req.user.id !== id) {
      return next(errorHandler(401, 'You can delete your own account'));
    }
    await User.findByIdAndDelete(id);
    res.clearCookie('access_token');
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
};
