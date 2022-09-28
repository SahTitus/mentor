import React, { createContext, useContext, useState } from "react";
// Prepares the data layer
export const StateContext = createContext();

//wrap our app and provide the Data layer
export const StateProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const [replyingTo, setReplyingTo] = useState(false);
  const [focus, setFocus] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [chatInfo, setChatInfo] = useState({});
  const [recipientId, setRecipientId] = useState(null);

  const setMode = (e) => {
    setDarkMode(e.target.checked);
  };

  return (
    <StateContext.Provider
      value={{
        darkMode,
        focus,
        replyingTo,
        chatInfo,
        recipientId,
        currentId,
     
        setCurrentId,
        setRecipientId,
        setChatInfo,
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
