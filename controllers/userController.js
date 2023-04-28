import UserDetails from '../schema/userDetailsSchema.js';
import User from '../schema/userSchema.js';

//  UPDATE USER
export const updateUser = async (req, res, next) => {
  try {
    const updateUserdetail = await UserDetails.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body
      },
      { new: true }
    );

    const { isAdmin, ...otherDetails } = updateUserdetail._doc;
    res.status(200).json(otherDetails);
  } catch (error) {
    return next(error);
  }
};

// GET ALL USER
export const getAllUser = async (req, res, next) => {
  try {
    const getAllUser = await UserDetails.find();
    const getAllUserAccount = await User.find();

    res.status(200).json({
      getAllUser,
      getAllUserAccount
    });
  } catch (error) {
    return next(error);
  }
};

// GET USER BY ID
export const getUser = async (req, res, next) => {
  try {
    const getUser = await UserDetails.findById(req.params.id);

    const { isAdmin, ...otherDetails } = getUser._doc;

    res.status(200).json(otherDetails);
  } catch (error) {
    return next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const deleteUserdetaits = await UserDetails.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json(deleteUserdetaits);
  } catch (error) {
    return next(error);
  }
};
