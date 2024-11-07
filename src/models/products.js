import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: String,
    location: String,
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'usersDetails' },
    category: String,
    image: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { collection: 'products' });

export default mongoose.models.Product || mongoose.model('Product', productSchema);
