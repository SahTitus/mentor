import { Button } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchMentors } from "../actions/mentors";
import {
  Footer,
  HeroBanner,
  MentorCard,
  Navbar,
  TopMentor,
} from "../components";

import styles from "../styles/Home.module.css";

const Home = () => {
  const dispatch = useDispatch();

  const { mentors } = useSelector((state) => state.mentors);
  const feeds = mentors
    .slice()
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

 
    const topMentors = mentors
    ?.slice()
    .sort(
      (a, b) => parseFloat(b?.mentees.length) - parseFloat(a?.mentees.length)
    );

  useEffect(() => {
    dispatch(fetchMentors());
  }, [dispatch]);

  const scrollRef = useRef();

  const learnMore = () => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={styles.home}>
      <Navbar />
      <div className={styles.herobanner}>
        <HeroBanner scroll={learnMore} />
      </div>
      <div className={styles.topMentor__top}>
        <h4>Top Mentors</h4>
        <Link to="/seemore">
          <Button className={styles.seeMore}>See more</Button>
        </Link>
      </div>

      <div ref={scrollRef} />
      <div className={styles.topMentor__flex}>
      
   {
    topMentors?.slice(0, 5).map(mentor => (
      <TopMentor
      key={mentor._id	}
      name={mentor.name}
      course={mentor.fieldExp}
      image={mentor.image}
      myMentorId={mentor?._id}
      id={mentor?.userId}
      pendingMentees={mentor?.pendingMentees}
      connectedMentees={mentor?.mentees}
    />
    ))
   }
        
      </div>
      {/* </div> */}

      <div className={styles.mentors}>
        {feeds.map((mentor) => (
          <MentorCard
            myMentorId={mentor?._id}
            id={mentor?.userId}
            key={mentor?._id}
            program={mentor?.fieldExp}
            name={mentor?.name}
            image={mentor?.image}
            pendingMentees={mentor?.pendingMentees}
            connectedMentees={mentor?.mentees}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
