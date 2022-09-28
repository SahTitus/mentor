import { Clear, Message } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { disConnect } from "../actions/mentors";
import { useStateContex } from "../store/StateProvider";
import styles from "../styles/MenteeCard.module.css";

const MenteeCard = ({ name, email, id, image }) => {
  const dispatch = useDispatch();
  const { setChatInfo } = useStateContex();

  const mentorLocal = JSON.parse(localStorage.getItem("mentor"));
  const user = JSON.parse(localStorage.getItem("profile"));

  const remove = () => {
    if (!mentorLocal?._id) {
      dispatch(disConnect({ id, menteeId: user?.result?._id }));
    } else {
      dispatch(disConnect({ id: mentorLocal?._id, menteeId: id }));
      console.log('cc')
    }
  };

  return (
    <div className={styles.card}>
      <Avatar src={image} className={styles.avatar} />
      <div className={styles.info}>
        <p>{name}</p>
        <span>{email}</span>
      </div>
      <div className={styles.left}>
        <Link
          onClick={() =>
            setChatInfo({
              name: name,
              image: "",
              email: email,
            })
          }
          to={`/chatRoom/${id}`}
        >
          <IconButton>
            <Message />
          </IconButton>
        </Link>
        {/* This is handle as like and unlike, connectMentor will connect a mentee with the mentor double click will disconnect the the two */}
        <IconButton onClick={remove}>
          <Clear />
        </IconButton>
      </div>
    </div>
  );
};

export default MenteeCard;
