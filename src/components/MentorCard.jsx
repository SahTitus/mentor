import { Avatar, Button, IconButton } from "@mui/material";
import React, { useState, useEffect } from "react";
import styles from "../styles/MentorCard.module.css";
import { MailOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useStateContex } from "../store/StateProvider";
import { PersonFill } from "react-bootstrap-icons";
import {
  sendRequest,
  cancelRequest,
  acceptRequest,
} from "../actions/notifications";

const MentorCard = ({
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

  const { setRecipientId, setProfileId, setChatInfo } = useStateContex();

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

  const viewProfile = () => {
    setProfileId(myMentorId)
    navigate(`/profile/${myMentorId}`); 
  }

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
    <div className={styles.mentorCard}>
      <div  onClick={viewProfile} className={styles.image__wrapper}>
        {" "}
        <img
          className={styles.image}
          src={`${
            image ||
            "https://gravatar.com/avatar/9b36ffe978d6f0761521bd04707b4b40?size=125&d=https%3A%2F%2Fassets.untappd.com%2Fsite%2Fassets%2Fimages%2Fdefault_avatar_v3_gravatar.jpg%3Fv%3D2"
          } `}
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
          <div onClick={viewProfile} className={styles.card__left}>
            <Avatar
              src={`${
                image ||
                "https://gravatar.com/avatar/9b36ffe978d6f0761521bd04707b4b40?size=125&d=https%3A%2F%2Fassets.untappd.com%2Fsite%2Fassets%2Fimages%2Fdefault_avatar_v3_gravatar.jpg%3Fv%3D2"
              } `}
              className={styles.avatar}
            />
            <p>{name}</p>
          </div>
          {id === mentor?.userId ? (
            <p>
              <PersonFill className={styles.card__rightPerson} />
            </p>
          ) : (
            <div className={styles.card__right}>
              <IconButton onClick={openChatRoom}>
                {" "}
                <MailOutlined className={styles.ar} />
              </IconButton>

              {pending ? (
                <Button
                  onClick={cancelRqt}
                  className={`${styles.connectBtn} ${styles.cancelRequest}`}
                >
                  Cancel Request
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
      </div>
    </div>
  );
};

export default MentorCard;
