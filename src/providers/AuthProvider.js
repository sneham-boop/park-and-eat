import React, { useState, createContext, useEffect } from "react";

export const authContext = createContext();

export default function AuthProvider(props) {
  const [auth, setAuth] = useState(false);

  // Default state change to authenticated prior to backend setup.
  useEffect(() => {
    setAuth(true);
  }, []);

  const login = () => {
    setAuth(true);
  }

  const logout = () => {
    setAuth(false);
  }

  const data = { auth, login, logout };

  return (
    <authContext.Provider value={data}>{props.children}</authContext.Provider>
  );
}
