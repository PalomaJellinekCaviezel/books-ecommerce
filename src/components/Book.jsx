import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faTrash } from "@fortawesome/free-solid-svg-icons";
import "../Styles/Book.css";
import { useNavigate } from "react-router-dom";

const Book = ({ book }) => {
  const { state, dispatch } = useContext(CartContext);
  const navigate = useNavigate();

  const handleBookClick = () => {
    navigate(`/book/${book.id}`);
  };
  const addToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: book });
  };

  const removeFromCart = () => {
    dispatch({ type: "REMOVE_FROM_CART", payload: book });
  };

  const isInCart = state.cart.some((item) => item.id === book.id); // Verifica si el libro está en el carrito

  return (
    <div className="book-card" onClick={handleBookClick}>
      <h3>{book.title}</h3>
      <img src={book.imageURL} alt={book.title} className="book-image" />
      <h3>Price: ${book.price}</h3>
      <button
        className="add-to-cart-button"
        onClick={isInCart ? removeFromCart : addToCart} // Cambia la acción según el estado
      >
        {isInCart ? (
          <FontAwesomeIcon icon={faTrash} />
        ) : (
          <FontAwesomeIcon icon={faShoppingCart} />
        )}{" "}
        {/* Cambia el texto del botón */}
      </button>
    </div>
  );
};

export default Book;
