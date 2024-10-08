import React, { useContext, useState } from "react";
import { auth } from "../firebaseConfig";
import { CartContext } from "../context/CartContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ref, get } from "firebase/database"; // Importar get
import { database } from "../firebaseConfig";

const Login = () => {
  const { dispatch } = useContext(CartContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Recuperar el carrito de Firebase
    const cartRef = ref(database, `carts/${user.uid}`);
    const snapshot = await get(cartRef);
    if (snapshot.exists()) {
      const cartItems = snapshot.val();
      dispatch({ type: "LOAD_CART", payload: cartItems }); // Cargar los elementos en el contexto
    }

    // Almacena el usuario en el contexto
    dispatch({
      type: "LOGIN_USER",
      payload: { uid: user.uid, email: user.email },
    });
    navigate("/confirmation");
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E-mail"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Log in</button>
    </form>
  );
};

export default Login;
