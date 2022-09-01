import { Avatar, Button, IconButton } from "@mui/material";
import React from "react";
import styles from "../styles/MentorCard.module.css";
import { MailOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";

const MentorCard = ({name, image, program}) => {
  return (
    <div className={styles.mentorCard}>
      <div className={styles.image__wrapper}>
        {" "}
        <img
          className={styles.image}
          src={image}
          alt=""
        />
      </div>

      <div className={styles.info}>
        <p className={styles.title}>{program}</p>
        <div className={styles.thread__wrapper}>
          {" "}
          <hr className={styles.thread} />
        </div>
        <div className={styles.card__bottom}>
          <div className={styles.card__left}>
            <Avatar className={styles.avatar} />
            <p>{name}</p>
          </div>
          <div className={styles.card__right}>
            <Link to='/chatroom'>
            <IconButton>
              {" "}
              <MailOutlined className={styles.ar} />
            </IconButton>
            </Link>
            <Button className={styles.connectBtn}>Connect</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorCard;
