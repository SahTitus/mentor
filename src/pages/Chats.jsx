import "../styles/Chats.css";
// import { Search } from "@mui/icons-material";
import { Footer, Navbar } from "../components";
import Chat from "../components/Chat";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { fetchRooms } from "../actions/chatRooms";
import { useDispatch, useSelector } from "react-redux";
import { useStateContex } from "../store/StateProvider";
import { Box, CircularProgress } from "@mui/material";

const Chats = () => {
  const { darkMode } = false;
  const { rooms, isLoading, error } = useSelector((state) => state.rooms);
  const user = JSON.parse(localStorage.getItem("profile"));
  const { setChatInfo } = useStateContex();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRooms(user.result._id));
  }, [dispatch]);

  const sortedRooms = rooms
    .slice()
    .sort((a, b) =>
      b?.latestMsg?.createdAt.localeCompare(a?.latestMsg?.createdAt)
    );
  return (
    <div className={`chats ${darkMode && "chatsDark"}`}>
      <Navbar />

      <div className={`chats__body ${darkMode && "chatsDark"}`}>
        <h3>Chats </h3>

        {!sortedRooms?.length > 0 && !isLoading && (
          <div className="noData">
            <p>No chat history</p>
          </div>
        )}

        {isLoading && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        )}

        {sortedRooms.map((room) =>
          room.isGroup ? (
            <div
              key={room.roomId}
              className="chats__chat"
              onClick={() => setChatInfo(room)}
            >
              <Chat
                id={room.roomId}
                key={room.roomId}
                isGroup={room?.isGroup}
                roomIcon={room.image}
                roomName={room.roomName}
                receiverInfo={room.users__profile?.map((pro) =>
                  pro._id !== user?.result?._id ? pro : null
                )}
                latestMsg={room?.latestMsg?.msg}
                timestamp={room?.latestMsg?.createdAt}
              />
            </div>
          ) : (
            <div
              key={room.roomId}
              className="chats__chat"
              onClick={() => setChatInfo(room)}
            >
              <Chat
                id={room.roomId}
                key={room.roomId}
                image={room.image}
                isGroup={room?.isGroup}
                latestMsg={room?.latestMsg?.msg}
                receiverInfo={room.users__profile?.map((pro) =>
                  pro._id !== user?.result?._id ? pro : null
                )}
                timestamp={room?.latestMsg?.createdAt}
              />
            </div>
          )
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Chats;
