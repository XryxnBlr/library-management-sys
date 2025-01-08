import React, { useState, useEffect } from "react";
import axios from "../api/axios";

function ReturnBook() {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedBook, setSelectedBook] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [userBooks, setUserBooks] = useState([]);

  useEffect(() => {
    axios.get("/books")
      .then(response => setBooks(response.data))
      .catch(error => console.error("Error fetching books:", error));

    axios.get("/users")
      .then(response => setUsers(response.data))
      .catch(error => console.error("Error fetching users:", error));
  }, []);

  useEffect(() => {
    if (selectedUser) {
      const user = users.find(user => user.id === parseInt(selectedUser));
      if (user) {
        const borrowedBookIds = user.borrowed_books.split(",").map(id => parseInt(id));
        setUserBooks(books.filter(book => borrowedBookIds.includes(book.id)));
      }
    }
  }, [selectedUser, books, users]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/books/${selectedBook}/return`, { user_id: selectedUser });
      alert("Book returned successfully!");
      setSelectedBook("");
      setSelectedUser("");
    } catch (error) {
      console.error("Error returning book:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Return Book</h2>
      <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)} required>
        <option value="" disabled>Select User</option>
        {users.map(user => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
      <select value={selectedBook} onChange={(e) => setSelectedBook(e.target.value)} required>
        <option value="" disabled>Select Book</option>
        {userBooks.map(book => (
          <option key={book.id} value={book.id}>
            {book.title} by {book.author}
          </option>
        ))}
      </select>
      <button type="submit">Return Book</button>
    </form>
  );
}

export default ReturnBook;