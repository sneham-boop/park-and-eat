import React, { useState, createContext } from "react";

export const authContext = createContext();

export default function AuthProvider(props) {
  const [auth, setAuth] = useState(true);
  const data = { auth };
  return (
    <authContext.Provider value={data}>{props.children}</authContext.Provider>
  );
}
