import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import { authStore } from "./store/authStore";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import Friend from "./pages/Friend";
import FriendReq from "./pages/FriendReq";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = authStore();

  console.log({ onlineUsers });

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <Signup /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={authUser ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          path="/settings"
          element={authUser ? <Settings /> : <Navigate to="/login" />}
        />
        <Route
          path="/search-friends"
          element={authUser ? <Friend /> : <Navigate to="/login" />}
        />

        <Route
          path="/friend-requests"
          element={authUser ? <FriendReq /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
};

export default App;
