import { useState } from "react";
import { useNavigate, Link } from "react-router";   // ← yeh line important hai
import api from "../api/axios";

export default function Signup() {
  const navigate = useNavigate();   // ← yeh hook add karo

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [msg, setMsg] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const response = await api.post("/auth/signup", form);
      
      setMsg(response.data.message || "Account created successfully!");
      setIsError(false);

      // ✅ Successful signup ke baad Home page pe redirect (2 second baad)
      setTimeout(() => {
        navigate("/", { replace: true });   // Home page pe jaayega
      }, 1500);

    } catch (err) {
      setMsg(err.response?.data?.message || "Something went wrong. Please try again.");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-1 mb-2">
            <span className="text-4xl font-black tracking-tighter">E</span>
            <span className="text-4xl font-black tracking-tighter text-pink-600">Fashion</span>
          </div>
          <p className="text-gray-500">Create your account</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-center mb-8 text-gray-800">
            Sign Up
          </h2>

          {msg && (
            <div className={`mb-6 text-center text-sm font-medium p-3 rounded-2xl ${
              isError 
                ? "bg-red-50 text-red-600" 
                : "bg-green-50 text-green-600"
            }`}>
              {msg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-pink-500 focus:ring-1"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-pink-500 focus:ring-1"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-pink-500 focus:ring-1"
                placeholder="Create a strong password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black hover:bg-pink-600 text-white font-semibold py-3.5 rounded-2xl transition-all disabled:opacity-70"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-8">
            Already have an account?{" "}
            <Link to="/login" className="text-pink-600 font-semibold hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}