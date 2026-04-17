import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    api.get(`/orders/${id}`).then((res) => setOrder(res.data));
  }, [id]);

  if (!order) return <p>Loading...</p>;

  return (
    <div className="ml-64 mt-20 p-6">
      <h2 className="text-2xl font-bold mb-4">Order Details</h2>

      <p><b>User:</b> {order.user}</p>
      <p><b>Total:</b> ₹{order.total}</p>
      <p><b>Status:</b> {order.status}</p>

      <h3 className="mt-4 font-semibold">Items:</h3>
      {order.items.map((item, i) => (
        <div key={i}>
          {item.name} - {item.quantity}
        </div>
      ))}
    </div>
  );
}