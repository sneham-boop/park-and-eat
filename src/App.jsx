import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import "./App.scss";

function App() {
  return (
    <div className="app">
      <Navigation/>
      {/* <Home/> */}
      <Outlet/>
      <Footer/>
    </div>
  );
}

export default App;
