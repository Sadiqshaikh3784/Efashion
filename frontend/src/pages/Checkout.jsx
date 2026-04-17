import { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router";

export default function Checkout() {
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");

    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [cart, setCart] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState("COD");

    const [newAddress, setNewAddress] = useState({
        fullName: "",
        phone: "",
        addressLine: "",
        city: "",
        state: "",
        pincode: "",
    });



    useEffect(() => {
        if (!userId) return;

        let ignore = false;

        const fetchData = async () => {
            try {
                const cartRes = await api.get(`/cart/${userId}`);
                const addrRes = await api.get(`/address/${userId}`);

                if (!ignore) {
                    setCart(cartRes.data);
                    setAddresses(addrRes.data);
                    setSelectedAddress(addrRes.data[0]);
                }

                // 🔥 IMPORTANT: Navbar cart count reset trigger
                window.dispatchEvent(new Event("cartUpdated"));

            } catch (err) {
                console.error(err);
            }
        };

        fetchData();

        return () => {
            ignore = true;
        };
    }, [userId]);
    const addAddress = async () => {
        const res = await api.post("/address/add", {
            userId,
            ...newAddress,
        });

        setAddresses([...addresses, res.data]);
        setSelectedAddress(res.data);
    };

    const deleteAddress = async (id) => {
        await api.delete(`/address/${id}`);
        setAddresses(addresses.filter(a => a._id !== id));
    };

    const placeOrder = async () => {
        try {
            const res = await api.post("/orders", {
                userId,
                address: selectedAddress,
                paymentMethod,
            });

            // ✅ IMPORTANT: Navbar update trigger
            window.dispatchEvent(new Event("cartUpdated"));

            navigate(`/order-success/${res.data.orderId}`);
        } catch (err) {
            console.error(err);
        }
    };

    if (!cart) return <div>Loading...</div>;

    const total = cart.items.reduce(
        (sum, item) => sum + item.productId.price * item.quantity,
        0
    );

    return (
        <div className="max-w-5xl mx-auto p-6">

            <h1 className="text-2xl font-bold mb-4">Checkout</h1>

            {/* ADDRESS */}
            <h2 className="font-semibold mb-3">Select Address</h2>

            <div className="space-y-3">
                {addresses.map(addr => (
                    <div
                        key={addr._id}
                        onClick={() => setSelectedAddress(addr)}
                        className={`p-4 rounded-xl border cursor-pointer ${selectedAddress?._id === addr._id
                            ? "border-pink-600 bg-pink-50"
                            : "border-gray-200"
                            }`}
                    >
                        <div className="flex justify-between">
                            <div>
                                <p className="font-semibold">{addr.fullName}</p>
                                <p className="text-sm">{addr.addressLine}, {addr.city}</p>
                            </div>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteAddress(addr._id);
                                }}
                                className="text-red-500"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* ADD ADDRESS */}
            <div className="border p-4 rounded-xl mt-5">
                <h2 className="font-semibold mb-2">Add New Address</h2>

                <div className="grid grid-cols-2 gap-3">
                    <input placeholder="Name" className="border p-2" onChange={e => setNewAddress({ ...newAddress, fullName: e.target.value })} />
                    <input placeholder="Phone" className="border p-2" onChange={e => setNewAddress({ ...newAddress, phone: e.target.value })} />
                    <input placeholder="Address" className="border p-2 col-span-2" onChange={e => setNewAddress({ ...newAddress, addressLine: e.target.value })} />
                    <input placeholder="City" className="border p-2" onChange={e => setNewAddress({ ...newAddress, city: e.target.value })} />
                    <input placeholder="State" className="border p-2" onChange={e => setNewAddress({ ...newAddress, state: e.target.value })} />
                    <input placeholder="Pincode" className="border p-2 col-span-2" onChange={e => setNewAddress({ ...newAddress, pincode: e.target.value })} />
                </div>

                <button onClick={addAddress} className="bg-pink-600 text-white p-2 mt-3 w-full">
                    Save Address
                </button>
            </div>

            {/* PAYMENT */}
            <h2 className="mt-6 font-semibold">Payment</h2>

            {["COD", "UPI", "CARD"].map(m => (
                <label key={m} className="block">
                    <input type="radio" checked={paymentMethod === m} onChange={() => setPaymentMethod(m)} />
                    {m}
                </label>
            ))}

            {paymentMethod === "UPI" && (
                <div className="mt-6 bg-white p-6 rounded-2xl shadow-lg text-center">

                    <h3 className="font-bold text-lg mb-2">Scan & Pay</h3>
                    <p className="text-sm text-gray-500 mb-4">
                        Use any UPI app to complete payment
                    </p>

                    <img
                        src="/upi-qr.png"
                        alt="UPI QR"
                        className="w-48 mx-auto border rounded-xl p-2"
                    />

                    <p className="mt-4 text-sm text-gray-600">
                        UPI ID: <span className="font-semibold">yourupi@okaxis</span>
                    </p>

                </div>
            )}

            <h2 className="mt-4 text-xl">Total: ₹{total}</h2>

            <button
                onClick={placeOrder}
                className="w-full mt-4 bg-green-600 text-white p-3"
            >
                Place Order
            </button>
        </div>
    );
}