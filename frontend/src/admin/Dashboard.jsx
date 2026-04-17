import { useEffect, useState } from "react";
import api from "../api/axios";
import Card from "./Components/Card";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/admin/stats").then((res) => {
      setData(res.data);
    });
  }, []);

  if (!data) return <p className="ml-64 mt-20">Loading...</p>;

  return (
    <div className="ml-64 mt-20 p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* TOP CARDS */}
      <div className="grid grid-cols-4 gap-6 mb-10">
        <Card title="Products" value={data.totalProducts} color="bg-pink-500" />
        <Card title="Orders" value={data.totalOrders} color="bg-blue-500" />
        <Card title="Revenue" value={`₹${data.revenue}`} color="bg-green-500" />
        <Card title="Pending" value={data.statusStats.Pending} color="bg-yellow-500" />
      </div>

      {/* ORDER STATUS */}
      <div className="grid grid-cols-3 gap-6">
        <Card title="Placed" value={data.statusStats.Placed} color="bg-purple-500" />
        <Card title="Dispatched" value={data.statusStats.Dispatched} color="bg-indigo-500" />
        <Card title="Delivered" value={data.statusStats.Delivered} color="bg-emerald-500" />
      </div>
    </div>
  );
}