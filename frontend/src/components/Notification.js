import React, { useEffect, useState } from "react";
import axios from "../api/axios";

function Notification() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    axios.get("/notifications")
      .then(response => setNotifications(response.data.notifications))
      .catch(error => console.error("Error fetching notifications:", error));
  }, []);

  return (
    <div className="notification">
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification}</li>
        ))}
      </ul>
    </div>
  );
}

export default Notification;