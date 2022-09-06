import { ArrowBack, Edit } from "@mui/icons-material";
import React, { useState } from "react";
import styles from "../styles/Profile.module.css";
import { useNavigate } from "react-router-dom";
import { Avatar, IconButton } from "@mui/material";
import MenteeCard from "../components/MenteeCard";

const Profile = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.profile}>
      <div className={styles.profile__top}>
        <div className={styles.profile__header}>
          <IconButton>
            <ArrowBack
              className={styles.profile__arrowBack}
              onClick={() => navigate(-1)}
            />
          </IconButton>
          <h4>Profile</h4>
        </div>
        <div className={styles.profile__info}>
          <Avatar className={styles.avatar} />
          <div className={styles.profile__text}>
            <h4>Professor</h4>
            <p>Sa@gmail.com</p>
          </div>
          <IconButton className={styles.edit__wrapper}>
            <Edit className={styles.edit} />
          </IconButton>
        </div>
      </div>

      <div className={styles.mentees__container}>
        <div className={styles.mentees__header}>
          <h5>Mentees</h5>

        </div>
        <div className={styles.mentees__container}>
          <MenteeCard />
          <MenteeCard />
        </div>
      </div>
    </div>
  );
};

export default Profile;
