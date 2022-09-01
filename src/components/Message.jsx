import React from "react";
import styles from "../styles/Message.module.css";

const Message = ({ creatorName, user, message }) => {
  return (
    <div className={`${styles.messageCard} ${user && styles.userCard} `}>
      <div className={styles.messageCardMainLeft}>
        {" "}
        {/* <Avatar src={userDp} className={styles.avatar} /> */}
      </div>
      <div className={styles.messageCardMain} id="fist">
        <div className={styles.messageCardRight}>
          <div className={styles.messageCardBox}>
           
            <p className={styles.messageCardBoxText}>{message}</p>
            <div className={styles.timestamp}>
              {/* <p>{creatorName}</p> */}
              <span>1 d</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
