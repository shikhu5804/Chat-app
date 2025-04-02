import React, { useState } from "react";
import axios from "axios";
import { axiosInstance } from "../lib/axios";

const Friend = () => {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("none");
  const [notFound, setNotFound] = useState(false); // Track "not found" state

  const searchUser = async () => {
    try {
      const { data } = await axiosInstance.get(`/user/search?email=${email}`);
      console.log(data);
      setUser(data);
      setStatus("none");
      setNotFound(false); // Reset "not found" when user is found
    } catch (error) {
      console.error("User not found:", error);
      setUser(null);
      setNotFound(true); // Set "not found" to true
    }
  };

  const sendFriendRequest = async () => {
    console.log("Sending friend request to:", user._id);
    if (!user) return;

    try {
      const { data } = await axiosInstance.post("/user/friend-request", {
        targetUserId: user._id,
      });
        console.log("Friend request response:", data);
      setStatus(data.status);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="pt-20 h-screen">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Search Friends</h1>
            <p className="mt-2">Find and add friends</p>
          </div>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Search by email id"
              className="input input-bordered w-full max-w-xs"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={searchUser} className="btn btn-primary">
              Search
            </button>

            {user ? (
              <div className="mt-4 p-4 bg-white rounded-lg shadow">
                <div className="flex items-center gap-4">
                  <img
                    src={user.profilepic || "/avatar.jpg"}
                    alt="Profile"
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <h2 className="text-lg font-bold text-black">
                      {user.fullname}
                    </h2>
                    <p className="text-gray-500">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={sendFriendRequest}
                  className={`btn mt-4 ${
                    status === "pending" ? "btn-secondary" : "btn-primary"
                  }`}
                >
                  {status === "pending" ? "Cancel Request" : "Send Request"}
                </button>
              </div>
            ) : notFound ? (
              <div className="text-center text-red-500 mt-4">
                No user found with this email
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Friend;
