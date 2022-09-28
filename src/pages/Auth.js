import {
  AlternateEmail,
  ArrowBack,
  Clear,
  Image,
  Lock,
  Person,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { Box, Button, IconButton, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/Auth.module.css";
import Go from "../images/Go.png";
import { signInWithPopup, GoogleAuthProvider } from "@firebase/auth";
import { auth } from "../firebase";
import { authData } from "../redux/auth";
import { useDispatch, useSelector } from "react-redux";
import { logWithGoogle, signin, signup, updateUser } from "../actions/auth";
import { useNavigate } from "react-router-dom";
import { useStateContex } from "../store/StateProvider";
import FileResizer from "react-image-file-resizer";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState(true);
  const [formData, setFormData] = useState(initialState);
  const [image, setImage] = useState(null);

  const userProf = JSON.parse(localStorage.getItem("profile"));

  const { currentId } = useStateContex();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const user = await signInWithPopup(auth, provider);
    const token = user._tokenResponse.idToken;
    const result = user.user;
    try {
      dispatch(logWithGoogle(result));
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  let inputFileRef = useRef(null);
  const selectImg = (e) => {
    e.preventDefault();
    inputFileRef.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      dispatch(signup({ ...formData, image: image }, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }
    setFormData({ ...formData, initialState: "" });
  };

  const user1 = useSelector((state) =>
    currentId ? state.auth.users.find((user) => user._id === currentId) : null
  );

  useEffect(() => {
    if (user1)
      setFormData({
        ...user1,
        confirmPassword: user1.password,
        name: user1.name,
        image: user1.image,
      });
  }, []);

  const handleImage = (e) => {
    const file = e.target.files[0];
    FileResizer.imageFileResizer(
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

  const clearImg = () => {
    setImage(null);
  };

  return (
    <div className={styles.auth}>
      {currentId && (
        <div className={styles.createMentor__top}>
          <ArrowBack
            onClick={() => navigate(-1)}
            className={styles.arrowBack}
          />
        </div>
      )}
      <div className={styles.form__container}>
        <div className={styles.heading}>
          {" "}
          {currentId ? (
            <h2>Edit Profile</h2>
          ) : (
            <h2>{!user ? "Sign up" : "Sign in"}</h2>
          )}
        </div>
        <form className={styles.form}>
   {!userProf?.result?.uid && (
    <>
           <input
            multiple
            onChange={handleImage}
            ref={(input) => (inputFileRef = input)}
            style={{ display: "none" }}
            type="file"
          />
      {!user && (
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
      )}
          {!user && !currentId && (
            <Box
              id={styles.auth_inputBox}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Person sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                onChange={handleChange}
                id={styles.auth_input}
                required
                label="First name"
                variant="outlined"
                value={formData.firstName}
                className={styles.auth_input}
                name="firstName"
              />
            </Box>
          )}

          {!user && !currentId && (
            <Box
              id={styles.auth_inputBox}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Person sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                onChange={handleChange}
                id={styles.auth_input}
                required
                label="Last name"
                variant="outlined"
                className={styles.auth_input}
                name="lastName"
                value={formData.lastName}
              />
            </Box>
          )}

          {currentId && (
            <Box
              id={styles.auth_inputBox}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Person sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                onChange={handleChange}
                id={styles.auth_input}
                required
                label="Full Name"
                variant="outlined"
                value={formData.name}
                className={styles.auth_input}
                name="name"
              />
            </Box>
          )}
          <Box
            id={styles.auth_inputBox}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <AlternateEmail sx={{ color: "action.active", mr: 1, my: 0.5 }} />
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
    </>
   )}
          {!currentId && (
            <Box
              id={styles.auth_inputBox}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Lock sx={{ color: "action.active", mr: 1, my: 0.5 }} />
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
                  <VisibilityOff className="showPassword" />
                ) : (
                  <Visibility className="showPassword" />
                )}
              </IconButton>
            </Box>
          )}
          {!user && !currentId && (
            <Box
              id={styles.auth_inputBox}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Lock sx={{ color: "action.active", mr: 1, my: 0.5 }} />
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
              />
            </Box>
          )}
        </form>

        {currentId && (
          <Button
            className={styles.signIn__button}
            onClick={() =>
              dispatch(updateUser(currentId, { ...formData, image }, navigate))
            }
          >
            Save
          </Button>
        )}
        { !currentId && (
          <>
            <p className={styles.terms}>
              By signing up your`re agree to our <span>Terms & Conditions</span>{" "}
              and <span>Privacy Policy</span>
            </p>

            <Button className={styles.signIn__button} onClick={handleSubmit}>
              {user ? "Sign In" : "Sign Up"}
            </Button>
            <div className={styles.divider}>
              <hr />
              <p>or</p>
              <hr />
            </div>
            <Button
              className={styles.signInWithGoogle__button}
              onClick={signInWithGoogle}
            >
              <img className={styles.googleLogo} src={Go} alt="" />
              Continue with Google
            </Button>

            <p className={styles.login__newUser}>
              {!user ? "Joined us before?" : "New to Upay?"}
              <span onClick={() => setUser((prevState) => !prevState)}>
                {!user && !currentId ? "Sign In" : "Sign Up"}
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Auth;
