/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [sendTo, setSendTo] = useState("");
  const [otp, setOtp] = useState("");
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const contextValue = {
    isLoading,
    setIsLoading,
    sendTo,
    setSendTo,
    credentials,
    setCredentials,
    otp,
    setOtp,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

// Custom hook for consuming the context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within an UserProvider");
  }
  return context;
};
