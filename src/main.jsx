import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  NavLink,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import * as ReactDOM from "react-dom/client";
import Home from './pages/home.jsx';
import Footer from './components/footer.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />
      }
    ]
  }
]);

function Root() {
  return (
    <>
      <header className="fixed w-full bg-transparent z-10">
        <div className="flex m-4 w-full">
          <NavLink className='flex flex-col' to="/">
            <h1 className='text-8xl text-white'>Jonathan</h1>
            <h1 className='text-8xl text-white'>Steuer</h1>
          </NavLink>
          <nav className="text-xl space-x-4 right-4 top-5 fixed">
            <NavLink
              to="/staging"
              className={({ isActive }) =>
                isActive ? "text-white/60" : "text-white"
              }
            >
              Staging
            </NavLink>
            <NavLink
              to="/informations"
              className={({ isActive }) =>
                isActive ? "text-white/60" : "text-white"
              }
            >
              Informations
            </NavLink>
            <NavLink
              to="/images"
              className={({ isActive }) =>
                isActive ? "text-white/60" : "text-white"
              }
            >
              Images
            </NavLink>
          </nav>
        </div>
      </header>
      <body>
        <Outlet />
      </body>
      <Footer />
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
);
