import { Email } from "@mui/icons-material";
import { Avatar, Button, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  acceptRequest,
  cancelRequest,
  sendRequest,
} from "../actions/notifications";
import { useStateContex } from "../store/StateProvider";
import styles from "../styles/Notifications.module.css";

const TopMentorCard = ({
  name,
  image,
  program,
  id,
  myMentorId,
  pendingMentees,
  connectedMentees,
}) => {
  const [pending, setPending] = useState(false);
  const [connected, setConnected] = useState(false);

  const user = JSON.parse(localStorage.getItem("profile"));
  const mentor = JSON.parse(localStorage.getItem("mentor"));

  const { setRecipientId, setChatInfo } = useStateContex();

  const dispatch = useDispatch();

  useEffect(() => {
    pendingMentees?.map((penId) => {
      if (penId === user?.result?._id) {
        setPending(true);
      } else {
        setPending(false);
      }
      return null;
    });

    connectedMentees.map((penId) => {
      if (penId === user?.result?._id) {
        setConnected(true);
      } else {
        setConnected(false);
      }
      return null;
    });
  }, [connectedMentees, dispatch, pendingMentees, user?.result?._id]);

  const requestData = {
    requestId: user?.result?._id,
    image: mentor?.image || user?.result?.image,
    name: mentor?.name || user?.result?.name,
    mentorId: myMentorId,
    users: [id, user?.result?._id],
    connected: false,
  };

  const connect = () => {
    dispatch(sendRequest(requestData));
    setPending(!pending);
  };

  const cancelRqt = () => {
    setPending(!pending);
    dispatch(
      cancelRequest({ requestId: user?.result?._id, mentorId: myMentorId })
    );
  };
  const disConnect = () => {
    dispatch(
      acceptRequest({
        mentorId: myMentorId,
        menteeId: user?.result?._id,
      })
    );
  };

  const openChatRoom = () => {
    setRecipientId(id);
    setChatInfo({ name, image, id });
  };
  console.log(connected);
  return (
    <div className={styles.notif__card}>
      <div className={styles.card__top}>
        <Avatar src={image} className={styles.avatar}>
          {name?.charAt(0)}
        </Avatar>
        <div className={styles.info}>
          <p>{name}</p>
          <span>{program}</span>
        </div>
        <div className={styles.left}>
          <Link
            to={`/chatroom/${id}-${user?.result?._id} `}
            onClick={openChatRoom}
          >
            <IconButton onClick={() => dispatch()}>
              <Email />
            </IconButton>
          </Link>
        </div>
      </div>
      <div className={styles.buttom}>
        {pending ? (
          <Button
            onClick={cancelRqt}
            className={`${styles.connectBtn} ${styles.cancelRequest}`}
          >
            Cancel 
          </Button>
        ) : (
          <>
            {connected ? (
              <Button
                onClick={disConnect}
                className={`${styles.connectBtn} ${styles.connected}`}
              >
                Disconnect
              </Button>
            ) : (
              <Button onClick={connect} className={styles.connectBtn}>
                Connect
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TopMentorCard;
