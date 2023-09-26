import { ArrowBack } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "../styles/Auth.module.css";

import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../actions/auth";
import { useNavigate } from "react-router-dom";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  department: "",
  age: "",
  religion: "",
  program: "",
  rationale: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const [formData, setFormData] = useState(initialState);

  const user = JSON.parse(localStorage.getItem("profile"));
  const { isError } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [openRa, setOpenRa] = useState(false);

  const handleClose = () => {
    setOpenRa(false);
  };

  const handleOpen = () => {
    setOpenRa(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const saveChanges = () => {
    dispatch(updateUser(user?.result?._id, { ...formData, image:user?.result?.image }, navigate));
  };


  function hasWhiteSpace(s) {
    return s.indexOf(" ") >= 0;
  }

  const disableBtn =
    !formData?.department?.length > 0 ||
    !formData?.department?.trim() ||
    !formData?.program?.length > 0 ||
    !formData?.program?.trim() ||
    !formData?.rationale?.length > 0 ||
    !formData?.rationale?.trim() ||
    !formData?.age?.length > 0 ||
    !formData?.age?.trim() ||
    isNaN(+formData.age) ||
    hasWhiteSpace(formData.age);

  const isUserError = isError?.response?.data?.type === "msg";
  const userError = isError?.response?.data?.message;


  useEffect(() => {
    if (user?.result?._id) {
      setFormData({
        ...user?.result,
        name: user?.result?.name,
      });
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div className={styles.auth}>
      {user?.result?._id && (
        <div className={styles.createMentor__top}>
          <ArrowBack
            onClick={() => navigate(-1)}
            className={styles.arrowBack}
          />
        </div>
      )}
      <div className={styles.form__container}>
        <div className={styles.heading}>
          <h2>Become a Mentee</h2>
        </div>
        <form className={styles.form}>
          <>
            {isError?.message && (
              <div className={styles.error}>
                <p> {isUserError ? userError : "Something went wrong"}</p>
              </div>
            )}

            {user?.result?._id && (
              <>
                <Box
                  id={styles.auth_inputBox}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <TextField
                    onChange={handleChange}
                    id={styles.auth_input}
                    label="Department"
                    variant="outlined"
                    required
                    value={formData.department}
                    className={styles.auth_input}
                    name="department"
                  />
                </Box>
                <Box
                  id={styles.auth_inputBox}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <TextField
                    onChange={handleChange}
                    id={styles.auth_input}
                    label="Program"
                    required
                    variant="outlined"
                    value={formData.program}
                    className={styles.auth_input}
                    name="program"
                  />
                </Box>
                <Box
                  id={styles.auth_inputBox}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <TextField
                    onChange={handleChange}
                    id={styles.auth_input}
                    label="Age"
                    required
                    variant="outlined"
                    value={formData.age}
                    className={styles.auth_input}
                    name="age"
                  />
                </Box>

                <Box
                  id={styles.auth_inputBox}
                  sx={{ display: "flex", alignItems: "center" }}
                  className={styles.edu_inputBox}
                >
                  <div className={styles.edu_inputDiv}>
                    <FormControl
                      sx={{ m: 1 }}
                      className={styles.edu_inputWrapper}
                    >
                      <InputLabel id="demo-controlled-open-select-labeloo">
                        Rationale for Mentorship
                      </InputLabel>
                      <Select
                        labelId="demo-controlled-open-select-labeluu"
                        id="demo-controlled-open-select22"
                        open={openRa}
                        onClose={handleClose}
                        onOpen={handleOpen}
                        name="rationale"
                        variant="outlined"
                        label="Rationale for Mentorship "
                        fullWidth
                        required
                        value={formData.rationale}
                        onChange={handleChange}
                      >
                        <MenuItem value=" Time management ">
                          Time management
                        </MenuItem>
                        <MenuItem value="Career guidance">
                          Career guidance
                        </MenuItem>
                        <MenuItem value="Relationship">Relationship</MenuItem>
                        <MenuItem value="Religion">
                          Religion
                        </MenuItem>
                        <MenuItem value="Academics">Academics</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </Box>
              </>
            )}
          </>
        </form>

        {user?.result?._id && (
          <Button
            className={`${styles.signIn__button}  ${
              disableBtn && styles.disableBtn
            }`}
            onClick={saveChanges}
            disabled={disableBtn}
          >
            Save
          </Button>
        )}
      </div>
    </div>
  );
};

export default Auth;
