import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
// import AdminDashboard from "./pages/AdminDashboard";
// import VoterDashboard from "./pages/VoterDashboard";

type UserRole = "admin" | "voter" | null;

const App: React.FC = () => {
  const [userRole, setUserRole] = useState<UserRole>("voter");

  return (
    <Router>
      <Header userRole={userRole} setUserRole={setUserRole} />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/admin" element={<AdminDashboard setUserRole={setUserRole} />} />
          <Route path="/voter" element={<VoterDashboard />} /> */}
        </Routes>
      </main>

      <Footer />
    </Router>
  );
};

export default App;
