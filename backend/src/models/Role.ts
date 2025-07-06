import mongoose, { Schema, Document } from 'mongoose';

export interface IRole extends Document {
  name: 'SuperAdmin' | 'SchoolAdmin' | 'Teacher' | 'Student';
  description?: string;
  permissions?: string[];
}

const RoleSchema = new Schema<IRole>({
  name: { type: String, enum: ['SuperAdmin', 'SchoolAdmin', 'Teacher', 'Student'], unique: true, required: true },
  description: String,
  permissions: [String]
}, { timestamps: true });

export default mongoose.model<IRole>('Role', RoleSchema);