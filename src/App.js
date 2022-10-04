import React from "react";
import "./styles/App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Chats from "./pages/Chats";
import ChatRoom from "./pages/ChatRoom";
import AddRoom from "./pages/AddRoom";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import CreateMentor from "./pages/CreateMentor";
import MyMentors from "./pages/MyMentors";
import Notifications from "./pages/Notifications";
import SeeMore from "./pages/SeeMore";
import SearchPage from "./pages/SearchPage";
import GroupDetails from "./pages/GroupDetails";
import AddMembers from "./pages/AddMembers";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <div className="app__body">
          <Routes className="app__body">
            <Route path="/" element={<Home />} />
            <Route path="/chats" element={<Chats />} />

            <Route path="/auth" element={<Auth />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/addMentor" element={<CreateMentor />} />
            <Route
              path="/chatRoom/:id/groupDetails"
              element={<GroupDetails />}
            />
            <Route path="/chatRoom/:id/addMembers" element={<AddMembers />} />
            <Route path="/chatRoom/:id" element={<ChatRoom />} />
            <Route path={"profile/:id"} element={<Profile />} />
            <Route path="/addRoom" element={<AddRoom />} />
            <Route path="/mymentors" element={<MyMentors />} />
            <Route path="/seemore" element={<SeeMore />} />
            <Route path="/notifications" element={<Notifications />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
