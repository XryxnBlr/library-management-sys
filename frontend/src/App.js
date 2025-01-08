import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Books from "./pages/Books";
import Users from "./pages/Users";
import Borrow from "./pages/Borrow";
import Return from "./pages/Return";
import Notifications from "./pages/Notifications";
import AddUser from "./components/AddUser";
import AddBook from "./components/AddBook";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/users" element={<Users />} />
          <Route path="/borrow" element={<Borrow />} />
          <Route path="/return" element={<Return />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/add-book" element={<AddBook />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;