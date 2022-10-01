import { ArrowBack, DeleteForever } from "@mui/icons-material";
import { Box, CircularProgress, IconButton } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchNotifications } from "../actions/notifications";
import Notification from "../components/Notification";
import styles from "../styles/Notifications.module.css";

const Notifications = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("profile"));

  const { notifications, isLoading, error } = useSelector(
    (state) => state.notifications
  );

  const feeds = notifications
    ?.slice()
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  const id = user?.result?._id;
  useEffect(() => {
    dispatch(fetchNotifications(id));
  }, [dispatch]);

  return (
    <div className={styles.notifications}>
      <div className="arrowBack__navbar">
        <IconButton onClick={() => navigate(-1)} className={""}>
          <ArrowBack />
        </IconButton>
      </div>

      {!feeds.length > 0 ? (
        <div className={styles.emptyNot}>
          <DeleteForever className={styles.bin} />
          <p>Your notification box is empty</p>
        </div>
      ) : (
        <div className={`${styles.noti} ${error.message && styles.error}`}>
          {isLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <h3>Notifications</h3>
              {error.message ? (
                <p>Something went wrong</p>
              ) : (
                feeds.map((feed) => (
                  <Notification
                    name={feed.name}
                    image={feed?.image}
                    id={feed._id}
                    mentorId={feed.mentorId}
                    requestId={feed.requestId}
                    key={feed._id}
                    connected={feed.connected}
                  />
                ))
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Notifications;
