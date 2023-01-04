import App from "./App";
import Home from "./components/Home";
import Map from "./components/Map";
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
} from "react-router-dom";

export const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/map" element={<Map />} />
    </Route>
  )
);
