import Sidebar from "./Components/Sidebar";
import Navbar from "./Components/Navbar";
import { Routes, Route } from "react-router-dom";

import Dashboard from "./Dashboard";
import ProductList from "./Products/ProductList";
import AddProduct from "./Products/AddProduct";
import EditProduct from "./Products/EditProduct";
import OrderList from "./Orders/OrderList";

export default function AdminPanel() {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 ml-64">
        {/* Navbar */}
        <Navbar />

        {/* Pages */}
        <div className="mt-16 p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/add" element={<AddProduct />} />
            <Route path="/products/edit/:id" element={<EditProduct />} />
            <Route path="/orders" element={<OrderList />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}