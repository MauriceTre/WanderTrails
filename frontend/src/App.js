import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Login from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import WanderwegePage from './pages/Wanderwege';
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/wanderwege" element={<WanderwegePage />} />
      </Routes>
    </Router>
  );
}

export default App;
