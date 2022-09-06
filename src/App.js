import React from "react";
import "./styles/App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Chats from "./pages/Chats";
import ChatRoom from "./pages/ChatRoom";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import CreateMentor from "./pages/CreateMentor";
import MyMentors from "./pages/MyMentors";
// import Dashboard from "./pages/Dashboard";
// import Students from "./pages/Students";

// import { useTheme } from "./utils/useTheme";
// import { ThemeProvider } from "styled-components";
// import ThemeStyle from "./styles/ThemeStyle";
// import useNetwork from "./utils/useNetwork";
// import OfflineMsg from "./components/connectivity/OfflineMsg";

function App() {
  // const theme = useTheme();
  // const { online } = useNetwork();

  return (
    // <ThemeProvider theme={theme}>
    // <>
    // <ThemeStyle />

    <div className="app">
      <BrowserRouter>
        {/* <div><Navbar /></div> */}

        <div className="app__body">
          <Routes className="app__body">
            <Route path="/" element={<Home />} />
             <Route path="/chats" element={<Chats />} />
             <Route path="/auth" element={<Auth />} />
             <Route path="/addMentor" element={<CreateMentor />} />
             <Route path="/chatRoom" element={<ChatRoom />} />
           <Route path="/profile" element={<Profile />} />
            <Route path="/mymentors" element={<MyMentors />} /> 
          </Routes>
        </div>
        {/* <BottomNavigation />			 */}
      </BrowserRouter>
    </div>
    // </>
    // </ThemeProvider>
  );
}

export default App;
