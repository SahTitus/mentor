import { ArrowBack, Search } from "@mui/icons-material";
import { Box, CircularProgress, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchMentorsBySearch } from "../actions/mentors";
import { MentorCard } from "../components";
import { error } from "../redux/messages";
import { useStateContex } from "../store/StateProvider";

import styles from "../styles/SearchPage.module.css";
const SearchPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { getSearchTerm } = useStateContex();

  const searchMentor = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      dispatch(fetchMentorsBySearch(searchTerm));
    } else {
      navigate("/");
    }
  };

  const { queriedMentors, isLoading } = useSelector((state) => state.mentors);

  useEffect(() => {
    if (!!getSearchTerm.length) {
      setSearchTerm(getSearchTerm);
    }
  }, [dispatch, getSearchTerm]);

  return (
    <div className={styles.searchPage}>
      <div className={styles.topBar}>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBack className={styles.backIcon} />
        </IconButton>
        <form onSubmit={searchMentor} className={styles.banner__search}>
          <div className={styles.banner__searchContainer}>
            <input
              className={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              placeholder="Search for mentors..."
            />
            <div className={styles.searchBtn}>
              {" "}
              <Search onClick={searchMentor} className={styles.searchIcon} />
            </div>
          </div>
        </form>
      </div>

      <div className={styles.mentors}>
        {(error?.message && !isLoading) && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "50vh",
            }}
          >
            <p>Something went wrong</p>
          </Box>
        )}
        {(!error?.message && !isLoading && queriedMentors?.length===0) && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "50vh",
            }}
          >
            <h3>No result found</h3>
          </Box>
        )}
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "50vh",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          queriedMentors.map((mentor) => (
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
          ))
        )}
      </div>
    </div>
  );
};

export default SearchPage;
