import { ArrowBack, Edit } from "@mui/icons-material";
import React, { useEffect } from "react";
import styles from "../styles/Profile.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Box, CircularProgress, IconButton } from "@mui/material";
import MenteeCard from "../components/MenteeCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, fetchUser } from "../actions/auth";
import { fetchMentor, fetchMentors } from "../actions/mentors";
import { useStateContex } from "../store/StateProvider";

const Profile = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const mentorLocal = JSON.parse(localStorage.getItem("mentor"));

  const user1 = JSON.parse(localStorage.getItem("profile"));
  const { setCurrentId } = useStateContex();

  const { mentors, mentor, isLoading } = useSelector((state) => state.mentors);
  const { users, user } = useSelector((state) => state.auth);

  const menteesId = mentor?.mentees;

  const mentees = users?.filter((user) =>
    menteesId?.find((mentee) => (mentee === user._id ? user : null))
  );

  const myMentors = user?.mentors?.map((menId) =>
    mentors?.find((mentor1) => (mentor1._id === menId ? mentor1 : null))
  );

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchMentors());
    if (mentorLocal?._id) dispatch(fetchMentor(mentorLocal?._id));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchUser(user1?.result?._id));
  }, []);

  return (
    <div className={styles.profile}>
      <div className={styles.profile__top}>
        <div className={styles.profile__header}>
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBack className={styles.profile__arrowBack} />
          </IconButton>
          <h4>Profile</h4>
        </div>
        <div className={styles.profile__info}>
          <Avatar
            className={styles.avatar}
            src={mentorLocal?.image || user1?.result?.image}
            alt="Juaneme8"
          >
            {mentorLocal?.name.charAt(0) || user1?.result?.name.charAt(0)}{" "}
          </Avatar>
          <div className={styles.profile__text}>
            <h4>{mentorLocal?.name || user1?.result?.name}</h4>
            <p>{mentorLocal?.email || user1?.result?.email}</p>
          </div>
          <Link to={`${mentorLocal?._id ? "/addMentor" : "/auth"}`}>
            <IconButton
              onClick={() =>
                setCurrentId(mentorLocal?._id || user1?.result?._id)
              }
              className={styles.edit__wrapper}
            >
              <Edit className={styles.edit} />
            </IconButton>
          </Link>
        </div>
      </div>

      <div className={styles.mentees__container}>
        <div className={styles.mentees__header}>
          <h3>{mentorLocal?._id ? "Mentees" : "Mentors"}</h3>
        </div>
        {!mentor._id ? (
          <div className={styles.mentees__container}>
            {isLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress />
              </Box>
            ) : (
              myMentors?.length > 0 &&
              myMentors?.map((mentor) => (
                <MenteeCard
                  id={mentor._id}
                  email={mentor.email}
                  key={mentor._id}
                  name={mentor.name}
                  image={mentor.image}
                />
              ))
            )}
            {myMentors?.length < 0 && (
              <div className={styles.noData}>No Mentor found</div>
            )}
          </div>
        ) : (
          <div className={styles.mentees__container}>
            {isLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress />
              </Box>
            ) : (
              mentees.length > 0 &&
              mentees.map((mentee) => (
                <MenteeCard
                  id={mentee._id}
                  email={mentee.email}
                  key={mentee._id}
                  name={mentee.name}
                  image={mentee.image}
                />
              ))
            )}
            {mentees.length < 0 && (
              <div className={styles.noData}>
                {mentorLocal?._id ? "No Mentees" : "No Mentors"}{" "}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
