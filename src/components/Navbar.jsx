import {
  Add,
  Menu,
  NotificationsOutlined,
  Person,
  QuestionMark,
} from "@mui/icons-material";
import { Avatar, IconButton, Button } from "@mui/material";
import React, { useState } from "react";
import styles from "../styles/Navbar.module.css";

import { Box, Divider, List, ListItem, Drawer } from "@mui/material";

import { People, Logout } from "@mui/icons-material";
import { Link } from "react-router-dom";

import { useStateContex } from "../store/StateProvider";
import { useDispatch } from "react-redux";
import { logout } from "../redux/auth";

const listItems = [
  // {
  //   listIcon: <Home />,
  //   listText: "Admin",
  //   add: false,
  //   link: '/students',
  // },
  {
    listIcon: <Person />,
    listText: "Profile",
    add: false,
    link: "/students",
  },
  {
    listIcon: <People />,
    listText: "Mentors",
    add: false,
    link: "/students",
  },
  {
    listIcon: <QuestionMark />,
    listText: "Help",
    add: false,
    link: "/students",
  },
  // {
  //   listIcon: <Paid />,
  //   listText: "Make payment",
  //   add: false,
  //   link: '/students',
  // },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("profile"));
  const { darkMode } = useStateContex();
  const dispatch = useDispatch();

  const toggleSlider = () => {
    setOpen(!open);
  };

  const logOut = () => {
    dispatch(logout());
    window.location.reload(true);
    // closeDrawer()
  };

  const sideList = () => (
    <Box component="div" sx={{ width: "250px", marginTop: "10px" }}>
      <div className={styles.side__user}>
        {user ? (
          <>
            <Avatar
              className={styles.side__avatar}
              src={user?.result?.photoURL}
              alt="Juaneme8"
            >
              {user?.result?.displayName?.charAt(0) ||
                user?.result?.name.charAt(0)}{" "}
            </Avatar>
            <div className={styles.side__userInfo}>
              <p>{user?.result?.displayName || user?.result?.name}</p>
              <span>{user?.result?.email}</span>
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
        <ListItem
          button
          className={`${styles.drawer__listItem} ${styles.add__button} `}
        >
          <div className={styles.drawer__listIcon}>
            <Add />
          </div>
          <div className={styles.drawer__listText}>Become a mentor</div>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div className={styles.navbar}>
      {/* <Sidebar toggleSlider={toggleSlider} open={open} setOpen={setOpen} /> */}
      <IconButton onClick={toggleSlider} className={styles.menu}>
        <Menu />
      </IconButton>
      <IconButton onClick={logOut} className={styles.notif__container}>
        <NotificationsOutlined />
      </IconButton>
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
