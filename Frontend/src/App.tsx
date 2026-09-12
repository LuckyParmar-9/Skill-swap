import { useState } from "react";
import type { User } from "./types";
import { Routes, Route, Outlet } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import MatchDetails from "./pages/MatchDetails";
import SwapRequests from "./pages/SwapRequests";
import Messages from "./pages/Messages";
import Reviews from "./pages/Reviews";
import Admin from "./pages/Admin";

export default function App() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* Protected/Private Routes wrapped in Layout */}
      <Route element={<Layout><Outlet /></Layout>}>
        <Route path="/dashboard" element={<Dashboard setSelectedUser={setSelectedUser} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<Search setSelectedUser={setSelectedUser} />} />
        <Route path="/match-details" element={<MatchDetails user={selectedUser} />} />
        <Route path="/swap-requests" element={<SwapRequests />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/admin" element={<Admin />} />
      </Route>
    </Routes>
  );
}
