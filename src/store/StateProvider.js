import React, { createContext, useContext, useEffect, useState } from "react";
// Prepares the data layer
export const StateContext = createContext();

//wrap our app and provide the Data layer
export const StateProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
 
  const [ replyingTo, setReplyingTo] = useState(false);
  const [ focus, setFocus] = useState(false);

  const currentTheme = localStorage.getItem("currentTheme");

  useEffect(() => {
    if (currentTheme === "dark") {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, []);

  const setMode = (e) => {
    setDarkMode(e.target.checked);
  
  };

  return (
    <StateContext.Provider
      value={{
        darkMode,
        focus,
        replyingTo,
        setReplyingTo,
        setMode,
        setFocus,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

//Pull information from the data layer
export const useStateContex = () => useContext(StateContext);
