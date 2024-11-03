import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Farmacy from './components/farmacy.tsx';
import LoginPage from "./components/login.tsx";
import App from "./App.tsx";
import Home from './components/home.tsx';
import "./index.css";
import LimitedMeds from "./components/limitedMeds.tsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        // index:true,
        path: "/home",
        element: <Home />
      }, 
      {
        path: "/limited", 
        element: <LimitedMeds />
      },
    {
      index: true,
      // path: "/farmacy",
      element: <Farmacy />
    }
    ]
  },
  {
    path: "/login",
    element: <LoginPage />
  }
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
