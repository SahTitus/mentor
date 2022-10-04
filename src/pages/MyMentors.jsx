import { Footer, Navbar } from "../components";
import styles from "../styles/MyMentors.module.css";
import React, { useEffect } from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import MenteeCard from "../components/MenteeCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, fetchUser } from "../actions/auth";
import { fetchMentor, fetchMentors } from "../actions/mentors";
import { Link, useNavigate } from "react-router-dom";

const MyMentors = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mentorLocal = JSON.parse(localStorage.getItem("mentor"));

  const user1 = JSON.parse(localStorage.getItem("profile"));

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
  }, [dispatch, mentorLocal?._id]);

  useEffect(() => {
    dispatch(fetchUser(user1?.result?._id));
  }, [dispatch, user1?.result?._id]);

  return (
    <div className={styles.myMentors}>
      <Navbar />
      <div className={styles.myMentors__container}>
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
                />
              ))
            )}
            {!myMentors?.length > 0 && !isLoading && (
              <div className={styles.noData}>
                <p>No Mentor found</p>

                <Link to="/">
                  <Button className={styles.exploreBtn}>Explore mentors</Button>
                </Link>
              </div>
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
                />
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
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyMentors;
