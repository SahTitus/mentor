import styles from "../styles/MyMentors.module.css";
import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../actions/auth";
import { fetchMentor, fetchMentors } from "../actions/mentors";
import { useNavigate, useParams } from "react-router-dom";
import { Add, ArrowBack, Check } from "@mui/icons-material";
import { fetchRoom, memberAction } from "../actions/chatRooms";

const AddMembers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mentorLocal = JSON.parse(localStorage.getItem("mentor"));

  const { mentor, isLoading } = useSelector((state) => state.mentors);
  const { users } = useSelector((state) => state.auth);
  const { room } = useSelector((state) => state.rooms);

  const { id: roomId } = useParams();

  const menteesId = mentor?.mentees;

  const [mentees, setMentees] = useState(
    users?.filter((user) =>
      menteesId?.find((mentee) => (mentee === user._id ? user : null))
    )
  );

  const addMember = (roomId, menteeId) => {
    dispatch(memberAction({ roomId: roomId, addId: menteeId }));
    setMentees(mentees.filter((mentee) => mentee._id !== menteeId));
  };

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchMentors());
    dispatch(fetchRoom(roomId));
    if (mentorLocal?._id) dispatch(fetchMentor(mentorLocal?._id));
  }, [dispatch, mentorLocal?._id, roomId]);

  return (
    <div className={styles.myMentors}>
      <div className={styles.topBar}>
        <IconButton style={{ marginLeft: "10px" }} onClick={() => navigate(-1)}>
          <ArrowBack />
        </IconButton>
        <h4 style={{ marginLeft: "7px" }}>Add Members</h4>
      </div>

      <div className={styles.members__container}>
        <div className={styles.addMentees}>
          {isLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </Box>
          ) : (
            mentees.length > 0 &&
            mentees.map((mentee) => (
              <div key={mentee?._id} className={styles.memberCard}>
                <Avatar src={mentee?.image} className={styles.member__avatar} />
                <div className={styles.memberInfo}>
                  <p>{mentee?.name}</p>
                </div>

                {room?.users?.includes(mentee?._id) ? (
                  <Check style={{ color: "green" }} />
                ) : (
                  <IconButton onClick={() => addMember(room?._id, mentee?._id)}>
                    {" "}
                    <Add />
                  </IconButton>
                )}
              </div>
            ))
          )}
          {!mentees?.length > 0 && !isLoading && (
            <div className={styles.noData}>
              <p>No Mentee found</p>

              <Button
                onClick={() => navigate(-1)}
                className={styles.exploreBtn}
              >
                Go back
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddMembers;
