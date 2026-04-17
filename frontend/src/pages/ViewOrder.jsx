import { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../api/axios";

export default function ViewOrder() {
    const { id } = useParams();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        const fetchOrder = async () => {
            try {
                const res = await api.get(`/orders/${id}`);
                setOrder(res.data);
            } catch (err) {
                console.error(err);
                setOrder(null);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [id]);

    if (loading) return <div className="p-6 text-center">Loading...</div>;
    if (!order) return <div className="p-6 text-center">Order not found</div>;

    return (
        <div className="max-w-4xl mx-auto p-6">

            <h1 className="text-2xl font-bold mb-6">Order Details</h1>

            {/* 🔥 SINGLE PREMIUM CARD */}
            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 space-y-6">

                {/* TOP INFO */}
                <div className="flex justify-between flex-wrap gap-4 border-b pb-4">
                    <div>
                        <p className="text-gray-500 text-sm">Order ID</p>
                        <p className="font-mono text-sm">{order._id}</p>
                    </div>

                    <div>
                        <p className="text-gray-500 text-sm">Status</p>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                            {order.status}
                        </span>
                    </div>

                    <div>
                        <p className="text-gray-500 text-sm">Payment</p>
                        <p className="font-medium">{order.paymentMethod}</p>
                    </div>

                    <div>
                        <p className="text-gray-500 text-sm">Total</p>
                        <p className="font-bold text-pink-600">
                            ₹{order.totalAmount}
                        </p>
                    </div>
                </div>

                {/* ADDRESS */}
                {order.address && (
                    <div className="border-b pb-4">
                        <h2 className="font-semibold mb-2">Delivery Address</h2>

                        <p className="font-medium">{order.address.fullName}</p>
                        <p className="text-sm text-gray-600">
                            {order.address.addressLine}
                        </p>
                        <p className="text-sm text-gray-600">
                            {order.address.city}, {order.address.state}
                        </p>
                        <p className="text-sm text-gray-600">
                            {order.address.pincode}
                        </p>
                        <p className="text-sm mt-1">
                            📞 {order.address.phone}
                        </p>
                    </div>
                )}

                {/* ITEMS */}
                <div className="space-y-4">
                    {order.items.map((item, index) => (
                        <div
                            key={index}
                            className="flex gap-4 items-center border rounded-xl p-4 hover:shadow-md transition"
                        >
                            {/* IMAGE */}
                            <img
                                src={item.productId?.image || "/placeholder.png"}
                                alt="product"
                                className="w-20 h-24 object-cover rounded-lg border"
                            />

                            {/* DETAILS */}
                            <div className="flex-1">
                                <p className="font-semibold text-gray-800">
                                    {item.productId?.title || "Product"}
                                </p>

                                <p className="text-sm text-gray-500">
                                    Qty: {item.quantity}
                                </p>

                                <p className="text-pink-600 font-bold mt-1">
                                    ₹{item.price * item.quantity}
                                </p>
                            </div>

                            {/* RIGHT PRICE */}
                            <div className="font-bold text-lg">
                                ₹{item.price * item.quantity}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}