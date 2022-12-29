import React, { useState, createContext, useEffect, useContext } from "react";
import { authContext } from "./AuthProvider";
export const userContext = createContext();

export default function UserProvider(props) {
  const [user, setUser] = useState(null);

  const { auth } = useContext(authContext);

  useEffect(() => {
    if (auth)
      setUser({
        firstname: "Sneha",
        lastname: "Mahajan",
        userID: "sneha",
        password: "password",
      });
    else setUser(null);
  }, [auth]);

  const data = { user };
  return (
    <userContext.Provider value={data}>{props.children}</userContext.Provider>
  );
}
