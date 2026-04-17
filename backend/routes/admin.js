import express from "express";
import Product from "../models/product.js";
import Order from "../models/Order.js";

const router = express.Router();

router.get("/stats", async (req, res) => {
  try {
    // ✅ Total Products
    const totalProducts = await Product.countDocuments();

    // ✅ Total Orders
    const totalOrders = await Order.countDocuments();

    // ✅ Revenue
    const revenueData = await Order.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$totalAmount" },
        },
      },
    ]);

    // ✅ Order Status Count
    const statusData = await Order.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    let statusStats = {
      Pending: 0,
      Placed: 0,
      Dispatched: 0,
      Delivered: 0,
    };

    statusData.forEach((s) => {
      statusStats[s._id] = s.count;
    });

    res.json({
      totalProducts,
      totalOrders,
      revenue: revenueData[0]?.total || 0,
      statusStats,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;