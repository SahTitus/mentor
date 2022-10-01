import { Delete, MoreHoriz } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteMessage } from "../actions/messages";
import styles from "../styles/Message.module.css";

const Message = ({ senderName, isGroup, message, timestamp, id, senderId }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const mentorLocal = JSON.parse(localStorage.getItem("mentor"));
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);
  const dispatch = useDispatch();

  const isUser = senderId === user?.result?._id || mentorLocal?.id === senderId;

 const time =new Date(timestamp).toLocaleTimeString()


  return (
    <div className={`${styles.messageCard} ${isUser && styles.userCard} `}>
      <div className={styles.messageCardMainLeft}>
        {" "}
        {/* <Avatar src={userDp} className={styles.avatar} /> */}
      </div>
      <div className={styles.messageCardMain}>
        <div className={styles.messageCardRight}>
          <div className={styles.messageCardBox}>
            {isGroup && <h4>{senderName}</h4>}

            <p className={styles.messageCardBoxText}>{message}</p>
            <div className={styles.timestamp}>
              <span>{time}</span>
            </div>
          </div>
        </div>
        {
         isUser && (
            <div className={styles.moreHoriz}>
          {showDeleteIcon ? (
            <IconButton
              onClick={() => {
                dispatch(deleteMessage(id));
                setShowDeleteIcon(false);
              }}
            >
              <Delete />
            </IconButton>
          ) : (
            <IconButton onClick={() => setShowDeleteIcon(true)}>
              <MoreHoriz />
            </IconButton>
          )}
        </div>
          )
        }
      </div>
    </div>
  );
};

export default Message;
