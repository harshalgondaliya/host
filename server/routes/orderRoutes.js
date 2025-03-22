import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { 
  createOrder,
  guestCheckout,
  getUserOrders,
  getOrderDetails
} from "../controllers/orderController.js";

const router = express.Router();

// Order routes
router.post("/create", verifyToken, createOrder);
router.post("/guest-checkout", guestCheckout);
router.get("/user-orders", verifyToken, getUserOrders);
router.get("/:orderId", verifyToken, getOrderDetails);

export default router; 