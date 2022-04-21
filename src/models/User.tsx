import mongoose from 'mongoose';

const userSchema: any = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    maxlength: [50, 'Name must be less than 50 characters'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required'],
  },
  phone: {
    type: String,
    required: [true, 'Phone is required'],
    unique: true,
  },
  gender: {
    type: String,
    default: 'Male',
  },
  status: {
    type: String,
    default: 'Active',
  },
});

export default mongoose.models.User || mongoose.model('User', userSchema);
