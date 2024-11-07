import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    role: { type: String, enum: ['normal', 'premium', 'admin'], default: 'normal' },
    postCount: { type: Number, default: 0 },
    premiumMembership: {
        type: { type: String, enum: ['none', 'weekly', 'monthly', 'yearly'], default: 'none' },
        startDate: Date,
        endDate: Date
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { collection: 'usersDetails' })

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;