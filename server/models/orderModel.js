import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', default: null },
  customer: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true }
  },
  paymentMethod: { type: String, required: true },
  items: [{
    id: { type: String, required: true },
    name: { type: String, required: true },
    size: {
      size: { type: String, required: true },
      value: { type: String, required: true },
      originalPrice: { type: Number, required: true },
      cutoffPrice: { type: Number, required: true }
    },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    subtotal: { type: Number, required: true }
  }],
  pricing: {
    subtotal: { type: Number, required: true },
    shipping: { type: Number, required: true },
    tax: { type: Number, required: true },
    discount: { type: Number, required: true },
    totalSavings: { type: Number, required: true },
    orderTotal: { type: Number, required: true }
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  emailSent: { type: Boolean, default: false },
  orderDate: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

const OrderModel = mongoose.models.order || mongoose.model("order", orderSchema);

export default OrderModel; 