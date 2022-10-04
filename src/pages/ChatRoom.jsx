import styles from "../styles/ChatRoom.module.css";
import { Add, ArrowBack } from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, Button, IconButton, TextareaAutosize } from "@mui/material";
import { useStateContex } from "../store/StateProvider";
import { SendFill } from "react-bootstrap-icons";
import Message from "../components/Message";
import { fetchMessages, sendMessage } from "../actions/messages";
import { fetchRoom } from "../actions/chatRooms";

const ChatRoom = () => {
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const roomId = id;

  const user = JSON.parse(localStorage.getItem("profile"));
  const mentorLocal = JSON.parse(localStorage.getItem("mentor"));
  const [focused, setFocused] = useState(false);
  const { messages } = useSelector((state) => state.messages);
  const { room } = useSelector((state) => state.rooms);
  const { chatInfo, setChatInfo, recipientId } = useStateContex();

  const { darkMode, focus } = false;

  if (room._id) setChatInfo(room);

  useEffect(() => {
    dispatch(fetchMessages(roomId));
  }, [roomId]);

  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    if (!user?.result?._id) navigate("/auth");
    const interval = setInterval(() => {
      dispatch(fetchMessages(roomId));
    }, 5000);

    dispatch(fetchRoom(roomId));
    return () => clearInterval(interval);
  }, []);

  const messagesRef = useRef();

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const chatData = {
    message: message,
    image: "",
    senderId: user?.result._id,
    mentorId: mentorLocal?._id,
    recipientId: recipientId,
    senderName: mentorLocal?.name || user?.result?.name,
    roomDbId: chatInfo?._id,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(sendMessage(roomId, { chatData }));
    setMessage("");
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const receiverInfo = chatInfo?.users__profile?.map((pro) =>
    pro._id !== user.result._id ? pro : null
  );
  const receiverName =
    receiverInfo?.map((rec) => rec?.mentorshipName || rec?.name) ||
    chatInfo?.name;
  const receiverImg = receiverInfo?.map(
    (rec) => rec?.mentorshipDp || rec?.image || chatInfo?.image
  );

  const aboutRoom = () => {
    navigate(`groupDetails`);
  };

  return (
    <div className={`${styles.chatRoom} ${darkMode && styles.chatroomDark}`}>
      <div className={styles.chatroom__top}>
        <ArrowBack onClick={() => navigate(-1)} className={styles.arrowBack} />
        {chatInfo.isGroup ? (
          <>
            <Avatar
              className={styles.topAvatar}
              src={chatInfo.image}
              alt="Juaneme8"
              style={{ cursor: "pointer" }}
              onClick={aboutRoom}
            >
              {chatInfo?.roomName?.charAt(0)}
            </Avatar>
            <p
              style={{ cursor: "pointer" }}
              onClick={aboutRoom}
              className={styles.roomName}
            >
              {" "}
              {chatInfo?.roomName || receiverName}
            </p>
          </>
        ) : (
          <>
            <Avatar
              className={styles.topAvatar}
              src={receiverImg?.filter((ava) => ava) || chatInfo?.image}
              alt="Juaneme8"
            >
              {receiverInfo?.map(
                (rec) => rec?.mentorshipName?.charAt(0) || rec?.name.charAt(0)
              ) || chatInfo?.name?.charAt(0)}
            </Avatar>
            <p className={styles.roomName}> {receiverName}</p>
          </>
        )}

        {chatInfo?.isGroup && room?.adminId === user?.result?._id && (
          <div className={styles.addBox}>
            <IconButton
              onClick={() => navigate("addMembers")}
              className={styles.addBox__wrapper}
            >
              <Add />
            </IconButton>
          </div>
        )}
      </div>

      <div className={styles.chatroom__body}>
        <div ref={messagesRef} />
        <div className={styles.messages}>
          {messages?.map((message, i) => (
            <Message
              key={i + message._id}
              user
              id={message._id}
              senderId={message.senderId}
              message={message.message}
              timestamp={message.createdAt}
              image={message.image}
              senderName={message.senderName}
              isGroup={room?.isGroup}
            />
          ))}
        </div>
      </div>
      <div className={styles.scrollView} ref={scrollRef} />
      <div
        className={`${styles.chatroom__footer} ${focused && styles.focused}`}
      >
        <div className={`${styles.chatroom__form}`}>
          <form onSubmit={handleSubmit}>
            <TextareaAutosize
              className={styles.chatroom__textarea}
              placeholder="Enter a message here..."
              value={message}
              maxRows={14}
              rows={1}
              type="text"
              autoFocus={focus}
              onChange={handleChange}
              onFocus={(e) => setFocused(true)}
              onBlur={(e) => setFocused(false)}
              multiline="multiline"
            />
          </form>
          {!!message.length && (
            <Button onClick={handleSubmit} className={styles.sendButton}>
              <SendFill className={styles.sendIcon} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
export default ChatRoom;
