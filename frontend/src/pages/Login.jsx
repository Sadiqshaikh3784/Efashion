import { useState } from "react";
import { useNavigate, Link } from "react-router";
import api from "../api/axios";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMsg("");

      const res = await api.post("/auth/login", form);

      console.log("LOGIN DATA:", res.data); // 🔥 DEBUG
      console.log("FULL LOGIN RESPONSE:", res.data);

      const userId = res.data?.user?._id;

      if (!userId) {
        setMsg("❌ User ID missing (Backend issue)");
        return;
      }

      // ✅ SAVE DATA
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", userId);

      setMsg("✅ Login Successful");

      // ✅ Update navbar cart
      window.dispatchEvent(new Event("cartUpdated"));

      setTimeout(() => {
        navigate("/");
      }, 800);

    } catch (err) {
      console.error(err.response?.data);
      setMsg(err.response?.data?.message || "❌ Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-pink-500 to-purple-600 text-white items-center justify-center p-10">
        <div>
          <h1 className="text-5xl font-extrabold mb-4">E-Fashion</h1>
          <p className="text-lg opacity-90">
            Discover premium fashion trends ✨
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-50 px-4">

        <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md border">

          <h2 className="text-2xl font-bold mb-6 text-center">
            Welcome Back 👋
          </h2>

          {/* MESSAGE */}
          {msg && (
            <div
              className={`mb-4 text-center text-sm font-medium ${
                msg.includes("Successful")
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {msg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* EMAIL */}
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full mt-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm text-gray-600">Password</label>
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full mt-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* EXTRA */}
          <div className="mt-6 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-pink-600 font-semibold">
              Signup
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}