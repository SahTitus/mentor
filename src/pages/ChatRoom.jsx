import styles from "../styles/ChatRoom.module.css";
import { ArrowBack } from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, Button, TextareaAutosize } from "@mui/material";
import { useStateContex } from "../store/StateProvider";
import { Camera, SendFill } from "react-bootstrap-icons";
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
  const { messages, } = useSelector((state) => state.messages);
  const { room} = useSelector((state) => state.rooms);
  const { chatInfo, setChatInfo, recipientId } = useStateContex();

  if (room._id) setChatInfo(room)

  const { darkMode, focus } = false;
 

  useEffect(() => {
    dispatch(fetchMessages(roomId));
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });

  }, [roomId]);

  const scrollRef = useRef();

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchMessages(roomId));
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 5000)

    dispatch(fetchRoom(roomId));    
    return () => clearInterval(interval)
  }, []);

  //   const sortmessages = messages
  //     .slice()
  //     .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  //   const disableReply = !reply.trim();
  //   const disablemessage = !message.trim();

  const messagesRef = useRef();

  //   useEffect(() => {
  //     if (!user) navigate("/auth");
  //     // dispatch(fetchPost(id));
  //     // dispatch(fetchmessages(id));
  //   }, []);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const chatData = {
    message: message,
    image: "",
    senderId: user.result._id,
    mentorId: mentorLocal?._id,
    recipientId: recipientId,
    senderName:  user?.result?.name,
    roomDbId: chatInfo?._id,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(sendMessage(roomId, { chatData }));
    setMessage("");
  };

  //   if (isLoading)
  //     return (
  //       <div className={styles.isLoading}>
  //         <Spinner />
  //       </div>
  //     );

  // const receiverInfo =chatInfo?.users__profile?.find(
  //   (profile) => profile !== user.result._id
  // )
 
const receiverInfo=chatInfo?.users__profile?.map(pro => pro._id !== user.result._id ? pro : null )
  const receiverName = receiverInfo?.map((rec) => rec?.mentorshipName || rec?.name) || chatInfo?.name
  const receiverImg = receiverInfo?.map((rec) => rec?.mentorshipDp || rec?.image || chatInfo?.image)

  


  return (
    <div className={`${styles.chatRoom} ${darkMode && styles.chatroomDark}`}>
      <div className={styles.chatroom__top}>
        <ArrowBack onClick={() => navigate(-1)} className={styles.arrowBack} />
      {chatInfo.isGroup ? (  <>
        <Avatar
          className={styles.topAvatar}
          src={chatInfo.image}
          alt="Juaneme8"
        >
         {chatInfo?.roomName?.charAt(0)}

        </Avatar>
        <p className={styles.roomName}> { chatInfo?.roomName || receiverName}</p>
      </>
        ) : (
          <>
            <Avatar
            className={styles.topAvatar}
            src={receiverImg?.filter(ava => ava) || chatInfo?.image}
            alt="Juaneme8"
          >
           {receiverInfo?.map((rec) => rec?.mentorshipName?.charAt(0) || rec?.name.charAt(0) ) || chatInfo?.name?.charAt(0) }
  
          </Avatar>
          <p className={styles.roomName}> {receiverName}</p>
          </>
        )}
        

      </div>

      <div className={styles.chatroom__body}>
        <div ref={messagesRef} />
        <div className={styles.messages}>
          {/* { {sortmessages?.map((message, i) => (  */}
        {
          messages?.map((message, i) => (
            <Message
              key={i+message._id}
            user
            id={message._id}
            senderId={message.senderId}
            message={message.message}
            timestamp={message.createdAt}
            image={message.image}
          creatorName={message.creatorName}
          />
          ))
        }
          {/* ))}  */}
        </div>
      </div>
      <div className={styles.scrollView} ref={scrollRef} />
      <div
        className={`${styles.chatroom__footer} ${focused && styles.focused}`}
      >
           
        <div className={`${styles.chatroom__form}`}>
          <div className={styles.footerBotmLeft}>
            <Camera className={styles.footerCamera} />
          </div>
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
          <Button onClick={handleSubmit} className={styles.sendButton}>
            <SendFill className={styles.sendIcon} />
          </Button>
        </div>

        {/* {(focused || !!message.length > 0 || reply.length > 0) && (
          <div className={`${styles.footerBotm} `}>
            <div className={styles.footerBotmLeft}>
              <Camera className={styles.footerCamera} />
            </div>
  
            {!replyingTo && !isReply && (
              <button
                onClick={handleSubmit}
                // disabled={disablemessage}
                type="button"
                className={`${styles.button}

                `}
              >
                message
              </button>
            )}
          </div>
        )} */}
      </div>
 
    </div>
  );
};
export default ChatRoom;
