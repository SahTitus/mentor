import { Delete, Edit, } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import { PeopleFill } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import {  useNavigate } from "react-router-dom";
import { deleteRoom } from "../actions/chatRooms";
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
  timestamp,
}) {
  const { setRecipientId, setChatInfo } = useStateContex();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const avaImg = receiverInfo?.map((rec) => rec?.mentorshipDp || rec?.image);

  const editRoom = () => {
    navigate("/addRoom");
    setChatInfo(theRoom);
  };

  const handleOnclick = () => {
    setRecipientId(id)
    navigate(`/chatRoom/${id}`);
  };

  return (
      <div className={`${styles.chat} `}>
        {isGroup ? (
          <Avatar onClick={handleOnclick} className={styles.chat__avatar} src={roomIcon}>
            {roomName?.charAt(0)}
          </Avatar>
        ) : (
          <Avatar
          onClick={handleOnclick} 
            className={styles.chat__avatar}
            src={avaImg.filter((ava) => ava)}
          >
            {receiverInfo.map(
              (rec) => rec?.mentorshipName?.charAt(0) || rec?.name.charAt(0)
            )}
          </Avatar>
        )}
        <div onClick={handleOnclick}  className={styles.chat__text}>
          <div className={styles.chat__textInfo}>
            <div className={styles.chat__textInfoTop}>
              <div className={styles.chat__textInfoTop}>
                <p>
                  {isGroup
                    ? roomName
                    : receiverInfo.map(
                        (rec) => rec?.mentorshipName || rec?.name
                      )}
                </p>
                {isGroup && <PeopleFill className={styles.peopleIcon} />}
              </div>
              {/* <span className={styles.chat__timestamp}>{timestamp}</span> */}
            </div>
            <p className={styles.chat__message}>{latestMsg}</p>
          </div>
        </div>
        {(isGroup && theRoom.adminId === user?.result?._id) && (
          <div>
            <IconButton>
              <Delete onClick={() => dispatch(deleteRoom(id))} />
            </IconButton>
            <IconButton onClick={editRoom}>
              <Edit />
            </IconButton>
          </div>
        )}
      </div>
  );
}

export default Chat;
