import UserDetails from '../schema/userDetailsSchema.js';
import User from '../schema/userSchema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      isAdmin: req.body.isAdmin
    });

    const userDetails = new UserDetails({
      userId: newUser._id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address
    });
    const savedUser = await newUser.save();
    const savedUserDetails = await userDetails.save();

    res.status(200).json({
      user: savedUser,
      userDetails: savedUserDetails
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    // Auth Handler
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin
      },
      process.env.JWT_SECRET
    );

    res
      .cookie('access_token', token, {
        httpOnly: true
      })
      .status(200)
      .json(user);
  } catch (error) {
    next(error);
  }
};
