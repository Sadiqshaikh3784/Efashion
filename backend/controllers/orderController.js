import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import product from '../models/product.js';

// ✅ PLACE ORDER
export const placeOrder = async (req, res) => {
    try {
       const { userId, address, paymentMethod } = req.body;

        const cart = await Cart.findOne({ userId }).populate('items.productId');
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        const orderItems = cart.items.map(item => ({
            productId: item.productId._id,
            quantity: item.quantity,
            price: item.productId.price,
        }));

        const totalAmount = orderItems.reduce(
            (total, item) => total + (item.price * item.quantity),
            0
        );

        for (let item of cart.items) {
            await product.findByIdAndUpdate(
                item.productId._id,
                { $inc: { stock: -item.quantity } }
            );
        }

        const order = await Order.create({
            userId,
            items: orderItems,
            address,
            totalAmount,
           paymentMethod,
        });

        await Cart.findOneAndUpdate({ userId }, { items: [] });

        res.status(201).json({
            message: "Order placed successfully",
            orderId: order._id
        });

    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

// ✅ GET ALL ORDERS
export const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.params;

        const orders = await Order.find({ userId })
            .populate("items.productId")
            .sort({ createdAt: -1 });

        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders" });
    }
};

// ✅ GET SINGLE ORDER
export const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;

        const order = await Order.findById(id)
            .populate("items.productId");

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json(order);
    } catch (error) {
        res.status(500).json({ message: "Error fetching order" });
    }
};