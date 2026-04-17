export default function Terms() {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-black to-gray-800 text-white py-16 text-center">
        <h1 className="text-4xl font-bold">Terms & Conditions 📄</h1>
        <p className="mt-3 text-gray-300">
          Please read these terms carefully before using our platform
        </p>
      </div>

      {/* CONTENT */}
      <div className="max-w-5xl mx-auto px-6 py-12 space-y-10">

        {/* INTRO */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
          <h2 className="text-xl font-semibold mb-3">Introduction</h2>
          <p className="text-gray-600 text-sm leading-6">
            By accessing and using our website, you agree to comply with and be bound
            by the following terms and conditions. These terms apply to all users of
            the site.
          </p>
        </div>

        {/* USE OF WEBSITE */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
          <h2 className="text-xl font-semibold mb-3">Use of Website</h2>
          <ul className="list-disc ml-5 text-gray-600 text-sm space-y-2">
            <li>You must be at least 18 years old to use this site.</li>
            <li>Do not misuse the website or attempt to harm its functionality.</li>
            <li>All content is for personal use only.</li>
          </ul>
        </div>

        {/* ACCOUNT */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
          <h2 className="text-xl font-semibold mb-3">User Accounts</h2>
          <p className="text-gray-600 text-sm leading-6">
            You are responsible for maintaining the confidentiality of your account
            and password. Any activity under your account is your responsibility.
          </p>
        </div>

        {/* PRODUCTS */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
          <h2 className="text-xl font-semibold mb-3">Products & Pricing</h2>
          <p className="text-gray-600 text-sm leading-6">
            We strive to ensure accurate product information. However, errors may occur.
            Prices and availability are subject to change without notice.
          </p>
        </div>

        {/* PAYMENTS */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
          <h2 className="text-xl font-semibold mb-3">Payments</h2>
          <p className="text-gray-600 text-sm leading-6">
            All payments must be made through authorized payment methods. We do not
            store your payment details.
          </p>
        </div>

        {/* RETURNS */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
          <h2 className="text-xl font-semibold mb-3">Returns & Refunds</h2>
          <p className="text-gray-600 text-sm leading-6">
            Returns and refunds are subject to our policy. Please check our return
            policy for detailed information.
          </p>
        </div>

        {/* LIABILITY */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
          <h2 className="text-xl font-semibold mb-3">Limitation of Liability</h2>
          <p className="text-gray-600 text-sm leading-6">
            We are not liable for any damages arising from the use or inability to
            use our services.
          </p>
        </div>

        {/* CHANGES */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
          <h2 className="text-xl font-semibold mb-3">Changes to Terms</h2>
          <p className="text-gray-600 text-sm leading-6">
            We reserve the right to update these terms at any time. Continued use of
            the site means you accept the updated terms.
          </p>
        </div>

        {/* CONTACT */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
          <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
          <p className="text-gray-600 text-sm">
            If you have any questions regarding these terms:
          </p>
          <p className="text-pink-600 font-medium mt-2">
            support@wear-efashion.com
          </p>
        </div>

      </div>

    </div>
  );
}