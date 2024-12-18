import React, { useState } from "react";

function Books() {
  const [books, setBooks] = useState([]);

  // Fetch books from API or backend (placeholder for now)
  const fetchBooks = () => {
    setBooks([
      { id: 1, title: "Book A", author: "Author A", isbn: "12345" },
      { id: 2, title: "Book B", author: "Author B", isbn: "67890" },
    ]);
  };

  return (
    <div>
      <h2>Books</h2>
      <button onClick={fetchBooks}>Load Books</button>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.title} by {book.author} (ISBN: {book.isbn})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Books;