import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent ✅");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-black to-gray-800 text-white py-16 text-center">
        <h1 className="text-4xl font-bold">Contact Us 📞</h1>
        <p className="mt-3 text-gray-300">
          We’d love to hear from you!
        </p>
      </div>

      {/* MAIN */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10">

        {/* LEFT INFO */}
        <div className="space-y-6">

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
            <h2 className="font-semibold text-lg mb-2">📍 Address</h2>
            <p className="text-gray-600 text-sm">
              Efashion, India
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
            <h2 className="font-semibold text-lg mb-2">📧 Email</h2>
            <p className="text-gray-600 text-sm">
              support@wear-efashion.com
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
            <h2 className="font-semibold text-lg mb-2">📞 Phone</h2>
            <p className="text-gray-600 text-sm">
              +91 98765 43210
            </p>
          </div>

        </div>

        {/* RIGHT FORM */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">

          <h2 className="text-xl font-semibold mb-4">Send Message</h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="5"
              className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            ></textarea>

            <button
              type="submit"
              className="w-full bg-pink-600 text-white py-3 rounded-xl hover:bg-pink-700 transition"
            >
              Send Message
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}