import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import {
  getUserNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  deleteNotification
} from "../controllers/notificationController.js";

const router = express.Router();

// Notification routes
router.get("/", verifyToken, getUserNotifications);
router.put("/:id/read", verifyToken, markNotificationRead);
router.put("/read-all", verifyToken, markAllNotificationsRead);
router.delete("/:id", verifyToken, deleteNotification);

export default router; 