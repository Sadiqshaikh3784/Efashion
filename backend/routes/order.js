import express from "express";
import {
  placeOrder,
  getUserOrders,
  getOrderById,
} from "../controllers/orderController.js";

const router = express.Router();

// ✅ PLACE ORDER
router.post("/", placeOrder);

// ✅ GET USER ORDERS
router.get("/user/:userId", getUserOrders);

// ✅ GET SINGLE ORDER
router.get("/:id", getOrderById);

// ✅ GET ALL ORDERS (ADMIN)
router.get("/", async (req, res) => {
  const orders = await (await import("../models/Order.js")).default
    .find()
    .populate("items.productId")
    .sort({ createdAt: -1 });

  res.json(orders);
});

// ✅ UPDATE STATUS
router.put("/:id", async (req, res) => {
  const { status } = req.body;

  const Order = (await import("../models/Order.js")).default;

  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  res.json(order);
});

export default router;