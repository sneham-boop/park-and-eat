import React, { useState, createContext, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const authContext = createContext();

export default function AuthProvider(props) {
  const { getLocalStorage, setLocalStorage } = useLocalStorage();
  const [auth, setAuth] = useState(false);

  const login = () => {
    setAuth(true);
    setLocalStorage("auth", true);
  };

  const logout = () => {
    setAuth(false);
    setLocalStorage("auth", false);
  };

  useEffect(() => {
    setAuth(getLocalStorage("auth", false));
  }, [getLocalStorage]);

  const data = { auth, login, logout };

  return (
    <authContext.Provider value={data}>{props.children}</authContext.Provider>
  );
}
