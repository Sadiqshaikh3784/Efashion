import { Link, useLocation } from "react-router";

export default function Sidebar() {
  const { pathname } = useLocation();

  const menu = [
    { name: "Dashboard", path: "/admin" },
    { name: "Products", path: "/admin/products" },
    { name: "Orders", path: "/admin/orders" },
  ];

  return (
    <div className="w-64 h-screen bg-white shadow-md fixed left-0 top-0 p-5">
      <h1 className="text-2xl font-bold text-pink-500 mb-10">Admin Panel</h1>
      

      <ul className="space-y-4">
        {menu.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`block p-2 rounded-lg ${
                pathname === item.path
                  ? "bg-pink-500 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}