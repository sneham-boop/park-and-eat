import Map from "./components/Map";
import { useContext } from "react";
import "./App.css";
import { authContext } from "./providers/AuthProvider";

function App() {
  const { auth } = useContext(authContext);
  return (
    <div className="App">
      <div>Welcome to PARKEATS.</div>
      {auth ? (
        <p>You have been authenticated.</p>
      ) : (
        <p>Please log in to proceed.</p>
      )}
      <Map />
    </div>
  );
}

export default App;
