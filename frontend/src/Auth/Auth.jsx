// Auth.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Post from "../components/Post";
// import UserHeader from "../components/UserHeader";
import Settings from "../components/Settings";
import Home from "../pages/Home";
import SearchPage from "../pages/SearchPage";
import AdvertisePage from "../pages/AdvertisePage";
import UserPage from "../pages/UserPage";
import MessagesPage from "../pages/MessagesPage";
import UploadPage from "../pages/UploadPage";
import CommentsPage from "../pages/CommentsPage";
import SearchBar from "../pages/SearchBar";
import MessageContainer from "../components/MessageContainer";
import UpdateProfile from "../components/UpdateProfile";
import Categories from "../components/Categories";
import FindUsers from "../components/FindUsers";
import SavePost from "../components/SavePost";
import ProtectedRoute from "./ProtectedRoute";

function Auth() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/post" element={<Post />} />
      {/* <Route path="/UserHeader" element={<UserHeader />} /> */}
      <Route path="/Settings" element={<Settings />} />
      <Route path="/home" 
      element={
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
       } />
      <Route path="/SearchPage" element={<SearchPage />} />
      <Route path="/AdvertisePage" element={<AdvertisePage />} />
      <Route path="/UserPage" element={<UserPage />} />
      <Route path="/MessagesPage" element={<MessagesPage />} />
      <Route path="/UploadPage" element={<UploadPage />} />
      <Route path="/CommentsPage" element={<CommentsPage />} />
      <Route path="/SearchBar" element={<SearchBar />} />
      <Route path="/MessageContainer" element={<MessageContainer />} />
      <Route path="/UpdateProfile" element={<UpdateProfile />} />
      <Route path="/Categories" element={<Categories />} />
      <Route path="/FindUsers" element={<FindUsers />} />
      <Route path="/SavePost" element={<SavePost />} />
    </Routes>
  );
}

export default Auth;
