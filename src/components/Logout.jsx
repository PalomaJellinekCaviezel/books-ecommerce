import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig"; // Asegúrate de que este archivo exporte correctamente `auth`
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Si usas un contexto de autenticación

const Logout = () => {
  const { user } = useAuth(); // Aquí obtienes al usuario autenticado
  const { dispatch } = useContext(CartContext);
  const navigate = useNavigate(); // Para redirigir después de cerrar sesión

  const handleLogout = async () => {
    await signOut(auth); // Cierra la sesión del usuario

    // Remueve al usuario del contexto
    dispatch({
      type: "SET_USER",
      payload: null, // Elimina al usuario del estado
    });

    // Redirige al usuario a la página de login
    navigate("/");
  };

  return user ? <button onClick={handleLogout}>Logout</button> : null;
};

export default Logout;
