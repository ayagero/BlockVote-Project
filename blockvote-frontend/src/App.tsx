import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
// Import other pages as needed (e.g., AdminDashboard, VoterDashboard)

const App = () => {
  const [userRole, setUserRole] = useState("voter");

  return (
    <Router>
      <Header userRole={userRole} setUserRole={setUserRole} />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Add other routes here, e.g., <Route path="/admin" element={<AdminDashboard />} /> */}
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;