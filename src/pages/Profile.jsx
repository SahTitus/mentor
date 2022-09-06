// import { faCommentDots } from "@fortawesome/free-regular-svg-icons";
// import { faShare } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Add, ArrowBack, Edit } from "@mui/icons-material";
import React, { useState } from "react";
import "../styles/Profile.css";
import { Tab, Tabs, Avatar } from "@mui/material";
// import SwipeableViews from "react-swipeable-views";
import { useNavigate } from "react-router-dom";
import { Circle } from "@mui/icons-material";
// import { makeStyles } from "@mui/styles";

// const useStyles = makeStyles((theme) => ({
// 	tab: {
// 		marginLeft: "1px",
// 	},
// 	tabL: {
// 		marginLeft: "10px",
// 	},
// 	/// show footer at the top
// 	showAtTop: {
// 		position: "",
// 		top: "",
// 		zIndex: "10",
// 		display: "flex",
// 		justifyContent: "space-between",
// 		width: "100%",
// 		boxShadow: "0px 5px 3px -5px rgba(0, 0, 0, 0.3)",
// 		backgroundColor: "white",
// 	},
// }));

const Profile = () => {
  const [user, setUser] = useState(false);

  const [value, setValue] = useState(0);

  const navigate = useNavigate();

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className="profile">
      <div className="profile__header">
        <ArrowBack onClick={() => navigate(-1)} />
      </div>
      <div className="profile__card">
        <Avatar className="profile__avatar" />

        <div className="profile__cardInfo">
          <h4>Champion Bon</h4>
          <p className="profile__cardInfoFollow">
            <span className="followers">210 followers</span>
            <Circle className="bullet" />
            <span className="following">20 Connections</span>
          </p>
        </div>
        {user ? (
          <div user className="profile__cardButtons">
            <button>
              <Edit className="profile__cardButton" />
              Edit Profile
            </button>
            <button>Share</button>
          </div>
        ) : (
          <div className="profile__cardButtons">
            <button>
              <Add className="profile__cardButton" />
              Follow
            </button>
            <button>Chat</button>
          </div>
        )}
      </div>

      <div className="profile__tabs">
        <Tabs
          value={value}
          onChange={handleChange}
          scrollable="true"
          indicatorColor="primary"
          textColor="primary"
          className="profile__tabs1"
          variant="fullWidth"
          selectionFollowsFocus
        >
          <Tab label="Mentees" value={0} className={""} />
          {/* <Tab label="Comments" value={1} className={""} />
          <Tab label="Answers" value={2} className={""} />
          <Tab label="Questions" value={3} className={""} />
          <Tab label="Groups" value={4} className={""} /> */}
        </Tabs>
        {/* <SwipeableViews index={value} onChangeIndex={handleChangeIndex}> */}
        <div className="profile__tab">
          <p>Users posts </p>
        </div>
        {/* <div className="profile__tab">
          <h1>my users comments here</h1>
        </div>
        <div className="profile__tab">
          <h1>my users answers here</h1>
        </div>
        <div className="profile__tab">
          <p>Users questions</p>
        </div>
        <div className="profile__tab">
          <p>Users groups joined</p>
        </div> */}
        {/* </SwipeableViews> */}
      </div>
    </div>
  );
};

export default Profile;
