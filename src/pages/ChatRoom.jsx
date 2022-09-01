import styles from "../styles/ChatRoom.module.css";
import { ArrowBack } from "@mui/icons-material";
import React, { useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { fetchPost } from "../actions/posts";
import { Avatar, Button, TextareaAutosize } from "@mui/material";
// import { useStateContex } from "../store/StateProvider";
// import Spinner from "../components/loadash/Spinner";
// import messageCard from "../components/message/messageCard";
import { Camera, SendFill } from "react-bootstrap-icons";
import Message from "../components/Message";
// import {
//   addmessage,
//   fetchmessages,
//   // addMoremessages,
//   addReply,
// } from "../actions/messages";
// import { messagePst } from "../actions/posts";

const ChatRoom = () => {
  const [message, setmessage] = useState("");

  const navigate = useNavigate();
  //   const dispatch = useDispatch();
  //   const { id } = useParams();
  //   const user = JSON.parse(localStorage.getItem("profile"));
  const [focused, setFocused] = useState(false);

  const { darkMode, focus } = false;
  //   const { post, isLoading } = useSelector((state) => state.posts);
  //   const { messages, messagesId } = useSelector((state) => state.messages);

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
    setmessage(e.target.value);
  };

  //   const chatData = {
  //     message,
  //     image: "",
  //     creatorName: user?.result?.displayName || user?.result?.name,
  //     userDp: user?.result?.photoURL,
  //     replies: [],
  //     likes: [],
  //   };

  const handleSubmit = async (e) => {
    console.log("first");
    e.preventDefault();
    messagesRef.current?.scrollIntoView({ behavior: "smooth" });
    // dispatch(messagePst(id));
    // dispatch(addmessage({ chatData, postId: id, messagesId: messagesId}));
    setmessage("");
  };

  //   if (isLoading)
  //     return (
  //       <div className={styles.isLoading}>
  //         <Spinner />
  //       </div>
  //     );

  return (
    <div className={`${styles.chatRoom} ${darkMode && styles.chatroomDark}`}>
      <div className={styles.chatroom__top}>
        <ArrowBack onClick={() => navigate(-1)} className={styles.arrowBack} />
        <Avatar className={styles.topAvatar}></Avatar>
        <p className={styles.roomName}>Themselve</p>
      </div>

      <div className={styles.chatroom__body}>
        <div ref={messagesRef} />
        <div className={styles.messages}>
          {/* { {sortmessages?.map((message, i) => (  */}
          <Message
            //   key={i}
            user
            id={message.id}
            message="Hi there"
            timestamp={message.createdAt}
            image={message.image}
            creatorName="Gyan"
          />
          <Message
            //   key={i}

            id={message.id}
            message="Hi"
            timestamp={message.createdAt}
            image={message.image}
            creatorName="Gyan"
          />
          <Message
            //   key={i}
            user
            id={message.id}
            message="How are you"
            timestamp={message.createdAt}
            image={message.image}
            creatorName="Gyan"
          />
          <Message
            //   key={i}

            id={message.id}
            message="Cool 😎"
            timestamp={message.createdAt}
            image={message.image}
            creatorName="Gyan"
          />
          {/* ))}  */}
        </div>
      </div>

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
          <Button className={styles.sendButton}>
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
