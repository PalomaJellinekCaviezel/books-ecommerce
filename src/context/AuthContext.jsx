import React, { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext({ user: null }); // default value

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        setUser(user ? user : null);
        setIsLoading(false); // Auth state resolved
      },
      () => {
        setIsLoading(false);
      }
    );

    return () => unsubscribe(); // Clean up listener on unmount
  }, [auth]);

  if (isLoading) {
    return <div>Loading...</div>; // Or some custom loading spinner/component
  }

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
