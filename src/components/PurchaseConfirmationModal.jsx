import React from "react";
import { useNavigate } from "react-router-dom";

const PurchaseConfirmationModal = ({ show, onClose }) => {
  const navigate = useNavigate();

  const handleViewPurchases = () => {
    onClose(); // Cierra el modal antes de redirigir
    navigate("/my-orders"); // Redirige a la página de "Mis compras"
  };

  const handleCloseModal = () => {
    onClose(); // Cierra el modal
    navigate("/"); // Redirige a la tienda de libros
  };

  if (!show) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>¡Confirmed order!</h2>
        <p>Your order has been successfully processed.</p>
        <button onClick={handleViewPurchases}>See my order</button>
        <button onClick={handleCloseModal}>Close</button>
      </div>
    </div>
  );
};

export default PurchaseConfirmationModal;
