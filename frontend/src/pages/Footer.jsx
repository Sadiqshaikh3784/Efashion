import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import api from "../api/axios";

export default function Footer() {
    const [email, setEmail] = useState("");

    const handleSubscribe = async () => {
        try {
            if (!email) {
                alert("Enter email first");
                return;
            }

            await api.post("/newsletter", { email });

            alert("Subscribed ✅");
            setEmail("");
        } catch (err) {
            console.error(err);
            alert("Server error ❌");
        }
    };

    return (
        <footer className="bg-gradient-to-r from-gray-100 via-white to-gray-100 text-gray-700 mt-16 border-t">

            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-5 gap-10">

                {/* SHOP */}
                <div>
                    <h3 className="font-bold mb-4 text-sm">ONLINE SHOPPING</h3>
                    <ul className="space-y-2 text-sm">
                        <Link to="/"><li className="hover:text-pink-500">Home</li></Link>

                        {/* ✅ FIXED LINKS */}
                        <Link to="/?category=men"><li className="hover:text-pink-500">Men</li></Link>
                        <Link to="/?category=women"><li className="hover:text-pink-500">Women</li></Link>
                        <Link to="/?category=kids"><li className="hover:text-pink-500">Kids</li></Link>
                    </ul>
                </div>

                {/* POLICIES */}
                <div>
                    <h3 className="font-bold mb-4 text-sm">CUSTOMER POLICIES</h3>
                    <ul className="space-y-2 text-sm">
                        <Link to="/contact"><li>Contact Us</li></Link>
                        <Link to="/terms"><li>T&C</li></Link>
                        <Link to="/privacy"><li>Privacy Policy</li></Link>
                    </ul>
                </div>

                {/* APP */}
                <div>
                    <h3 className="font-bold mb-4 text-sm">EXPERIENCE OUR APP</h3>
                    <p className="text-sm">Coming soon...</p>
                </div>

                {/* SOCIAL + NEWSLETTER */}
                <div>
                    <h3 className="font-bold mb-4 text-sm">KEEP IN TOUCH</h3>

                    <div className="flex gap-4 text-lg mb-5">
                        <a href="https://facebook.com" target="_blank"><FaFacebookF /></a>
                        <a href="https://twitter.com" target="_blank"><FaTwitter /></a>
                        <a href="https://instagram.com" target="_blank"><FaInstagram /></a>
                        <a href="https://youtube.com" target="_blank"><FaYoutube /></a>
                    </div>

                    <input
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="px-3 py-2 border w-full mb-2"
                    />

                    <button
                        onClick={handleSubscribe}
                        className="bg-pink-500 text-white px-4 py-2 w-full hover:bg-pink-600"
                    >
                        Subscribe
                    </button>
                </div>

                {/* TRUST */}
                <div>
                    <h3 className="font-bold mb-4 text-sm">100% ORIGINAL</h3>
                    <p className="text-sm">All products are original.</p>
                </div>

            </div>

            <div className="border-t text-center py-4 text-sm">
                © {new Date().getFullYear()} Wear-Efashion
            </div>
        </footer>
    );
}