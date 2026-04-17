import { Link } from "react-router";

export default function ProductCard({ product, addToCart }) {
  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-2xl transition group">

      <Link to={`/product/${product._id}`}>
        <div className="h-60 overflow-hidden">
          <img
            src={product.image || "https://via.placeholder.com/300"}
            className="w-full h-full object-contain group-hover:scale-105 transition"
          />
        </div>
      </Link>

      <div className="p-4">
        <h3 className="text-sm font-medium line-clamp-2">
          {product.title}
        </h3>

        <div className="flex justify-between items-center mt-3">
          <p className="font-bold text-lg">₹{product.price}</p>

          <button
            onClick={() => addToCart(product._id)}
            className="bg-black text-white px-4 py-2 rounded-full hover:bg-pink-600"
          >
            Add +
          </button>
        </div>
      </div>
    </div>
  );
}