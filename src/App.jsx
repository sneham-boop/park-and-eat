import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import "./App.scss";

function App() {
  return (
    <div className="app">
      <Navigation/>
      <Outlet/>
      <Footer/>
    </div>
  );
}

export default App;
