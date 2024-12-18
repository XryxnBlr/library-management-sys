import React from "react";

function BookList({ books }) {
  return (
    <ul>
      {books.map((book) => (
        <li key={book.id}>
          {book.title} by {book.author} (ISBN: {book.isbn})
        </li>
      ))}
    </ul>
  );
}

export default BookList;