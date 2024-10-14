import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Importa useParams para obtener el ID del libro
import { ref, onValue } from "firebase/database";
import { database } from "../firebaseConfig"; // Importa tu configuración de Firebase
import "../Styles/BookDetails.css"; // Asegúrate de agregar estilos si es necesario

const BookDetails = () => {
  const { id } = useParams(); // Obtén el ID del libro desde la URL
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const bookRef = ref(database, `books/book${id}`); // Accede al libro en Firebase

    const unsubscribe = onValue(
      bookRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setBook(data);
          setLoading(false);
        } else {
          setError("Book not found");
          setLoading(false);
        }
      },
      (error) => {
        setError("Failed to fetch book details: " + error.message);
        setLoading(false);
      }
    );

    return () => unsubscribe(); // Limpia el listener al desmontar
  }, [id]);

  if (loading) {
    return <p>Loading book details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!book) {
    return <p>No details available for this book</p>;
  }

  return (
    <div className="details-page">
      <div className="book-card-detail book-card">
        <h2>{book.title}</h2>
        <img src={book.imageURL} alt={book.title} className="book-image" />
        <div className="book-details">
          <p>
            <strong>Author: {book.author}</strong>
          </p>
          <p>Category: {book.category}</p>
          <p>{book.description}</p>
          <p>
            <strong>Price: ${book.price}</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
