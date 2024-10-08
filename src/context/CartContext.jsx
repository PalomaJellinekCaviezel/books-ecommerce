import React, { useEffect, createContext, useReducer } from "react";
import { database, auth } from "../firebaseConfig"; // Asegúrate de importar Firebase Auth
import { ref, get, push, set, onValue } from "firebase/database";

const CartContext = createContext();

const initialState = {
  cart: [],
  user: null, // Guardará la información del usuario logueado
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      if (state.cart.some((item) => item.id === action.payload.id)) {
        return state; // No agrega el producto si ya existe en el carrito
      }
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };
    case "LOGIN_USER":
      return {
        ...state,
        user: {
          ...action.payload,
          purchasedItems: action.payload.purchasedItems || [], // Asegúrate de inicializarlo como un array
        },
      };
    case "LOGOUT_USER":
      return {
        ...state,
        user: null,
        cart: [], // Vaciar carrito al cerrar sesión
      };
    case "COMPLETE_PURCHASE":
      return {
        ...state,
        user: {
          ...state.user,
          purchasedItems: [...state.user.purchasedItems, ...state.cart],
        },
        cart: [], // Vaciar carrito después de la compra
      };
    case "SET_CART":
      return {
        ...state,
        cart: action.payload || [], // Establece el carrito desde Firebase
      };
    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // El usuario está autenticado, recupera sus datos
        const userRef = ref(database, `users/${user.uid}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const userData = snapshot.val();
          dispatch({
            type: "LOGIN_USER",
            payload: {
              uid: user.uid,
              email: userData.email,
              purchasedItems: userData.purchasedItems || [],
            },
          });
          // Recupera el carrito del usuario
          const cartRef = ref(database, `carts/${user.uid}`);
          onValue(cartRef, (snapshot) => {
            if (snapshot.exists()) {
              const cartData = snapshot.val();
              dispatch({
                type: "SET_CART",
                payload: cartData || [],
              });
            }
          });
        }
      } else {
        dispatch({ type: "LOGOUT_USER" });
      }
    });

    return () => unsubscribe();
  }, []);

  // Función para actualizar el carrito en Firebase
  const updateCartInFirebase = async (cart) => {
    if (state.user) {
      const cartRef = ref(database, `carts/${state.user.uid}`);
      await set(cartRef, cart); // Guarda el carrito en Firebase
    }
  };

  // Asegúrate de llamar a updateCartInFirebase cada vez que se actualice el carrito
  useEffect(() => {
    updateCartInFirebase(state.cart);
  }, [state.cart]);

  const handleCheckout = async (orderDetails) => {
    if (!state.user || !state.user.uid) {
      throw new Error("No hay usuario autenticado.");
    }

    const ordersRef = ref(database, `orders/${state.user.uid}`);
    const newOrderRef = push(ordersRef);
    await set(newOrderRef, orderDetails); // Guarda los detalles de la orden
  };

  return (
    <CartContext.Provider value={{ state, dispatch, handleCheckout }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
