import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Productdetails from "./pages/Productdetails";
import Signup from "./pages/Signup";
import AddProduct from "./admin/Products/AddProduct";
import EditProduct from "./admin/Products/EditProduct";
import ProductList from "./admin/Products/ProductList";
import Navbar from "./Components/Navbar";
import { Outlet } from "react-router";
import Cart from "./pages/Cart";
import CheckoutAddress from "./pages/CheckoutAddress";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import ViewAllOrders from "./pages/ViewAllOrders";
import ViewOrder from "./pages/ViewOrder";
import Dashboard from "./admin/Dashboard";
import AdminPanel from "./admin/AdminPanel";
import Footer from "./pages/Footer";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

// ✅ MAIN LAYOUT (Navbar + Footer)
function Layout() {
  return (
    <div className="min-h-screen flex flex-col">

      <Navbar />

      <div className="flex-grow">
        <Outlet />
      </div>

      <Footer />

    </div>
  );
}

// ✅ AUTH LAYOUT (NO Navbar/Footer)
function AuthLayout() {
  return <Outlet />;
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/cart", element: <Cart /> },
      { path: "/checkoutaddress", element: <CheckoutAddress /> },
      { path: "/checkout", element: <Checkout /> },
      { path: "/order-success/:id", element: <OrderSuccess /> },
      { path: "/product/:id", element: <Productdetails /> },
      { path: "/orders", element: <ViewAllOrders /> },
      { path: "/order/:id", element: <ViewOrder /> },

      // ADMIN ROUTES
      { path: "/admin", element: <Dashboard /> },
      { path: "/admin/products", element: <ProductList /> },
      { path: "/admin/products/add", element: <AddProduct /> },
      { path: "/admin/products/edit/:id", element: <EditProduct /> },
      { path: "/admin/*", element: <AdminPanel /> },
      { path: "/contact", element: <Contact /> },
      { path: "/privacy", element: <Privacy /> },
      { path: "/terms", element: <Terms /> }
    ],
  },

  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
    ],
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}