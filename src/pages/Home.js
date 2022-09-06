import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMentors } from "../actions/mentors";
import { Footer, HeroBanner, MentorCard, Navbar, TopMentor } from "../components";

import styles from "../styles/Home.module.css";

const Home = () => {
  const dispatch = useDispatch();

  const { mentors, isLoading, error} = useSelector((state) => state.mentors);
  // const {user } = useSelector((state) => state.auth);
  const feeds = mentors.slice().sort((a, b) => b.createdAt.localeCompare(a.createdAt))

  useEffect(() => {
    dispatch(fetchMentors());
  }, [dispatch]);

  return (
    <div className={styles.home}>
      <Navbar />
      <div className={styles.herobanner}>
        <HeroBanner />
      </div>
      <div className={styles.topMentor__top}>
          <h4>Top Mentors</h4>
          <Button className={styles.seeMore}>See more</Button>
        </div>
      {/* <div className={styles.topMento}> */}
      
        <div className={styles.topMentor__flex}>
        <TopMentor name='Mensah Bonsu' course='Computing' image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKnGbOcMLTWhdyl_DYvTz_98vonN2MXm_YDA&usqp=CAU' />
          <TopMentor name='Daniel Kofi' course='Parenting' image='https://34co0u35pfyt37c0y0457xcu-wpengine.netdna-ssl.com/wp-content/uploads/2019/12/iStock-1091719880-1-1-1-1.jpg' />
          <TopMentor name='Walahi Alhaji' course='Self Development' image='https://cdn.ceoworld.biz/wp-content/uploads/2021/07/kevin-davis-1.jpg' />
          <TopMentor name='Fon Man' course='Mentorship' image='https://static.wixstatic.com/media/49eacb_bf0e16d484714797ab5f7d0126ae55c9~mv2.jpg/v1/fill/w_450,h_450,al_c,q_90/49eacb_bf0e16d484714797ab5f7d0126ae55c9~mv2.jpg' />
          <TopMentor name='Kofi Kwadwo' course='Science' image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsAB7kXPhX4SwR_pQxa1Xtc16asVBvzQzUGA&usqp=CAU' />
          <TopMentor name='Yeli Jane' course='Business Intelligence' image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3_1z72UJD8ao06h83sT1Z5JisUmY4AIi_RQ&usqp=CAU' />
          

        </div>
      {/* </div> */}

      <div className={styles.mentors}>
        {feeds.map(mentor => (
                  <MentorCard key={mentor._id} program={mentor.fieldExp} name={mentor.fullName} image={mentor.image}/>
        ))}
       
         </div>
      <Footer />
    </div>
  );
};

export default Home;
