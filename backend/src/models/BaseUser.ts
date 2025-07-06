import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IBaseUser extends Document {
  fullName: string;
  username: string;
  email: string;
  password: string;
  roleId: Types.ObjectId;
  gender?: 'Male' | 'Female' | 'Other';
  birthday?: Date;
  phone?: string;
  address?: string;
  isVerified?: boolean;
}

const BaseUserSchema = new Schema<IBaseUser>({
  fullName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roleId: { type: Schema.Types.ObjectId, ref: 'Role', required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  birthday: Date,
  phone: String,
  address: String,
  isVerified: { type: Boolean, default: false }
}, {
  discriminatorKey: 'roleKey',
  collection: 'users',
  timestamps: true
});

export const BaseUser = mongoose.model<IBaseUser>('User', BaseUserSchema);