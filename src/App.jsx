import Navigation from "./components/Navigation";
import Home from "./components/Home";
import { useContext } from "react";
import "./App.scss";
import { userContext } from "./providers/UserProvider";

function App() {
  const { user } = useContext(userContext);

  return (
    <div className="app">
      <Navigation/>
      {user ? <h3>Welcome, {user.firstname}</h3> : <h3>Welcome! Please log in to continue.</h3> }
      <Home/>
    </div>
  );
}

export default App;
