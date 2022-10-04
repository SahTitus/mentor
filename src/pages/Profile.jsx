import { ArrowBack, Edit } from "@mui/icons-material";
import React, { useEffect } from "react";
import styles from "../styles/Profile.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  IconButton,
} from "@mui/material";
import MenteeCard from "../components/MenteeCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, fetchUser } from "../actions/auth";
import { fetchMentor, fetchMentors } from "../actions/mentors";
import { useStateContex } from "../store/StateProvider";
import { CaretDownFill } from "react-bootstrap-icons";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const mentorLocal = JSON.parse(localStorage.getItem("mentor"));
  const user1 = JSON.parse(localStorage.getItem("profile"));
  const { setCurrentId } = useStateContex();
  const { mentors, mentor, isLoading } = useSelector((state) => state.mentors);
  const { users, user } = useSelector((state) => state.auth);
  const { id } = useParams();

  const profileId = id !== "1001";

  const menteesId = mentor?.mentees;

  const mentees = users?.filter((user) =>
    menteesId?.find((mentee) => (mentee === user._id ? user : null))
  );

  const myMentors = user?.mentors?.map((menId) =>
    mentors?.find((mentor1) => (mentor1._id === menId ? mentor1 : null))
  );

  const d = new Date();
  let dateB = d.toDateString(mentor.dbirth);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchMentors());
    if (profileId) {
      dispatch(fetchMentor(id));
    } else if (mentorLocal?._id) {
      dispatch(fetchMentor(mentorLocal?._id));
    }
  }, [dispatch]);

  useEffect(() => {
    if (!user1?.result?._id) navigate("/auth");
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
          {profileId ? (
            <Avatar
              className={styles.avatar}
              src={mentor?.image}
              alt="Juaneme8"
            >
              {mentor?.name?.charAt(0)}
            </Avatar>
          ) : (
            <Avatar
              className={styles.avatar}
              src={mentorLocal?.image || user1?.result?.image}
              alt="Juaneme8"
            >
              {mentorLocal?.name.charAt(0) || user1?.result?.name.charAt(0)}{" "}
            </Avatar>
          )}
          {profileId ? (
            <div className={styles.profile__text}>
              <h4>{mentor?.name}</h4>
              <p>{mentor?.email}</p>
            </div>
          ) : (
            <div className={styles.profile__text}>
              <h4>{mentorLocal?.name || user1?.result?.name}</h4>
              <p>{mentorLocal?.email || user1?.result?.email}</p>
            </div>
          )}
          {!profileId && (
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
          )}
        </div>
      </div>

      {profileId ? (
        <div className={styles.mentorDetails}>
          <p>
            Field of Expertise <CaretDownFill className={styles.caretIcon} />{" "}
            <span>{mentor.fieldExp}</span>
          </p>
          <p>
            Educational Level <CaretDownFill className={styles.caretIcon} />{" "}
            <span>{mentor.education}</span>
          </p>
          <p>
            School <CaretDownFill className={styles.caretIcon} />{" "}
            <span>{mentor.school}</span>
          </p>
          <p>
            Religion <CaretDownFill className={styles.caretIcon} />{" "}
            <span>{mentor.religion}</span>
          </p>
          <p>
            Date of Birth
            <CaretDownFill className={styles.caretIcon} /> <span>{dateB}</span>
          </p>
        </div>
      ) : (
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
              {!myMentors?.length > 0 && !isLoading && (
                <div className={styles.noData}>
                  <p>No Mentor found</p>

                  <Link to="/">
                    <Button className={styles.exploreBtn}>
                      Explore mentors
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className={styles.mentees__container}>
              {isLoading && !mentees.length > 0 ? (
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
      )}
    </div>
  );
};

export default Profile;
