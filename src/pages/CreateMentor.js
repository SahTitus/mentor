/* eslint-disable react-hooks/exhaustive-deps */
import {
  ArrowBack,
  Clear,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";

import React, { useEffect, useRef, useState } from "react";
import { Image } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Resizer from "react-image-file-resizer";
import styles from "../styles/CreateMentor.module.css";
import { createMentor, updateMentor } from "../actions/mentors";
import { useStateContex } from "../store/StateProvider";

const initialState = {
  name: "",
  education: "",
  email: "",
  dbirth: "",
  school: "",
  fieldExp: "",
  religion: "",
  password: "",
  confirmPassword: "",
};

const CreateMentor = () => {
  const [showPassword, setShowPassword] = useState(false);
  const user = JSON.parse(localStorage.getItem("profile"));
  const mentor = JSON.parse(localStorage.getItem("mentor"));
  const [formData, setFormData] = useState(initialState);
  const [image, setImage] = useState(null);
  const [setHasSpace] = useState(false);

  const { currentId } = useStateContex();
  const { isError } = useSelector((state) => state.auth);

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

  const [openRel, setOpenRel] = useState(false);
  const [openEdu, setOpenEdu] = useState(false);
  const [openExp, setOpenExp] = useState(false);

  const handleClose = () => {
    setOpenEdu(false);
    setOpenExp(false);
    setOpenRel(false);
  };

  const handleOpen = (a, b, c) => {
    if (b === 'b') {
      setOpenEdu(true);
      setOpenRel(false);
      setOpenExp(false);
    } else if (a ==='a') {
      setOpenEdu(false);
      setOpenRel(true);
      setOpenExp(false);
    } else {
      setOpenEdu(false);
      setOpenExp(true);
      setOpenRel(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
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

  useEffect(() => {
    if (formData.password || formData.confirmPassword) {
      if (
        hasWhiteSpace(formData?.password) ||
        hasWhiteSpace(formData?.confirmPassword)
      ) {
        setHasSpace(true);
      }
    }
  }, []);

  function hasWhiteSpace(s) {
    return s.indexOf(" ") >= 0;
  }

  const passError =
    formData?.password?.length < 6 && !!formData?.password?.length;
  const doesMatch =
    formData?.password !== formData?.confirmPassword &&
    formData?.confirmPassword;

  const disableBtn =
    !formData.name.length > 0 ||
    !formData.name.trim() ||
    !formData.email.length > 0 ||
    !formData.email.trim() ||
    !formData.password.length > 0 ||
    !formData.password.trim() ||
    !formData.confirmPassword.length > 0 ||
    !formData.confirmPassword.trim() ||
    !formData.fieldExp.length > 0 ||
    !formData.fieldExp.trim() ||
    !formData.school.length > 0 ||
    !formData.school.trim() ||
    !formData.education.length > 0 ||
    !formData.education.trim() ||
    !formData.religion.length > 0 ||
    !formData.dbirth.length > 0 ||
    doesMatch;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(
        updateMentor(mentor?._id, {
          ...formData,
          image: image,
        })
      );
      navigate("/profile/1001");
    } else {
      dispatch(
        createMentor({
          ...formData,
          mentor: true,
          id: user?.result?._id,
          image: image,
        })
      );
      navigate("/");
    }
  };

  useEffect(() => {
    if (mentor) {
      setImage(mentor.image);
      setFormData({ ...mentor, confirmPassword: mentor.password });
    }
  }, []);

  const isUserError = isError?.response?.data?.type === "msg";
  const userError = isError?.response?.data?.message;

  return (
    <div className={styles.createMentor}>
      <div className={styles.createMentor__top}>
        <ArrowBack onClick={() => navigate(-1)} className={styles.arrowBack} />
        {currentId ? <p>Edit Profile</p> : <p>Become a Mentor</p>}
      </div>
      <div className={styles.title}>
        {currentId ? null : <p>Create Mentor's Account</p>}
      </div>

      <form className={styles.form}>
        {isError?.message && !user?.result?._id && (
          <div className={styles.error}>
            <p> {isUserError ? userError : "Something went wrong"}</p>
          </div>
        )}
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
              <p>Upload cover image</p>
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
        {user && (
          <Box
            id={styles.auth_inputBox}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <TextField
              onChange={handleChange}
              id={styles.auth_input}
              required
              label="Email"
              variant="outlined"
              className={styles.auth_input}
              value={formData.email}
              name="email"
            />
          </Box>
        )}

        {user && (
          <Box
            id={styles.auth_inputBox}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <TextField
              onChange={handleChange}
              id={styles.auth_input}
              required
              label="Full Name"
              variant="outlined"
              className={styles.auth_input}
              name="name"
              value={formData.name}
            />
          </Box>
        )}

        <div className={styles.halve__inputs}>
          <Box
            id={styles.auth_inputBox}
            sx={{ display: "flex", alignItems: "center" }}
            className={styles.reli__inputbox}
            fullWidth={true}
          >
            <div className={styles.reli__inputdiv}>
              <FormControl sx={{ m: 1 }} className={styles.reli__inputwrapper}>
                <InputLabel id="demo-controlled-open-select-label">
                  Religion
                </InputLabel>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  open={openRel}
                  onClose={handleClose}
                  onOpen={() => handleOpen("a")}
                  name="religion"
                  label="Religion"
                  onChange={handleChange}
                  value={formData.religion}
                >
                  <MenuItem value="Christianity">Christianity</MenuItem>
                  <MenuItem value="Islamic">Islamic</MenuItem>
                  <MenuItem value="Others">Others</MenuItem>
                </Select>
              </FormControl>
            </div>
          </Box>
          <Stack noValidate>
            <TextField
              id="date"
              label="Birthday"
              type="date"
              name="dbirth"
              value={formData.dbirth}
              onChange={handleChange}
              className={styles.date__input}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Stack>
        </div>

        <Box
          id={styles.auth_inputBox}
          sx={{ display: "flex", alignItems: "center" }}
          className={styles.edu_inputBox}
        >
          <div className={styles.edu_inputDiv}>
            <FormControl sx={{ m: 1 }} className={styles.edu_inputWrapper}>
              <InputLabel id="demo-controlled-open-select-labeloo">
                Field of Expertise
              </InputLabel>
              <Select
                labelId="demo-controlled-open-select-labeluu"
                id="demo-controlled-open-select22"
                open={openExp}
                onClose={handleClose}
                onOpen={() => handleOpen(" ", " ", "c")}
                name="fieldExp"
                variant="outlined"
                label="Field(s) of Expertise "
                fullWidth
                value={formData.fieldExp}
                onChange={handleChange}
              >
                <MenuItem value=" Time management ">Time management</MenuItem>
                <MenuItem value="Career guidance">Career guidance</MenuItem>
                <MenuItem value="Relationship">Relationship</MenuItem>
                <MenuItem value="Religion ">Religion </MenuItem>
                <MenuItem value="Academics">Academics</MenuItem>
              </Select>
            </FormControl>
          </div>
        </Box>

        <Box
          id={styles.auth_inputBox}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <TextField
            onChange={handleChange}
            id={styles.auth_input}
            required
            label="School"
            name="school"
            value={formData.school}
            variant="outlined"
            className={styles.auth_input}
          />
        </Box>
        <Box
          id={styles.auth_inputBox}
          sx={{ display: "flex", alignItems: "center" }}
          className={styles.edu_inputBox}
        >
          <div className={styles.edu_inputDiv}>
            <FormControl sx={{ m: 1 }} className={styles.edu_inputWrapper}>
              <InputLabel id="demo-controlled-open-select-label">
                Educational Level
              </InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={openEdu}
                onClose={handleClose}
                onOpen={() => handleOpen(" ", "b", " ")}
                name="education"
                value={formData.education}
                label="Educational Level"
                onChange={handleChange}
              >
                <MenuItem value="Degree Holder">Degree Holder</MenuItem>
                <MenuItem value="Masters">Masters</MenuItem>
                <MenuItem value="PhD ">PhD </MenuItem>
                <MenuItem value="Professor">Professor</MenuItem>
              </Select>
            </FormControl>
          </div>
        </Box>
        <div className={styles.halve__inputs}>
          {!currentId && (
            <Box
              id={styles.auth_inputBox}
              sx={{ display: "flex", alignItems: "center", margin: "10px" }}
              className={styles.password__inputs}
            >
              <TextField
                onChange={handleChange}
                id={styles.auth_input}
                className={styles.auth_input}
                required
                label="Password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                name="password"
                value={formData.password}
                error={passError}
                helperText={
                  passError
                    ? "Password must be at least 6 characters long"
                    : null
                }
              />
              <IconButton
                className={`${styles.showPassword} ${styles.passError}`}
                onClick={toggleShowPassword}
              >
                {!showPassword ? (
                  <VisibilityOff className={styles.showPasswordIcon} />
                ) : (
                  <Visibility className={styles.showPasswordIcon} />
                )}
              </IconButton>
            </Box>
          )}
          {user?.result?._id && !currentId && (
            <Box
              id={styles.auth_inputBox}
              sx={{ display: "flex", alignItems: "center", margin: "10px" }}
            >
              <TextField
                onChange={handleChange}
                className={styles.auth_input}
                id={styles.auth_input}
                required
                type={showPassword ? "text" : "password"}
                label="Confirm password"
                name="confirmPassword"
                value={formData.confirmPassword}
                variant="outlined"
                error={!!doesMatch}
                helperText={doesMatch ? "Password does not match." : null}
              />
            </Box>
          )}
        </div>
        <Button
          onClick={handleSubmit}
          disabled={disableBtn}
          className={`${styles.createBtn} ${disableBtn && styles.disableBtn}`}
        >
          {currentId ? "Save" : " Create"}
        </Button>
      </form>
    </div>
  );
};

export default CreateMentor;
