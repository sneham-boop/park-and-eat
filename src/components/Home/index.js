import React, { useContext } from "react";
// import Map from "../Map";
import "./Home.scss";
import { userContext } from "../../providers/UserProvider";
import vid from "../../docs/restaurant-video.mp4";

export default function Home() {
  const { user } = useContext(userContext);
  return (
    <section className="home">
      {user ? (
        <h3>Welcome, {user.firstname}!</h3>
      ) : (
        <div>
          <h3>Welcome to Park&EAT! </h3>
          <p>Please log in to continue.</p>
        </div>
      )}
      <video autoPlay muted loop className="video">
        <source src={vid} type="video/mp4" />
      </video>
      {/* <Map /> */}
    </section>
  );
}
