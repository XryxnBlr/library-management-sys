import React, { useState } from "react";

function UserList() {
  const [users, setUsers] = useState([]);

  // Fetch users from API or backend (placeholder for now)
  const fetchUsers = () => {
    setUsers([
      { id: 1, name: "User A" },
      { id: 2, name: "User B" },
    ]);
  };

  return (
    <div>
      <h2>Users</h2>
      <button onClick={fetchUsers}>Load Users</button>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;