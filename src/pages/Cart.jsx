import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import Book from "../components/Book";
import PurchaseConfirmationModal from "../components/PurchaseConfirmationModal";
import { ref, push } from "firebase/database";
import { database } from "../firebaseConfig";

const Cart = () => {
  const { state, dispatch } = useContext(CartContext);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false); // Controlar el modal

  const handlePurchase = () => {
    if (!state.user) {
      navigate("/authpage"); // Redirige a la página de login si no está logueado
    } else {
      // Crear el objeto de la orden
      const order = {
        items: state.cart,
        total: state.cart.reduce((sum, item) => sum + item.price, 0),
        date: new Date().toISOString(),
        userId: state.user.uid,
      };

      // Guardar la orden en Firebase
      const ordersRef = ref(database, `orders/${state.user.uid}`);
      push(ordersRef, order)
        .then(() => {
          dispatch({ type: "COMPLETE_PURCHASE", payload: order });
          setShowModal(true); // Mostrar el modal después de guardar la orden
        })
        .catch(() => {
          alert("Hubo un problema al procesar tu compra.");
        });
    }
  };

  const total = state.cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cart">
      <h2>My Cart</h2>
      <div className="total-btn">
        {state.cart.length > 0 && (
          <>
            <h3>Total: ${total.toFixed(2)}</h3>
            <button onClick={handlePurchase}>Buy</button>
          </>
        )}
      </div>
      {state.cart.length === 0 ? (
        <p>You have no books in your cart.</p>
      ) : (
        <div className="book-list">
          {state.cart.map((item) => (
            <Book key={item.id} book={item} className="book-card" />
          ))}
        </div>
      )}

      {/* Modal de confirmación de compra */}
      <PurchaseConfirmationModal
        show={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default Cart;
