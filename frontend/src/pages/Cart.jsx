import { useState, useEffect, } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router";

export default function Cart() {
    const userId = localStorage.getItem("userId");
    const [cart, setCart] = useState(null);
    const navigate = useNavigate();

    const loadCart = async () => {
        try {
            const res = await api.get(`/cart/${userId}`);
            setCart(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (!userId) return;

        let ignore = false; // 🔥 important (React strict mode fix)

        const fetchCart = async () => {
            try {
                const res = await api.get(`/cart/${userId}`);

                if (!ignore) {
                    setCart(res.data); // ✅ safe update
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchCart();

        return () => {
            ignore = true; // 🔥 prevents double render issue
        };
    }, [userId]);

    const removeItem = async (productId) => {
        await api.post(`/cart/remove`, { userId, productId });
        await loadCart();
        window.dispatchEvent(new Event("cartUpdated"));
    };

    const updateQty = async (productId, quantity) => {
        if (quantity === 0) return removeItem(productId);

        await api.post(`/cart/update`, { userId, productId, quantity });
        await loadCart();
        window.dispatchEvent(new Event("cartUpdated"));
    };

    if (!cart || !cart.items) return <div className="p-6">Loading...</div>;

    const total = cart.items.reduce((sum, item) => {
        if (!item.productId) return sum;
        return sum + item.productId.price * item.quantity;
    }, 0);
    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">My Cart</h1>

            {cart.items.length === 0 ? (
                <p>Cart is empty</p>
            ) : (
                <div className="space-y-4">
                    {cart.items
                        .filter(item => item.productId) // 💥 remove null products
                        .map(item => (
                            <div key={item.productId._id} className="flex gap-4 border p-4 rounded-xl items-center">

                                <img
                                    src={item.productId?.image}
                                    className="w-20 h-24 object-cover rounded"
                                />

                                <div className="flex-1">
                                    <h2 className="font-semibold">{item.productId.title}</h2>
                                    <p>₹{item.productId.price}</p>

                                    <div className="mt-2 flex gap-3 items-center">
                                        <button onClick={() => updateQty(item.productId._id, item.quantity - 1)} className="px-2 border">-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateQty(item.productId._id, item.quantity + 1)} className="px-2 border">+</button>
                                    </div>
                                </div>

                                <button
                                    onClick={() => removeItem(item.productId._id)}
                                    className="text-red-500"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}

                    <h2 className="text-xl font-bold">Total: ₹{total}</h2>

                    <button
                        onClick={() => navigate("/checkout")}
                        className="w-full bg-pink-600 text-white p-3 rounded-xl"
                    >
                        Proceed to Checkout
                    </button>
                </div>
            )}
        </div>
    );
}