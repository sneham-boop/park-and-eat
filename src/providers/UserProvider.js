import React, { useState, createContext } from "react";

export const userContext = createContext();

export default function UserProvider(props) {
  const [user, setUser] = useState({
    firstname: "Sneha",
    lastname: "Mahajan",
    userID: "sneha",
    password: "password",
  });

  const data = { user };
  return (
    <userContext.Provider value={data}>{props.children}</userContext.Provider>
  );
}
