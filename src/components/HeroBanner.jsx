import { Search } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";
import styles from "../styles/Herobanner.module.css";
import av from "../images/av.svg";

const Herobanner = ({scroll}) => {
  return (
    <div className={styles.herobanner}>
      <form className={styles.banner__search}>
        <div className={styles.banner__searchContainer}>
          <Search className={styles.searchIcon} />
          <input type="text" placeholder="Search for mentors..." />
        </div>
      </form>

      <div className={styles.main}>
        <div className={styles.hero__left}>
          <p>
            Get connect a +100k best Mentors and get solutions for problems.
          </p>
          <Button onClick={scroll}  className={styles.hero__button}>Learn More {`>>`}</Button>
        </div>
        {/* <div className={styles.hero__right}> */}
          <img src={av} alt="avatar" className={styles.avatarSvg} />
        {/* </div> */}
      </div>
    </div>
  );
};

export default Herobanner;
