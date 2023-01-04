import React, { useContext } from "react";
import "./Home.scss";
import { userContext } from "../../providers/UserProvider";

export default function Home() {
  const { user } = useContext(userContext);
  return (
    <section className="home">
      {user ? (
        <h3>Welcome, {user.firstname}!</h3>
      ) : (
        <div className="intro">
          <h3>Welcome to Park&EAT.</h3>
          <p>Please log in to continue.</p>
        </div>
      )}
    </section>
  );
}
