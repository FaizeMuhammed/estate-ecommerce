import mongoose from 'mongoose';

const { Schema } = mongoose;

const MembershipCardSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  features: {
    type: [String],
    required: true,
  }
}, { collection: 'membership' }, { timestamps: true });

export default mongoose.models.MembershipCard || mongoose.model('MembershipCard', MembershipCardSchema);

