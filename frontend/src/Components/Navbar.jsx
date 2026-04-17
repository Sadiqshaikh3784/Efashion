import { Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import api from "../api/axios";

export default function Navbar() {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const loadCart = async () => {
      if (!userId || userId === "null" || userId === "undefined") {
        setCartCount(0);
        return;
      }
      try {
        const res = await api.get(`/cart/${userId}`);
        const total = res.data.items.reduce((sum, item) => sum + item.quantity, 0);
        setCartCount(total);
      } catch (err) {
        console.error(err);
      }
    };

    loadCart();
    window.addEventListener("cartUpdated", loadCart);
    return () => window.removeEventListener("cartUpdated", loadCart);
  }, [userId]);

  const logout = () => {
    localStorage.clear();
    setCartCount(0);
    navigate("/login");
  };

  // Search on Enter key
  const handleSearch = (e) => {
    if (e.key === "Enter" && search.trim()) {
      navigate(`/?search=${search.trim()}`);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md border-b">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1">
          <span className="text-3xl font-black tracking-tighter">E</span>
          <span className="text-3xl font-black tracking-tighter text-pink-600">Fashion</span>
        </Link>

        {/* Clean Search Bar (Center) */}
        <div className="hidden md:flex flex-1 max-w-xl mx-8">
          <div className="w-full bg-gray-100 border border-gray-300 rounded-full px-5 py-3 flex items-center">
            <input
              type="text"
              placeholder="Search for products, brands and more..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={handleSearch}
              className="flex-1 bg-transparent text-sm focus:outline-none"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-6">
          <Link to="/cart" className="relative text-2xl">
            🛒
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>


          {/* 🔥 NEW: MY ORDERS BUTTON */}
          {userId && (
            <button
              onClick={() => navigate("/orders")}
              className="text-sm font-medium hover:text-pink-600"
            >
              My Orders
            </button>
          )}

          {!userId ? (
            <div className="flex gap-4 text-sm font-medium">
              <Link to="/login" className="hover:text-pink-600">Login</Link>
              <Link to="/signup" className="hover:text-pink-600">Signup</Link>
            </div>
          ) : (
            <button onClick={logout} className="text-sm font-medium hover:text-pink-600">
              Logout
            </button>
          )}

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-2xl"
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>



      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t p-4">
          <div className="flex flex-col gap-4 text-lg">
            <Link to="/">Home</Link>
            <Link to="/">Men</Link>
            <Link to="/">Women</Link>
            <Link to="/">Kids</Link>
          </div>
        </div>
      )}
    </nav>
  );
}