import { Clear, Message } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import React from "react";
import styles from "../styles/MenteeCard.module.css";

const MenteeCard = () => {
  return (
    <div className={styles.card}>
      <Avatar className={styles.avatar}/>
      <div className={styles.info}>
        <p>Name me</p>
        <span>sah@gmail.com</span>
      </div>
      <div className={styles.left}>
           <IconButton>
          <Message />
        </IconButton>
        <IconButton>
          <Clear />
        </IconButton>
     
      </div>
    </div>
  );
};

export default MenteeCard;
