import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { ref, onValue, remove } from "firebase/database"; // Asegúrate de importar remove
import { database } from "../firebaseConfig";
import AuthPage from "./AuthPage"; // Asegúrate de que la ruta es correcta
import Order from "../components/Order"; // Importa el componente Order

const MyOrders = () => {
  const { state } = useContext(CartContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!state.user || !state.user.uid) {
      setLoading(false);
      return;
    }

    const ordersRef = ref(database, `orders/${state.user.uid}`);
    const unsubscribe = onValue(
      ordersRef,
      (snapshot) => {
        const data = snapshot.val();
        const ordersArray = data
          ? Object.entries(data).map(([id, order]) => ({ id, ...order }))
          : [];
        setOrders(ordersArray);
        setLoading(false);
      },
      () => {
        setError("Error al recuperar las órdenes.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [state.user]);

  // Función para eliminar todas las órdenes
  const handleDeleteOrders = () => {
    if (state.user && state.user.uid) {
      const ordersRef = ref(database, `orders/${state.user.uid}`);
      remove(ordersRef)
        .then(() => {
          setOrders([]); // Limpiar la lista de órdenes localmente
        })
        .catch((error) => {
          console.error("Error al eliminar el historial de órdenes:", error);
        });
    }
  };

  if (loading) {
    return <p>Loading orders...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!state.user) {
    return (
      <div className="authpage">
        <AuthPage />
      </div>
    );
  }

  return (
    <div className="my-orders">
      <h2>{state.user.email}'s Orders</h2>
      {orders.length === 0 ? (
        <p>You have not made any orders yet.</p>
      ) : (
        <div className="order-list">
          {orders.map((order) => (
            <Order key={order.id} order={order} />
          ))}
          <a onClick={handleDeleteOrders} style={{ marginTop: "20px" }}>
            Delete orders history
          </a>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
