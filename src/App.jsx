import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Bookstore from "./pages/Bookstore";
import Header from "./components/Header";
import Cart from "./pages/Cart";
import Login from "./components/Login";
import Register from "./components/Register";
import AuthPage from "./pages/AuthPage";
import Confirmation from "./pages/Confirmation";
import MyOrders from "./pages/MyOrders";
import { AuthProvider } from "./context/AuthContext";
import Footer from "./components/Footer";
function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Header />
          <div className="content">
            <Routes>
              <Route path="/" element={<Bookstore />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/authpage" element={<AuthPage />} />
              <Route path="/confirmation" element={<Confirmation />} />
              <Route path="/my-orders" element={<MyOrders />} />
            </Routes>
          </div>

          <Footer />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
