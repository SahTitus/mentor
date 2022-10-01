import { Search } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useState } from "react";
import styles from "../styles/Herobanner.module.css";
import av from "../images/av.svg";
import { useNavigate } from "react-router-dom";
import { useStateContex } from "../store/StateProvider";
import { useDispatch } from "react-redux";
import { fetchMentorsBySearch } from "../actions/mentors";

const Herobanner = ({ scroll }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setGetSearchTerm } = useStateContex();
  
const disableBtn = !searchTerm?.length > 0 ||
!searchTerm?.trim() 

const handleSubmit = (e) => {
  e.preventDefault();
if (!disableBtn) navigate(`/search?searchQuery=${searchTerm}`);
setGetSearchTerm(searchTerm)
dispatch(fetchMentorsBySearch(searchTerm));
}


  return (
    <div className={styles.herobanner}>
      <form onSubmit={handleSubmit} className={styles.banner__search}>
        <div className={styles.banner__searchContainer}>
          <Button disabled={disableBtn} type='button' onClick={handleSubmit}>
         
            <Search className={styles.searchIcon} />
          </Button>
          <input  value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}  type="text" placeholder="Search for mentors..." />
        </div>
      </form>

      <div className={styles.main}>
        <div className={styles.hero__left}>
          <p>
            Get connect a +100k best Mentors and get solutions for problems.
          </p>
          <Button onClick={scroll} className={styles.hero__button}>
            Learn More {`>>`}
          </Button>
        </div>
        {/* <div className={styles.hero__right}> */}
        <img src={av} alt="avatar" className={styles.avatarSvg} />
        {/* </div> */}
      </div>
    </div>
  );
};

export default Herobanner;
