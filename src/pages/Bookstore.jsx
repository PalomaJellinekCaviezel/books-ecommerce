import { database } from "../firebaseConfig"; // Importar la base de datos
import { ref, onValue } from "firebase/database"; // Importar ref y onValue de firebase/database
import React, { useState, useEffect } from "react";
import Book from "../components/Book"; // Asegúrate de importar el componente Product
import "../Styles/Bookstore.css";

const Bookstore = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = () => {
      const booksRef = ref(database, "books");

      // Escuchar los datos en tiempo real
      onValue(
        booksRef,
        (snapshot) => {
          const booksData = snapshot.val();
          if (!booksData) {
            setError("No books found");
            setLoading(false);
            return;
          }

          const loadedBooks = Object.keys(booksData).map((key) => ({
            id: booksData[key].id,
            title: booksData[key].title,
            author: booksData[key].author,
            price: booksData[key].price,
            imageURL: booksData[key].imageURL,
            description: booksData[key].description,
            category: booksData[key].category,
          }));

          setBooks(loadedBooks);
          setLoading(false); // Cambiar el estado de carga
        },
        (error) => {
          setError("Failed to fetch books: " + error.message);
          setLoading(false);
        }
      );
    };

    fetchBooks();
  }, []);

  return (
    <div>
      {loading && <p>Loading books...</p>}
      {error && <p>{error}</p>}
      <div className="book-list">
        {books.map((book) => (
          <Book key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Bookstore;
