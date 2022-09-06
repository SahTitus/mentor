import React from 'react'
import { Footer, Navbar } from '../components'
import MenteeCard from '../components/MenteeCard'
import styles from "../styles/MyMentors.module.css";

const MyMentors = () => {
  return (
    <div className={styles.myMentors}>
          <Navbar />
          <div className={styles.myMentors__container}>
        {/* MyMentors */}
        <MenteeCard />
        <MenteeCard />
        <MenteeCard />
        <MenteeCard />
        </div>
             <Footer />
    </div>
  )
}

export default MyMentors