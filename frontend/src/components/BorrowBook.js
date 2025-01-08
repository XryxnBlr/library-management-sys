import React, { useState, useEffect } from "react";
import axios from "../api/axios";

function BorrowBook() {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedBook, setSelectedBook] = useState("");
  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    axios.get("/books")
      .then(response => setBooks(response.data))
      .catch(error => console.error("Error fetching books:", error));

    axios.get("/users")
      .then(response => setUsers(response.data))
      .catch(error => console.error("Error fetching users:", error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/books/${selectedBook}/borrow`, { user_id: selectedUser });
      alert("Book borrowed successfully!");
      setSelectedBook("");
      setSelectedUser("");
    } catch (error) {
      console.error("Error borrowing book:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Borrow Book</h2>
      <select value={selectedBook} onChange={(e) => setSelectedBook(e.target.value)} required>
        <option value="" disabled>Select Book</option>
        {books.filter(book => book.available).map(book => (
          <option key={book.id} value={book.id}>
            {book.title} by {book.author}
          </option>
        ))}
      </select>
      <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)} required>
        <option value="" disabled>Select User</option>
        {users.map(user => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
      <button type="submit">Borrow Book</button>
    </form>
  );
}

export default BorrowBook;