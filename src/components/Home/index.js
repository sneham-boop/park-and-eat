import React, { useContext } from "react";
import Map from "../Map";
import "./Home.scss";
import { userContext } from "../../providers/UserProvider";
// import Search from "../Search";

export default function Home() {
  const { user } = useContext(userContext);
  return (
    <section className="home">
      {user ? (
        <h3>Welcome, {user.firstname}!</h3>
      ) : (
        <h3>Welcome! Please log in to continue.</h3>
      )}
      {/* <Search/> */}
      <Map />
    </section>
  );
}
