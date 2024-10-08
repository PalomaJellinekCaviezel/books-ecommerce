// AuthPage.js
import React, { useState } from "react";
import Login from "../components/Login"; // Asegúrate de importar tu componente de Login
import Register from "../components/Register"; // Asegúrate de importar tu componente de Register

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true); // Estado para alternar entre login y registro

  const toggleAuth = () => {
    setIsLogin((prev) => !prev); // Alternar el estado
  };

  return (
    <div className="auth-container">
      <p>Log in or Sign up to start shopping</p>
      {isLogin ? (
        <>
          <Login />
          <p>
            Don't have an account? <a onClick={toggleAuth}>Sign up here</a>
          </p>
        </>
      ) : (
        <>
          <Register />
          <p>
            Already have an account? <a onClick={toggleAuth}>Log in here</a>
          </p>
        </>
      )}
    </div>
  );
};

export default AuthPage;
