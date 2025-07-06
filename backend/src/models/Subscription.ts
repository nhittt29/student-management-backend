import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ISubscription extends Document {
  schoolId: Types.ObjectId;
  packageId: Types.ObjectId;
  activatedAt: Date;
  expiresAt: Date;
  isActive: boolean;
}

const SubscriptionSchema = new Schema<ISubscription>({
  schoolId: { type: Schema.Types.ObjectId, ref: 'School', required: true },
  packageId: { type: Schema.Types.ObjectId, ref: 'VipPackage', required: true },
  activatedAt: { type: Date, default: Date.now },
  expiresAt: Date,
  isActive: { type: Boolean, default: true }
});

export default mongoose.model<ISubscription>('Subscription', SubscriptionSchema);