import mongoose from 'mongoose';

const userDetailsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    firstName: {
      type: String,
      min: 3,
      max: 20
    },
    lastName: {
      type: String,
      min: 3,
      max: 20
    },
    address: {
      type: String,
      min: 3,
      max: 50
    }
  },
  { timestamps: true }
);

const UserDetails = mongoose.model('UserDetails', userDetailsSchema);

export default UserDetails;
