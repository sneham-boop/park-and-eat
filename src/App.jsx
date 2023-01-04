import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import BackgroundVideo from "./components/BackgroundVideo";
import "./App.scss";

function App() {
  return (
    <div className="app">
      <Navigation />
      <Outlet />
      <Footer />
      <BackgroundVideo/>
    </div>
  );
}

export default App;
