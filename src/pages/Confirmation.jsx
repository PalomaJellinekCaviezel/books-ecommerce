import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext"; // Asegúrate de importar tu contexto
import PurchaseConfirmationModal from "../components/PurchaseConfirmationModal"; // Importa el modal que creaste
import Book from "../components/Book";
import "../Styles/Confirmation.css";

const Confirmation = () => {
  const { state, handleCheckout } = useContext(CartContext); // Asegúrate de que handleCheckout esté en el contexto
  const [showModal, setShowModal] = useState(false);

  const total = state.cart.reduce((sum, item) => sum + item.price, 0);

  const handleSimulatePurchase = async () => {
    const orderDetails = {
      items: state.cart,
      total: total,
      date: new Date().toISOString(),
    };

    await handleCheckout(orderDetails); // Guarda la orden en Firebase
    setShowModal(true); // Muestra el modal al simular la compra
  };

  return (
    <div className="confirmation">
      <h2>Purchase Confirmation</h2>
      {state.cart.length === 0 ? (
        <p>No books in your cart.</p>
      ) : (
        <>
          <p>
            <strong>Cart Overview</strong>
          </p>
          <div className="total-btn">
            <h3>Total: ${total.toFixed(2)}</h3>
            <button onClick={handleSimulatePurchase}>Buy</button>
          </div>
          <div className="book-list">
            {state.cart.map((item) => (
              <Book key={item.id} book={item} className="book-card" />
            ))}
          </div>
        </>
      )}

      {/* Modal de confirmación de compra */}
      <PurchaseConfirmationModal
        show={showModal}
        onClose={() => setShowModal(false)} // Cierra el modal cuando se pulsa cerrar
      />
    </div>
  );
};

export default Confirmation;
