import { ArrowBack, Clear, Delete, Edit, People } from "@mui/icons-material";
import { Avatar, Button, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchUsers } from "../actions/auth";
import { deleteRoom, fetchRoom, memberAction } from "../actions/chatRooms";
import { useStateContex } from "../store/StateProvider";
import styles from "../styles/GroupDetails.module.css";

const GroupDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { setChatInfo } = useStateContex();

  const editRoom = () => {
    navigate("/addRoom");
    setChatInfo(room);
  };

  const deleteGroup = () => {
    dispatch(deleteRoom(id));
    navigate("/chats");
  };

  const user = JSON.parse(localStorage.getItem("profile"));

  const { room } = useSelector((state) => state.rooms);
  const { users } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user?.result?._id) navigate("/auth");
    dispatch(fetchRoom(id));
    dispatch(fetchUsers());
  }, [dispatch]);

  const [members, setMembers] = useState(
    room?.users?.map((memId) =>
      users?.find((us) => (us._id === memId ? us : null))
    )
  );

  const removeMember = (roomId, memberId) => {
    dispatch(memberAction({ roomId: roomId, memberId: memberId }));
    setMembers(members.filter((member) => member._id !== memberId));
  };

  return (
    <div className={styles.groupDetails}>
      <div className={styles.topBar}>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBack />
        </IconButton>
        <h4>Group Info</h4>
      </div>

      <div className={styles.roomInfo}>
        <Avatar src={room.image} className={styles.roomIcon} />
        <h3>{room?.roomName}</h3>
        <p>
          {members?.length} member{room?.users?.length === 0 ? "" : "s"}
        </p>
      </div>
      {room?.adminId === user?.result?._id && (
        <div className={`${styles.buttonsDiv}`}>
          <Button onClick={deleteGroup} className={styles.button}>
            <Delete style={{ marginRight: "7" }} />
            Delete
          </Button>
          <Button onClick={editRoom} className={styles.button}>
            <Edit style={{ marginRight: "7" }} />
            Edit
          </Button>
        </div>
      )}

      <div className={styles.members}>
        <h4>Members</h4>

        {members?.length === 0 && (
          <div className={styles.noMem}>
            <h4>No Members</h4>
          </div>
        )}

        <>
          {members?.length > 0 &&
            members?.map((member, i) => (
              <div key={i} className={`${styles.memberCard} `}>
                <Avatar src={member?.image} className={styles.member__avatar} />
                <div className={styles.memberInfo}>
                  <p>{member?.name}</p>
                </div>

                {room?.adminId === user?.result?._id ? (
                  <IconButton
                    onClick={() => removeMember(room._id, member._id)}
                  >
                    {" "}
                    <Clear />
                  </IconButton>
                ) : (
                  <People style={{ color: "gray" }} />
                )}
              </div>
            ))}
        </>
      </div>
    </div>
  );
};

export default GroupDetails;
