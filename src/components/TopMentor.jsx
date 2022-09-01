import React from "react";
import styles from "../styles/TopMentor.module.css";

const TopMentor = ({name, course, image}) => {
  return (
    <div className={styles.topMentor}>
      <div className={styles.text}>
        {" "}
        <p className={styles.name}>{name}</p>
        <p className={styles.course}>{course}</p>
      </div>
<div className={styles.img__wrapper}>
<img
        className={styles.img}
        src={image}
        alt=""
      />
</div>
    </div>
  );
};

export default TopMentor;
