import Map from "./components/Map";
import { useContext } from "react";
import "./App.scss";
import { authContext } from "./providers/AuthProvider";
import { userContext } from "./providers/UserProvider";

function App() {
  const { auth, login, logout } = useContext(authContext);
  const { user } = useContext(userContext);
  const handleClick = () => {
    
  }

  return (
    <div className="App">
      <div>Welcome to PARKEATS.</div>
      {auth ? (
        <p>You have been authenticated.</p>
      ) : (
        <p>Please log in to proceed.</p>
      )}

      {user && <h3>Welcome, {user.firstname}</h3>}
      <Map />
    </div>
  );
}

export default App;
