import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMentors } from "../actions/mentors";
import { Footer } from "../components";
import Navbar from "../components/Navbar";
import TopMentorCard from "../components/TopMentorCard";
import styles from "../styles/Notifications.module.css";

const SeeMore = () => {
  const dispatch = useDispatch();
  const { mentors } = useSelector((state) => state.mentors);

  const topMentors = mentors
    ?.slice()
    .sort(
      (a, b) => parseFloat(b?.mentees.length) - parseFloat(a?.mentees.length)
    );

  useEffect(() => {
    dispatch(fetchMentors());
  }, [dispatch]);

  return (
    <div className={styles.seeMore}>
      <Navbar />

      <div className={styles.topMentors__list}>
        <h3> Top Mentors</h3>

        {topMentors?.map((mentor) => (
          <TopMentorCard
            name={mentor.name}
            program={mentor.fieldExp}
            image={mentor.image}
            id={mentor.userId}
            mentorId={mentor.mentorId}
            requestId={mentor.requestId}
            key={mentor._id}
            myMentorId={mentor._id}
            connectedMentees={mentor?.mentees}
            pendingMentees={mentor?.pendingMentees}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default SeeMore;
