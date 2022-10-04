import { Delete, Edit } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import { PeopleFill } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useStateContex } from "../store/StateProvider";
import styles from "../styles/Chat.module.css";

function Chat({
  receiverInfo,
  id,
  theRoom,
  isGroup,
  latestMsg,
  roomIcon,
  roomName,
}) {
  const { setRecipientId } = useStateContex();
  const navigate = useNavigate();
  const avaImg = receiverInfo?.map((rec) => rec?.mentorshipDp || rec?.image);

  const handleOnclick = () => {
    setRecipientId(id);
    navigate(`/chatRoom/${id}`);
  };

  return (
    <div onClick={handleOnclick} className={`${styles.chat} `}>
      {isGroup ? (
        <Avatar className={styles.chat__avatar} src={roomIcon}>
          {roomName?.charAt(0)}
        </Avatar>
      ) : (
        <Avatar
          className={styles.chat__avatar}
          src={avaImg.filter((ava) => ava)}
        >
          {receiverInfo.map(
            (rec) => rec?.mentorshipName?.charAt(0) || rec?.name.charAt(0)
          )}
        </Avatar>
      )}
      <div className={styles.chat__text}>
        <div className={styles.chat__textInfo}>
          <div className={styles.chat__textInfoTop}>
            <div className={styles.chat__textInfoTop}>
              <p>
                {isGroup
                  ? roomName
                  : receiverInfo.map((rec) => rec?.mentorshipName || rec?.name)}
              </p>
            </div>
          </div>
          <p className={styles.chat__message}>{latestMsg}</p>
        </div>
      </div>
      {isGroup && (
        <div>
          <PeopleFill className={styles.peopleIcon} />
        </div>
      )}
    </div>
  );
}

export default Chat;
