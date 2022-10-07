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
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/Auth.module.css";
import Go from "../images/Go.png";
import { signInWithPopup, GoogleAuthProvider } from "@firebase/auth";
import { auth } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { logWithGoogle, signin, signup, updateUser } from "../actions/auth";
import { useNavigate } from "react-router-dom";
import { useStateContex } from "../store/StateProvider";
import FileResizer from "react-image-file-resizer";

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
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState(true);
  const [formData, setFormData] = useState(initialState);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasSpace, setHasSpace] = useState(false);

  const userProf = JSON.parse(localStorage.getItem("profile"));
  const { isError } = useSelector((state) => state.auth);

  const { currentId } = useStateContex();

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

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const user = await signInWithPopup(auth, provider);

    const result = user.user;

    try {
      const loginData = {
        email: result.email,
        photoURL: result.photoURL,
        displayName: result.displayName,
      };
      dispatch(logWithGoogle(loginData, navigate));
      setLoading(true);
    } catch (error) {
      return error;
    }
  };

  let inputFileRef = useRef(null);
  const selectImg = (e) => {
    e.preventDefault();
    inputFileRef.click();
  };

  const saveChanges = () => {
    dispatch(updateUser(currentId, { ...formData, image }, navigate));
    setImage(null);
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
    if (user1) {
      setFormData({
        ...user1,
        confirmPassword: user1.password,
        name: user1.name,
      });
      setImage({ image: user1.image || user1.mentorshipDp });
    }

    if (userProf?.result?._id) setLoading(false);
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

  const SimpleDialog = (props) => {
    const { open } = props;
    return (
      <Dialog open={open}>
        <Box
          className={styles.loadingState}
          sx={{
            display: "flex",
            borderRadius: "100px",
            justifyContent: "center",
            bgcolor: "pink",
          }}
        >
          <CircularProgress />
        </Box>
      </Dialog>
    );
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
    !formData?.email?.length > 0 ||
    !formData?.email?.trim() ||
    !formData?.password?.length > 0 ||
    !formData?.password?.trim() ||
    (!user &&
      (!formData?.lastName?.length > 0 ||
        !formData?.firstName?.length > 0 ||
        !formData?.confirmPassword)) ||
    hasSpace ||
    doesMatch;

  const isUserError = isError?.response?.data?.type === "msg";
  const userError = isError?.response?.data?.message;

  return (
    <div className={styles.auth}>
      <SimpleDialog open={loading} />
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
              {(!user || currentId) && (
                <div className={styles.select__image}>
                  {!image?.length && (
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
                  {!!image?.length && (
                    <>
                      <IconButton
                        onClick={clearImg}
                        className={styles.cancelImage}
                      >
                        <Clear className={styles.cancelIcon} />
                      </IconButton>
                      <img
                        className={styles.selectedImage}
                        src={image}
                        alt=""
                      />
                    </>
                  )}
                </div>
              )}
              {isError?.message && (
                <div className={styles.error}>
                  <p> {isUserError ? userError : "Something went wrong"}</p>
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
                <>
                <Box
                  id={styles.auth_inputBox}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                 
                  <TextField
                    onChange={handleChange}
                    id={styles.auth_input}
                    required
                    variant="outlined"
                    value={formData.name}
                    className={styles.auth_input}
                    name="name"
                  />
                </Box>

                <Box
                  id={styles.auth_inputBox}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  
                  <TextField
                    onChange={handleChange}
                    id={styles.auth_input}
                    label='Department'
                    variant="outlined"
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
            <FormControl sx={{ m: 1 }} className={styles.edu_inputWrapper}>
              <InputLabel id="demo-controlled-open-select-labeloo">
                Rationale for Mentorship
              </InputLabel>
              <Select
                labelId="demo-controlled-open-select-labeluu"
                id="demo-controlled-open-select22"
                open={openRa}
                onClose={handleClose}
                onOpen={ handleOpen}
                name="rationale"
                variant="outlined"
                label="Rationale for Mentorship "
                fullWidth
                value={formData.rationale}
                onChange={handleChange}
              >
                <MenuItem value=" Time management ">Time management</MenuItem>
                <MenuItem value="Career guidance">Career guidance</MenuItem>
                <MenuItem value="Relationship">Relationship</MenuItem>
                <MenuItem value="Religious change ">Religious change </MenuItem>
                <MenuItem value="Academics">Academics</MenuItem>
              </Select>
            </FormControl>
          </div>
        </Box>
                </>
              )}




              <Box
                id={styles.auth_inputBox}
                sx={{ display: "flex", alignItems: "center" }}
              >
               {!currentId && (
                 <AlternateEmail
                 sx={{ color: "action.active", mr: 1, my: 0.5 }}
               />
               )}
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
              sx={{
                display: "flex",
                alignItems: "center",
                position: "relative",
              }}
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
                error={passError}
                helperText={
                  passError
                    ? "Password must be at least 6 characters long"
                    : null
                }
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
                error={!!doesMatch}
                helperText={doesMatch ? "Password does not match." : null}
              />
            </Box>
          )}
        </form>

        {currentId && (
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
        {!currentId && (
          <>
            <p className={styles.terms}>
              By signing up your`re agree to our <span>Terms & Conditions</span>{" "}
              and <span>Privacy Policy</span>
            </p>

            <Button
              disabled={disableBtn}
              className={`${styles.signIn__button} ${
                disableBtn && styles.disableBtn
              }`}
              onClick={handleSubmit}
            >
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
              {!user ? "Joined us before?" : "New to Rabbichat?"}

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
