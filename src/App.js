import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  NavLink,
  Outlet,
} from "react-router-dom";
import PizzaListPage from "./pizza-list";
import PizzaSinglePage from "./pizza-single";
import PizzaModifyPage from "./pizza-modify";
import PizzaDeletePage from "./pizza-delete";
import PizzaCreatePage from "./pizza-create";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <PizzaListPage />,
      },
      {
        path: "/pizza/:id",
        element: <PizzaSinglePage />,
      },
      {
        path: "/pizza/:id/modositas",
        element: <PizzaModifyPage />,
      },
      {
        path: "/pizza/:id/torles",
        element: <PizzaDeletePage />,
      },
      {
        path: "/uj-pizza",
        element: <PizzaCreatePage />,
      },
    ],
  },
]);

function AppLayout() {
  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to="/" className="nav-link" activeClassName="active">
                Pizzák
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/uj-pizza"
                className="nav-link"
                activeClassName="active"
              >
                Új pizza
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
