import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Footer from "./components/Footer";
import "./App.scss";

function App() {
  return (
    <div className="app">
      <Navigation/>
      <Home/>
      <Footer/>
    </div>
  );
}

export default App;
