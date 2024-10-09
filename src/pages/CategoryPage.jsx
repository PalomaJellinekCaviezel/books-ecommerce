import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ref, onValue } from "firebase/database";
import { database } from "../firebaseConfig"; // Importa tu configuración de Firebase
import Book from "../components/Book";

const CategoryPage = () => {
  const { category } = useParams();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const booksRef = ref(database, "books");
    onValue(booksRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Filtra los libros por la categoría seleccionada
        const filteredBooks = Object.values(data).filter(
          (book) => book.category === category
        );
        setBooks(filteredBooks);
      }
    });
  }, [category]);

  return (
    <>
      <div className="category-name">
        <h2>{category}'s books</h2>
      </div>
      <div className="book-list">
        {books.length === 0 ? (
          <p>There is no books in this category.</p>
        ) : (
          books.map((book) => (
            <Book key={book.id} book={book} className="book-card" />
          ))
        )}
      </div>
    </>
  );
};

export default CategoryPage;
