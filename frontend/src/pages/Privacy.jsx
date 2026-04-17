export default function Privacy() {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-black to-gray-800 text-white py-16 text-center">
        <h1 className="text-4xl font-bold">Privacy Policy 🔒</h1>
        <p className="mt-3 text-gray-300">
          Your privacy matters to us
        </p>
      </div>

      {/* CONTENT */}
      <div className="max-w-5xl mx-auto px-6 py-12 space-y-10">

        {/* INTRO */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-3">Introduction</h2>
          <p className="text-gray-600 text-sm leading-6">
            We value your trust. This Privacy Policy explains how we collect,
            use, and protect your personal information when you use our platform.
          </p>
        </div>

        {/* INFO COLLECTION */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-3">Information We Collect</h2>
          <ul className="list-disc ml-5 text-gray-600 text-sm space-y-2">
            <li>Name, email address, phone number</li>
            <li>Shipping and billing address</li>
            <li>Payment details (secured)</li>
            <li>Browsing behavior and preferences</li>
          </ul>
        </div>

        {/* USAGE */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-3">How We Use Your Information</h2>
          <ul className="list-disc ml-5 text-gray-600 text-sm space-y-2">
            <li>To process your orders</li>
            <li>To improve user experience</li>
            <li>To send offers and updates</li>
            <li>To provide customer support</li>
          </ul>
        </div>

        {/* SECURITY */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-3">Data Security</h2>
          <p className="text-gray-600 text-sm leading-6">
            We use advanced security measures to protect your data from
            unauthorized access, misuse, or disclosure.
          </p>
        </div>

        {/* COOKIES */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-3">Cookies</h2>
          <p className="text-gray-600 text-sm leading-6">
            We use cookies to enhance your browsing experience and personalize
            content and ads.
          </p>
        </div>

        {/* USER RIGHTS */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-3">Your Rights</h2>
          <ul className="list-disc ml-5 text-gray-600 text-sm space-y-2">
            <li>Access your data</li>
            <li>Request correction or deletion</li>
            <li>Opt-out of marketing emails</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
          <p className="text-gray-600 text-sm">
            If you have any questions, contact us at:
          </p>
          <p className="text-pink-600 font-medium mt-2">
            support@wear-efashion.com
          </p>
        </div>

      </div>

    </div>
  );
}