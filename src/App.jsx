import Map from "./components/Map";
import Navigation from "./components/Navigation";
import { useContext } from "react";
import "./App.scss";
import { authContext } from "./providers/AuthProvider";
import { userContext } from "./providers/UserProvider";

function App() {
  const { auth } = useContext(authContext);
  const { user } = useContext(userContext);

  return (
    <div className="app">
      <Navigation/>
      {user ? <h3>Welcome, {user.firstname}</h3> : <h3>Welcome! Please log in to continue.</h3> }
      <Map />
    </div>
  );
}

export default App;
