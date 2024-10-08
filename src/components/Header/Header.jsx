import { useNavigate, useLocation, Link } from "react-router-dom"; // Asegúrate de importar Link
import "./Header.css"; // Importa el archivo CSS para el header
import Logout from "../Logout";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth(); // Obtenemos el usuario del contexto
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar el menú de hamburguesa

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Alterna el estado del menú
  };

  const closeMenu = () => {
    setIsOpen(false); // Cierra el menú
  };

  return (
    <header>
      <div className="header-title">
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <h1>Bookstore</h1>
        </Link>
      </div>

      {/* Botón del menú hamburguesa */}
      <button className="menu-toggle" onClick={toggleMenu}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-menu-2"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="18" x2="20" y2="18" />
        </svg>
      </button>

      {/* Menú de navegación */}
      <nav className={`nav-links ${isOpen ? "open" : ""}`}>
        {user && <Logout />}
        <button
          onClick={() => {
            closeMenu();
            navigate("/my-orders");
          }}
        >
          My Orders
        </button>

        {location.pathname === "/cart" ? (
          <button
            onClick={() => {
              closeMenu();
              navigate("/");
            }}
          >
            Go to Bookstore
          </button>
        ) : (
          <button
            onClick={() => {
              closeMenu();
              navigate("/cart");
            }}
          >
            Go to Cart
          </button>
        )}
      </nav>
    </header>
  );
}

export default Header;
