import { Mail, MailOutline } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import styles from "../styles/TopMentor.module.css";
import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useStateContex } from "../store/StateProvider";
import { PersonFill } from "react-bootstrap-icons";
import {
  sendRequest,
  cancelRequest,
  acceptRequest,
} from "../actions/notifications";

const TopMentor = ({
  name,
  id,
  course,
  image,
  pendingMentees,
  connectedMentees,
  myMentorId,
}) => {
  const [pending, setPending] = useState(false);
  const [connected, setConnected] = useState(false);

  const user = JSON.parse(localStorage.getItem("profile"));
  const mentor = JSON.parse(localStorage.getItem("mentor"));

  const { setRecipientId, setChatInfo } = useStateContex();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    pendingMentees.map((penId) => {
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
    if (!user?.result?._id) navigate("/auth");
    dispatch(sendRequest(requestData));
    setPending(!pending);
  };
  const disConnect = () => {
    dispatch(
      acceptRequest({
        mentorId: myMentorId,
        menteeId: user?.result?._id,
      })
    );
  };
  const cancelRqt = () => {
    setPending(!pending);
    dispatch(
      cancelRequest({ requestId: user?.result?._id, mentorId: myMentorId })
    );
  };

  const openChatRoom = () => {
    if (!user?.result?._id) {
      navigate("/auth");
    } else {
      navigate(`/chatroom/${id}-${user?.result?._id} `);
    }
    setRecipientId(id);
    setChatInfo({ name, image, id });
  };

  return (
    <div className={styles.topMentor}>
      <div className={styles.text}>
        {" "}
        <p className={styles.name}>{name}</p>
        <p className={styles.course}>{course}</p>
      </div>
      <div className={styles.img__wrapper}>
        <img className={styles.img} src={image} alt="" />
      </div>
      {id === mentor?.userId ? (
        <p>
          <PersonFill className={styles.you} />
        </p>
      ) : (
        <div className={styles.buttons}>
          <IconButton onClick={openChatRoom}>
            {" "}
            <MailOutline className={styles.mailBtn} />
          </IconButton>

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
      )}
    </div>
  );
};

export default TopMentor;
