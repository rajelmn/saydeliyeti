import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Farmacy from './components/farmacy.tsx';
import App from "./App.tsx";
import Home from './components/home.tsx';
import "./index.css";
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
      index: true,
      // path: "/farmacy",
      element: <Farmacy />
    }
    ]
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
