import { Avatar } from "@mui/material";
import { PeopleFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
// import { useStateContex } from "../store/StateProvider";
import styles from "../styles/Chat.module.css";

function Chat({ username, addNewChat, message, group, image, timestamp }) {
  const { darkMode } = false;

  return (
    <Link to="/chatRoom">
      <div className={`${styles.chat} ${darkMode && styles.chatDark}`}>
        <Avatar className={styles.chat__avatar} src={""}>
          {username.charAt(0)}
        </Avatar>
        <div className={styles.chat__text}>
          <div className={styles.chat__textInfo}>
            <div className={styles.chat__textInfoTop}>
              <div className={styles.chat__textInfoTop}>
                <h4>{username}</h4>
             {group && <PeopleFill className={styles.peopleIcon}/>}
              </div>
              <p className={styles.chat__timestamp}>{timestamp}</p>
            </div>
            <p className={styles.chat__message}>{message}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Chat;
