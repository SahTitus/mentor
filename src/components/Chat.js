import { Avatar } from "@mui/material";
import { PeopleFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { useStateContex } from "../store/StateProvider";
import styles from "../styles/Chat.module.css";

function Chat({
  receiverInfo,
  id,
  addNewChat,
  message,
  isGroup,
  latestMsg,
  roomIcon,
  roomName,
  timestamp,
}) {
  const { darkMode } = false;
  const { setRecipientId } = useStateContex();

  const avaImg = receiverInfo?.map((rec) => rec?.mentorshipDp || rec?.image) 

  return (
    <Link onClick={()=>  setRecipientId(id)} className={styles.link} to={`/chatRoom/${id}`}>
      <div className={`${styles.chat} ${darkMode && styles.chatDark}`}>
    {isGroup ? (
          <Avatar
          className={styles.chat__avatar}
          src={roomIcon}
        >
         {roomName?.charAt(0) } 
        </Avatar>
    ) : (
          <Avatar
          className={styles.chat__avatar}
          src={avaImg.filter(ava => ava)}
        >
         {receiverInfo.map((rec) => rec?.mentorshipName?.charAt(0) || rec?.name.charAt(0) )} 
        </Avatar>
    )} 
        <div className={styles.chat__text}>
          <div className={styles.chat__textInfo}>
            <div className={styles.chat__textInfoTop}>
              <div className={styles.chat__textInfoTop}>
                <p>
                  {isGroup ? (roomName) : (
                    receiverInfo.map((rec) => rec?.mentorshipName || rec?.name)
                  )}
                </p>
                {isGroup && <PeopleFill className={styles.peopleIcon} />}
              </div>
              {/* <span className={styles.chat__timestamp}>{timestamp}</span> */}
            </div>
            <p className={styles.chat__message}>{latestMsg}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Chat;
