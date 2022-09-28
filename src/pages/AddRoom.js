import {
    ArrowBack,
    Clear,
  } from "@mui/icons-material";
  import {
    Box,
    Button,
    IconButton,
    TextField,
  } from "@mui/material";
  
  import React, { useRef, useState } from "react";
  import { Image } from "react-bootstrap-icons";
  import { useDispatch } from "react-redux";
  import { useNavigate } from "react-router-dom";
  import Resizer from "react-image-file-resizer";
  import styles from "../styles/CreateMentor.module.css";
import { createRoom } from "../actions/chatRooms";
  
  const initialState = {
    groupName: "",
  };
  
  const AddRoom = () => {
    const user = JSON.parse(localStorage.getItem("profile"));
    const [formData, setFormData] = useState(initialState);
    const [image, setImage] = useState(null);
  
    let inputFileRef = useRef(null);
    const selectImg = (e) => {
      e.preventDefault();
      inputFileRef.click();
    };
  
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const clearImg = () => {
      setImage(null);
    };
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleImage = (e) => {
      const file = e.target.files[0];
      Resizer.imageFileResizer(
        file,
        700,
        770,
        "JPEG",
        92,
        0,
        (uri) => {
          setImage(uri);
        },
        "base64"
      );
  
      if (file["type"].split("/")[0] !== "image") {
        alert("Hehehe 😆 file is not an image");
      }

    };
  
    const disableBtn =
      !formData.groupName.length > 0 ||
      !formData.groupName.trim() 
  
    const handleSubmit = async (e) => {
      e.preventDefault();

      dispatch(
        createRoom({
          ...formData,
          mentorId: user.result._id,
          image: image,
        })
      );
      navigate("/");
    };
  
    return (
      <div className={styles.createMentor}>
        <div className={styles.createMentor__top}>
          <ArrowBack onClick={() => navigate(-1)} className={styles.arrowBack} />
          <p>Create an Group</p>
        </div>
        <div className={styles.title}>
          <p>Fill the Form</p>
        </div>
  
        <form className={`${styles.form} ${styles.addRoom__form}`}>
          <input
            multiple
            onChange={handleImage}
            ref={(input) => (inputFileRef = input)}
            style={{ display: "none" }}
            type="file"
          />
          <div className={styles.select__image}>
            {!image && (
              <>
                <p>Group Icon</p>
                <IconButton
                  onClick={selectImg}
                  className={styles.imageIcon__wrapper}
                >
                  <Image className={styles.imageIcon} />
                </IconButton>
              </>
            )}
            {image && (
              <>
                <IconButton onClick={clearImg} className={styles.cancelImage}>
                  <Clear className={styles.cancelIcon} />
                </IconButton>
                <img className={styles.selectedImage} src={image} alt="" />
              </>
            )}
          </div>
          {/* {user && ( */}
            <Box
              id={styles.auth_inputBox}
              sx={{ display: "flex", alignItems: "center" }}
              fullWidth={true}
            >
              <TextField
                onChange={handleChange}
                fullWidth={true}
                id={styles.auth_input}
                required
                label="Group Name"
                variant="outlined"
                className={styles.auth_input}
                value={formData.groupName}
                name="groupName"
              />
            </Box>

          <Button
            onClick={handleSubmit}
            disabled={disableBtn}
            className={`${styles.createBtn} ${disableBtn && styles.disableBtn}`}
          >
            Create
          </Button>
        </form>
      </div>
    );
  };
  
  export default AddRoom;