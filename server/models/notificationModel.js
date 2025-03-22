import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  type: { 
    type: String, 
    enum: ['order_placed', 'order_shipped', 'order_delivered', 'order_cancelled', 'payment_received', 'other'],
    required: true 
  },
  title: { type: String, required: true },
  message: { type: String, required: true },
  orderId: { type: String, default: null },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  data: { type: mongoose.Schema.Types.Mixed, default: {} }
}, { timestamps: true });

// Index to improve query performance
notificationSchema.index({ userId: 1, isRead: 1, createdAt: -1 });

const NotificationModel = mongoose.models.notification || mongoose.model("notification", notificationSchema);

export default NotificationModel; 