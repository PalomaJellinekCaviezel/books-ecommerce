// Order.jsx
import React from "react";
import "../Styles/Order.css";

const Order = ({ order }) => {
  return (
    <div key={order.id} className="order-card">
      <h4>Order ID: {order.id}</h4>
      <p>
        Date:{" "}
        {order.date
          ? new Date(order.date).toLocaleString()
          : "Fecha no disponible"}
      </p>
      <p>Total: ${order.total.toFixed(2)}</p>
      <ul>
        {order.items.map((item) => (
          <li key={item.id}>
            <div className="book-card">
              <p>{item.title}</p>
              <p>Price: ${item.price.toFixed(2)}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Order;
