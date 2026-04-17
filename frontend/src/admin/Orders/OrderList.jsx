import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function OrderList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/orders").then(res => setOrders(res.data));
  }, []);

  const updateStatus = async (id, status) => {
    await api.put(`/orders/${id}`, { status });
    alert("Order Updated");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Orders</h2>

      <table className="w-full border">
        <thead>
          <tr>
            <th>User</th>
            <th>Total</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>{order.user}</td>
              <td>₹{order.total}</td>
              <td>{order.status}</td>
              <td>
                <button onClick={() => updateStatus(order._id, "Dispatched")}
                  className="bg-green-500 text-white px-2 py-1 rounded">
                  Dispatch
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}