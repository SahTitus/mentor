import { Add, Menu, NotificationsOutlined, Person } from "@mui/icons-material";
import { Avatar, IconButton, Button } from "@mui/material";
import React, { useState } from "react";
import styles from "../styles/Navbar.module.css";

import { Box, Divider, List, ListItem, Drawer } from "@mui/material";

import { People, Logout } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/auth";
import { useStateContex } from "../store/StateProvider";

const listItems = [
  {
    listIcon: <Person />,
    listText: "Profile",
    add: false,
    link: "/profile/1001",
  },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("profile"));
  const mentor = JSON.parse(localStorage.getItem("mentor"));
  const { setCurrentId, setChatInfo } = useStateContex();

  const dispatch = useDispatch();

  const toggleSlider = () => {
    setOpen(!open);
  };

  const logOut = () => {
    dispatch(logout());
    window.location.reload(true);
  };

  const sideList = () => (
    <Box component="div" sx={{ width: "250px", marginTop: "10px" }}>
      <div className={styles.side__user}>
        {user ? (
          <>
            <Avatar
              className={styles.side__avatar}
              src={user?.result?.image || user?.result?.mentorshipDp}
              alt="Juaneme8"
            >
              {user?.result?.name.charAt(0)}{" "}
            </Avatar>
            <div className={styles.side__userInfo}>
              <p>{mentor?.name || user?.result?.name}</p>
              <span>{mentor?.email || user?.result?.email}</span>
            </div>
          </>
        ) : (
          <Link className={styles.signIn} to="/auth">
            <Button className={styles.signIn}>Sign In</Button>
          </Link>
        )}
      </div>
      <Divider />
      <List>
        {listItems.map((listItem, index) => (
          <Link className={styles.link} key={index} to={listItem?.link}>
            <ListItem
              button
              key={index}
              className={`${styles.drawer__listItem} ${
                listItem.add && styles.add__button
              }`}
            >
              <div className={styles.drawer__listIcon}>{listItem.listIcon}</div>
              <div className={styles.drawer__listText}>{listItem.listText}</div>
            </ListItem>
          </Link>
        ))}

        <Link to="/myMentors">
          <ListItem button className={`${styles.drawer__listItem} `}>
            <div className={styles.drawer__listIcon}>
              <People />
            </div>
            <div className={styles.drawer__listText}>
              {mentor?._id ? "Mentees" : "Mentors"}
            </div>
          </ListItem>
        </Link>
        {mentor?._id && (
          <Link onClick={() =>  setChatInfo({})} to="/addRoom">
            <ListItem button className={`${styles.drawer__listItem} `}>
              <div className={styles.drawer__listIcon}>
                <Add />
              </div>
              <div className={styles.drawer__listText}>Create a group</div>
            </ListItem>
          </Link>
        )}

        {user?.result?._id && (
          <ListItem
            onClick={logOut}
            button
            className={`${styles.drawer__listItem} `}
          >
            <div className={styles.drawer__listIcon}>
              <Logout />
            </div>
            <div className={styles.drawer__listText}>Log out</div>
          </ListItem>
        )}

{!mentor && !user?.result?.age && user?.result?._id && (
          <>
            <Link to="/createMentee">
              <ListItem
                button
                className={`${styles.drawer__listItem}  `}
              >
                <div className={styles.drawer__listIcon}>
                  <Add />
                </div>
                <div className={styles.drawer__listText}>Become a mentee</div>
              </ListItem>
            </Link>
          </>
        )}


        {!mentor && user?.result?._id && (
          <>
            <Link onClick={() => setCurrentId(null)} to="/addMentor">
              <ListItem
                button
                className={`${styles.drawer__listItem} ${styles.add__button} `}
              >
                <div className={styles.drawer__listIcon}>
                  <Add />
                </div>
                <div className={styles.drawer__listText}>Become a mentor</div>
              </ListItem>
            </Link>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <div className={styles.navbar}>
      <IconButton onClick={toggleSlider} className={styles.menu}>
        <Menu />
      </IconButton>
      <Link to="/notifications">
        <IconButton className={styles.notif__container}>
          <NotificationsOutlined />
        </IconButton>
      </Link>
      <Drawer
        className={styles.drawer}
        onClick={toggleSlider}
        open={open}
        anchor="left"
        onClose={toggleSlider}
      >
        {sideList()}
      </Drawer>
    </div>
  );
};

export default Navbar;
