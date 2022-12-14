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
          to={`/chatRoom/${user?.result?._id}-${id}`}
        >
          <IconButton>
            <Message />
          </IconButton>
        </Link>
        <IconButton onClick={remove}>
          <Clear />
        </IconButton>
      </div>
    </div>
  );
};

export default MenteeCard;
