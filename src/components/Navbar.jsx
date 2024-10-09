import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ref, onValue } from "firebase/database";
import { database } from "../firebaseConfig"; // Asegúrate de importar tu configuración de Firebase
import "../Styles/Navbar.css";

const Navbar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Obtiene los libros de la base de datos
    const booksRef = ref(database, "books");
    onValue(booksRef, (snapshot) => {
      const booksData = snapshot.val();
      if (booksData) {
        // Extraer categorías únicas de los libros
        const uniqueCategories = [
          ...new Set(Object.values(booksData).map((book) => book.category)),
        ];
        setCategories(uniqueCategories);
      }
    });
  }, []);

  return (
    <nav className="category-navbar">
      <ul>
        {categories.map((category) => (
          <li key={category}>
            <Link to={`/category/${category}`} className="link-navbar">
              {category}
            </Link>
          </li>
        ))}
        <li>
          <Link to="/" className="link-navbar">
            All Books
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
