import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function OrderSuccess() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [order, setOrder] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await api.get(`/orders/${id}`);
                setOrder(res.data);
            } catch (err) {
                console.error("Error fetching order:", err);
            }
        };

        fetchOrder();
    }, [id]);

    if (!order) return <div className="p-6 text-center">Loading...</div>;

    return (
        <div className="max-w-3xl mx-auto p-6 text-center">

            {/* HEADER */}
            <h1 className="text-3xl text-green-600 font-bold">
                🎉 Order Confirmed
            </h1>

            <p className="mt-2 text-gray-600">
                Order ID: <span className="font-semibold">{id}</span>
            </p>

            {/* PAYMENT */}
            <p className="mt-1 text-sm text-gray-500">
                Payment Method: {order?.paymentMethod}
            </p>

            {/* ITEMS */}
            <div className="mt-6 space-y-4">
                {order?.items?.map((item, index) => (
                    <div
                        key={index}
                        className="flex gap-4 border p-4 rounded-xl items-center shadow-sm hover:shadow-md transition bg-white"
                    >
                        {/* IMAGE */}
                        <img
                            src={item.productId?.image || "/placeholder.png"}
                            alt="product"
                            className="w-20 h-24 object-cover rounded-lg border"
                        />

                        {/* DETAILS */}
                        <div className="text-left flex-1">
                            <p className="font-semibold text-gray-800">
                                {item.productId?.title || "Product"}
                            </p>

                            <p className="text-sm text-gray-500 mt-1">
                                Qty: {item.quantity}
                            </p>

                            <p className="font-bold mt-1 text-pink-600">
                                ₹{item.price * item.quantity}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* TOTAL */}
            <h2 className="mt-6 font-bold text-xl text-gray-800">
                Total: ₹{order.totalAmount}
            </h2>

            {/* BUTTONS */}
            <div className="flex gap-4 justify-center mt-6">
                <button
                    onClick={() => navigate(`/order/${id}`)}
                    className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
                >
                    View Order
                </button>

                <button
                    onClick={() => navigate("/")}
                    className="bg-gray-200 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
                >
                    Continue Shopping
                </button>
            </div>
        </div>
    );
}