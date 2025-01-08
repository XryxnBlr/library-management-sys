import React, { useState } from "react";
import axios from "../api/axios";

function AddUser() {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/users", { name });
      alert("User added successfully!");
      setName("");
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add User</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="User Name"
        required
      />
      <button type="submit">Add User</button>
    </form>
  );
}

export default AddUser;