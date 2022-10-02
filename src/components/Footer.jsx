import { useState } from "react";
import "../styles/BottomNavigation.css";
import { HomeOutlined, HomeRounded } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { ChatSquare, Heart, Person } from "react-bootstrap-icons";

const Footer = () => {
  const [isHomeClicked, setIsHomeClicked] = useState(true);
  const [isChatClicked, setIsChatClicked] = useState(false);

  const toggleHomelClick = () => {
    setIsHomeClicked(true);

    setIsChatClicked(false);
  };
  const toggleChatClick = () => {
    setIsChatClicked(true);

    setIsHomeClicked(false);
  };

  return (
    <div className={`btmNav`}>
      <div className="btmNav__container">
        <NavLink
          className={`btmNav__option `}
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
          className={`btmNav__option `}
          style={({ isActive }) => {}}
          to={"/mymentors"}
        >
          <Heart className="navBtm__icon" />
        </NavLink>

        <NavLink
          className={`btmNav__option `}
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
          className={`btmNav__option `}
          style={({ isActive }) => {}}
          to={"/profile/1001"}
        >
          <Person className="navBtm__icon" />
        </NavLink>
      </div>
    </div>
  );
};

export default Footer;
