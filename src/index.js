import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AuthProvider from "./providers/AuthProvider";
import UserProvider from "./providers/UserProvider";
import { Router } from "./Router";
import { RouterProvider } from "react-router-dom";
import "normalize.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <UserProvider>
      {/* <App /> */}
      <RouterProvider router={Router} />
    </UserProvider>
  </AuthProvider>
);
