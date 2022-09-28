import { Clear } from "@mui/icons-material";
import { Avatar, Button, IconButton } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { acceptRequest, deleteRequest } from "../actions/notifications";
import styles from "../styles/Notifications.module.css";

const Notification = ({ name, id, image, mentorId, requestId, connected }) => {
  const dispatch = useDispatch();
  const confirmed = false;

  const rqtData = {
    notificationId: id,
    mentorId: mentorId,
    menteeId: requestId,
  };

  const confirmRqt = () => {
    dispatch(acceptRequest(null, rqtData));
  };

  return (
    <div className={styles.notif__card}>
      <div className={styles.card__top}>
        <Avatar src={image} className={styles.avatar}>
          {name?.charAt(0)}
        </Avatar>
        <div className={styles.info}>
          <p>{name}</p>
          <span>Sent you a mentor request</span>
        </div>
        {confirmed && (
          <div className={styles.buttom}>
            <p>Confirmed</p>
          </div>
        )}
        <div className={styles.left}>
          <IconButton onClick={() => dispatch(deleteRequest(id))}>
            <Clear />
          </IconButton>
        </div>
      </div>
      <div className={styles.buttom}>
        <Button
          disabled={connected}
          onClick={confirmRqt}
          className={`${styles.buttom__button} ${
            connected && styles.disableBtn
          }`}
        >
         {connected ?  "Confirmed" :  "Confirm"}
        </Button>
      </div>
    </div>
  );
};

export default Notification;
