import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AuthProvider from "./providers/AuthProvider";
import UserProvider from "./providers/UserProvider";
import { Router } from "./Router";
import { RouterProvider } from "react-router-dom";
import "normalize.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <UserProvider>
      <RouterProvider router={Router} />
    </UserProvider>
  </AuthProvider>
);
