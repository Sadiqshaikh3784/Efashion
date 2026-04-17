import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import api from "../api/axios";

import HeroSlider from "./components/HeroSlider";
import CategorySection from "./components/CategorySection";
import ProductCard from "./components/ProductCard";
import Pagination from "./components/Pagination";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get(`/products?search=${search}&category=${category}`);
      setProducts(res.data);
    };

    fetchData();
  }, [search, category]);

 const addToCart = async (productId) => {
  const userId = localStorage.getItem("userId");

  console.log("USER ID:", userId); // 👈 DEBUG

  if (!userId) {
    alert("Please login first ❌");
    return;
  }

  try {
    await api.post("/cart/add", { userId, productId });

    window.dispatchEvent(new Event("cartUpdated"));
  } catch (err) {
    console.error("Add to cart error:", err.response?.data);
  }
};

  const start = (page - 1) * 10;
  const paginated = products.slice(start, start + 10);

  return (
    <div className="bg-gray-50">

      <HeroSlider />

      <CategorySection />

      <div className="max-w-7xl mx-auto px-4 pb-12">
        <h2 className="text-2xl font-bold mb-6">Trending Products</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {paginated.map((p) => (
            <ProductCard key={p._id} product={p} addToCart={addToCart} />
          ))}
        </div>

        <Pagination total={products.length} page={page} setPage={setPage} />
      </div>

    </div>
  );
}