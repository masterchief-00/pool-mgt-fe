import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

const routes = [
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/dashboard", element: <Dashboard /> },
    ],
  },
];

const router = (
  <BrowserRouter>
    <Routes>
      {routes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element}>
          {route.children.map((child) => (
            <Route key={child.path} path={child.path} element={child.element} />
          ))}
        </Route>
      ))}
    </Routes>
  </BrowserRouter>
);

const App = () => {
  return router;
};

export default App;
