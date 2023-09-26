import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, IconButton, TextField } from "@mui/material";
import React, { useState } from "react";
import styles from "../styles/Register.module.css";

const initialState = {
  accountType: "",
  email: "",
  password: "",
};

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [signin, setUSignIn] = useState(true);
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSelectAcType = (option) => {
    setFormData({ ...formData, accountType: option });
  };

  const farmerSelected = formData.accountType === "farmer";
  const investorSelected = formData.accountType === "investor";

  return (
    <div className={styles.auth}>
      <div className={styles.form__container}>
        <div className={styles.heading}>
          <h2>{!signin ? "Sign up" : "Sign in"}</h2>
        </div>
        <form className={styles.form}>
          {!signin && (
            <div className={styles.ac__type}>
              <p>Account Type</p>

              <div className={styles.button__wrapper}>
                <Button
                  className={`${farmerSelected && styles.selected}`}
                  onClick={() => handleSelectAcType("farmer")}
                  type="button"
                >
                  Farmer
                </Button>
                <Button
                  className={`${investorSelected && styles.selected}`}
                  onClick={() => handleSelectAcType("investor")}
                  type="button"
                >
                  Investor
                </Button>
              </div>
            </div>
          )}

          <Box
            id={styles.auth_inputBox}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <TextField
              onChange={handleChange}
              id={styles.auth_input}
              required
              label="Email"
              name="email"
              value={formData.email}
              variant="outlined"
              className={styles.auth_input}
            />
          </Box>

          <Box
            id={styles.auth_inputBox}
            sx={{
              display: "flex",
              alignItems: "center",
              position: "relative",
            }}
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
            />
            <IconButton
              className={styles.showPassword}
              onClick={toggleShowPassword}
            >
              {!showPassword ? (
                <Visibility className={styles.showPasswordIcon} />
              ) : (
                <VisibilityOff className={styles.showPasswordIcon} />
              )}
            </IconButton>
          </Box>
        </form>

  <div className={styles.login__btnWrapper}>
  <Button className={`${styles.signIn__button} `}>
          {signin ? "Sign In" : "Create Account"}
        </Button>
  </div>
      </div>

      <p className={styles.login__newUser}>
        {!signin ? "Joined us before?" : "Don't have an account?"}

        <span onClick={() => setUSignIn((prevState) => !prevState)}>
          {!signin ? "Sign In" : "Sign Up"}
        </span>
      </p>
    </div>
  );
};

export default Register;
