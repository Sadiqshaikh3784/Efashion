import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import api from "../api/axios";

export default function ViewAllOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      console.log("❌ User not logged in");
      navigate("/login");
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        console.log("🚀 Fetching orders for user:", userId);

        const res = await api.get(`/orders/user/${userId}`);

        console.log("✅ Orders:", res.data);

        setOrders(res.data);
      } catch (err) {
        console.error("❌ ERROR:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId, navigate]);

  if (loading) return <div className="p-6">Loading...</div>;

  if (orders.length === 0)
    return <div className="p-6">No orders found</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            onClick={() => navigate(`/order/${order._id}`)}
            className="border p-4 rounded cursor-pointer hover:shadow-md flex justify-between"
          >
            <div>
              <p className="font-semibold">
                Order #{order._id.slice(-6)}
              </p>
              <p className="text-sm text-gray-500">
                {new Date(order.createdAt).toDateString()}
              </p>
              <p className="text-sm">
                {order.items.length} items
              </p>
            </div>

            <div className="text-right">
              <p className="font-bold">₹{order.totalAmount}</p>
              <p className="text-green-600 text-sm">
                {order.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}