import OrderModel from "../models/orderModel.js";
import NotificationModel from "../models/notificationModel.js";
import transporter from "../config/nodemailer.js";
import mongoose from "mongoose";

// A more robust email sending function that won't throw errors
const sendEmailSafely = async (mailOptions) => {
  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Email sending failed:", error);
    return { 
      success: false, 
      error: error.message || "Unknown email error" 
    };
  }
};

// Helper function to send order confirmation email
const sendOrderConfirmationEmail = async (order) => {
  try {
    // Format items for email
    const itemsHtml = order.items.map(item => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.name} (${item.size.size})</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.quantity}</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd;">₹${item.price.toFixed(2)}</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd;">₹${item.subtotal.toFixed(2)}</td>
      </tr>
    `).join('');

    // Email template
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
        <div style="text-align: center; background-color: #1a4731; color: white; padding: 10px; border-radius: 5px 5px 0 0;">
          <h2>Order Confirmation</h2>
        </div>
        
        <div style="padding: 20px;">
          <p>Dear ${order.customer.firstName} ${order.customer.lastName},</p>
          
          <p>Thank you for your order! We are pleased to confirm that your order has been received and is being processed.</p>
          
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <p style="margin: 5px 0;"><strong>Order ID:</strong> ${order.orderId}</p>
            <p style="margin: 5px 0;"><strong>Order Date:</strong> ${new Date(order.orderDate).toLocaleDateString()}</p>
            <p style="margin: 5px 0;"><strong>Payment Method:</strong> ${order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod === 'card' ? 'Credit/Debit Card' : 'UPI'}</p>
          </div>
          
          <h3>Order Summary</h3>
          
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background-color: #f2f2f2;">
                <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd;">Product</th>
                <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd;">Qty</th>
                <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd;">Price</th>
                <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd;">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3" style="padding: 10px; text-align: right; border-top: 1px solid #ddd;"><strong>Subtotal:</strong></td>
                <td style="padding: 10px; border-top: 1px solid #ddd;">₹${order.pricing.subtotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td colspan="3" style="padding: 10px; text-align: right;"><strong>Shipping:</strong></td>
                <td style="padding: 10px;">${order.pricing.shipping === 0 ? 'Free' : `₹${order.pricing.shipping.toFixed(2)}`}</td>
              </tr>
              <tr>
                <td colspan="3" style="padding: 10px; text-align: right;"><strong>Tax:</strong></td>
                <td style="padding: 10px;">₹${order.pricing.tax.toFixed(2)}</td>
              </tr>
              ${order.pricing.discount > 0 ? `
              <tr>
                <td colspan="3" style="padding: 10px; text-align: right;"><strong>Discount:</strong></td>
                <td style="padding: 10px; color: #e53e3e;">-₹${order.pricing.discount.toFixed(2)}</td>
              </tr>
              ` : ''}
              <tr>
                <td colspan="3" style="padding: 10px; text-align: right;"><strong>Total:</strong></td>
                <td style="padding: 10px; font-weight: bold;">₹${order.pricing.orderTotal.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
          
          <div style="margin-top: 20px;">
            <h3>Shipping Address</h3>
            <p>
              ${order.customer.firstName} ${order.customer.lastName}<br>
              ${order.customer.address}<br>
              ${order.customer.city}, ${order.customer.state} ${order.customer.postalCode}<br>
              ${order.customer.country}<br>
              Phone: ${order.customer.phone}
            </p>
          </div>
          
          <div style="margin-top: 20px; border-top: 1px solid #ddd; padding-top: 20px;">
            <p>If you have any questions about your order, please contact our customer service at support@toomore.com or call us at +91 1234567890.</p>
            <p>Thank you for shopping with Toomore!</p>
          </div>
        </div>
        
        <div style="text-align: center; padding: 10px; background-color: #f2f2f2; border-radius: 0 0 5px 5px;">
          <p style="margin: 5px 0;">© ${new Date().getFullYear()} Toomore. All rights reserved.</p>
        </div>
      </div>
    `;

    // Send email using the safe method
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: order.customer.email,
      subject: `Toomore - Order Confirmation #${order.orderId}`,
      html: emailHtml
    };

    const emailResult = await sendEmailSafely(mailOptions);
    
    if (emailResult.success) {
      // Update order to mark email as sent
      try {
        await OrderModel.findByIdAndUpdate(order._id, { emailSent: true });
      } catch (dbError) {
        console.error("Failed to update order emailSent status:", dbError);
        // Continue anyway, this is not critical
      }
    }
    
    return emailResult;
  } catch (error) {
    console.error("Error preparing order confirmation email:", error);
    return { success: false, error: error.message || "Failed to prepare email" };
  }
};

// Controller to create order for logged-in user
export const createOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  let transactionInProgress = true;

  try {
    const userId = req.userId;
    if (!userId) {
      if (transactionInProgress) {
        await session.abortTransaction();
        transactionInProgress = false;
      }
      session.endSession();
      return res.status(401).json({
        success: false,
        message: "User authentication required"
      });
    }

    // Validate required order data is present
    const { orderId, customer, items, pricing } = req.body;
    if (!orderId || !customer || !items || !items.length || !pricing) {
      if (transactionInProgress) {
        await session.abortTransaction();
        transactionInProgress = false;
      }
      session.endSession();
      return res.status(400).json({
        success: false,
        message: "Required order information is missing"
      });
    }

    const orderData = { ...req.body, userId };
    
    try {
      // Create new order
      const newOrder = new OrderModel(orderData);
      await newOrder.save({ session });
      
      // Create notification for user
      const notification = new NotificationModel({
        userId,
        type: 'order_placed',
        title: 'Order Placed Successfully',
        message: `Your order #${orderData.orderId} has been placed successfully and is being processed.`,
        orderId: orderData.orderId,
        data: {
          orderId: orderData.orderId,
          orderTotal: orderData.pricing.orderTotal,
          orderDate: orderData.orderDate
        }
      });
      
      await notification.save({ session });
      
      // Commit transaction first
      await session.commitTransaction();
      transactionInProgress = false;
      session.endSession();
      
      // Then attempt to send email
      // If email sending fails, the order is still created
      try {
        await sendOrderConfirmationEmail(newOrder);
      } catch (emailError) {
        console.error("Error sending order confirmation email, but order was created:", emailError);
        // Order is still created successfully, we just couldn't send the email
        return res.status(201).json({
          success: true,
          message: "Order created successfully but email notification failed",
          orderId: newOrder.orderId
        });
      }
      
      return res.status(201).json({
        success: true,
        message: "Order created successfully",
        orderId: newOrder.orderId
      });
    } catch (dbError) {
      if (transactionInProgress) {
        await session.abortTransaction();
        transactionInProgress = false;
      }
      throw dbError; // Re-throw for the outer catch block
    }
  } catch (error) {
    try {
      if (transactionInProgress) {
        await session.abortTransaction();
        transactionInProgress = false;
      }
    } catch (sessionError) {
      console.error("Error aborting transaction:", sessionError);
    }
    
    console.error("Error creating order:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message
    });
  } finally {
    try {
      if (session) {
        session.endSession();
      }
    } catch (sessionError) {
      console.error("Error ending session:", sessionError);
    }
  }
};

// Controller for guest checkout
export const guestCheckout = async (req, res) => {
  try {
    // Validate required order data is present
    const { orderId, customer, items, pricing } = req.body;
    if (!orderId || !customer || !items || !items.length || !pricing) {
      return res.status(400).json({
        success: false,
        message: "Required order information is missing"
      });
    }
    
    const orderData = req.body;
    
    // Create new order without userId
    const newOrder = new OrderModel(orderData);
    await newOrder.save();
    
    // Then attempt to send email
    // If email sending fails, the order is still created
    try {
      await sendOrderConfirmationEmail(newOrder);
    } catch (emailError) {
      console.error("Error sending order confirmation email for guest order, but order was created:", emailError);
      return res.status(201).json({
        success: true,
        message: "Order created successfully but email notification failed",
        orderId: newOrder.orderId
      });
    }
    
    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      orderId: newOrder.orderId
    });
  } catch (error) {
    console.error("Error creating guest order:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message
    });
  }
};

// Get orders for logged-in user
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.userId;
    
    const orders = await OrderModel.find({ userId })
      .sort({ createdAt: -1 })
      .lean();
    
    res.status(200).json({
      success: true,
      orders
    });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message
    });
  }
};

// Get order details by order ID
export const getOrderDetails = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.userId;
    
    console.log('Getting order details:', { orderId, userId });
    
    const order = await OrderModel.findOne({ 
      orderId,
      $or: [
        { userId },
        { 'customer.email': req.userEmail } // Allow users to access their guest orders by email
      ]
    }).lean();
    
    console.log('Order found:', order ? 'Yes' : 'No');
    
    if (!order) {
      // Try more lenient search if exact match fails
      console.log('Order not found with exact match, trying more lenient search');
      
      // Try finding the order using regex for case insensitivity
      const alternativeOrder = await OrderModel.findOne({
        orderId: { $regex: new RegExp('^' + orderId + '$', 'i') }
      }).lean();
      
      if (alternativeOrder) {
        console.log('Order found with alternative search');
        return res.status(200).json({
          success: true,
          order: alternativeOrder
        });
      }
      
      return res.status(404).json({
        success: false,
        message: "Order not found or access denied"
      });
    }
    
    res.status(200).json({
      success: true,
      order
    });
  } catch (error) {
    console.error("Error fetching order details:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch order details",
      error: error.message
    });
  }
}; 