import { useState } from "react";
import "../styles/BottomNavigation.css";
import {
  HomeOutlined,

  HomeRounded,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { ChatSquare, Heart, Person } from "react-bootstrap-icons";
// import { useStateContex } from "../store/StateProvider";

const Footer = () => {
  const [isHomeClicked, setIsHomeClicked] = useState(true);
  const [isChatClicked, setIsChatClicked] = useState(false);
  //   const [isHallsClicked, setIsHallsClicked] = useState(false);

  const { darkMode } = false;

  const toggleHomelClick = () => {
    setIsHomeClicked(true);
    // setIsHallsClicked(false);
    setIsChatClicked(false);
  };
  const toggleChatClick = () => {
    setIsChatClicked(true);
    // setIsHallsClicked(false);
    setIsHomeClicked(false);
  };
  //   const toggleHallsClick = () => {
  //     setIsChatClicked(false);
  //     setIsHallsClicked(true);
  //     setIsHomeClicked(false);
  //   };

  return (
    <div className={`btmNav ${darkMode && "btmNavDark"}`}>
      <div className="btmNav__container">
        <NavLink
          className={`btmNav__option ${darkMode && "btmNav__optionDark"}`}
          style={({ isActive }) => {}}
          to={"/"}
        >
          {!isHomeClicked ? (
            <HomeOutlined className="navBtm__icon" />
          ) : (
            <HomeRounded onClick={toggleHomelClick} className="navBtm__icon" />
          )}
        </NavLink>
        <NavLink
          className={`btmNav__option ${darkMode && "btmNav__optionDark"}`}
          style={({ isActive }) => {}}
          to={"/mymentors"}
        >
          <Heart className="navBtm__icon" />
        </NavLink>

        <NavLink
          className={`btmNav__option ${darkMode && "btmNav__optionDark"}`}
          style={({ isActive }) => {}}
          to={"/chats"}
        >
          {isChatClicked ? (
            <ChatSquare className="navBtm__icon" />
          ) : (
            <ChatSquare onClick={toggleChatClick} className="navBtm__icon" />
          )}
        </NavLink>
        <NavLink
          className={`btmNav__option ${darkMode && "btmNav__optionDark"}`}
          style={({ isActive }) => {}}
          to={"/profile"}
        >
          <Person className="navBtm__icon" />
        </NavLink>
      </div>
    </div>
  );
};

export default Footer;
