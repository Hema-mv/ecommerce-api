import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    userId: { type: String, required: true }, // User ID for the cart
    //totalAmount: { type: Number },
            status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            quantity: { type: Number, required: true },
            created: { type: Date, default: Date.now },
            updated: { type: Date, default: Date.now },
            
            
        },
    ],
});
cartSchema.index({ userId: 1 });

// Create an index on the status field for faster filtering
cartSchema.index({ status: 1 });
cartSchema.pre('save', function(next) {
    this.updated = Date.now();
    next();
  });

 const Cart = mongoose.model('Cart', cartSchema);

export default Cart;