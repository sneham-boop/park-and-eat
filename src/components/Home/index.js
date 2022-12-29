import React, { useContext } from "react";
import Map from "../Map";
import "./Home.scss";
import { userContext } from "../../providers/UserProvider";

export default function Home() {
  const { user } = useContext(userContext);
  return (
    <section className="home">
      {user ? (
        <h3>Welcome, {user.firstname}!</h3>
      ) : (
        <h3>Welcome! Please log in to continue.</h3>
      )}
      <Map />
    </section>
  );
}
