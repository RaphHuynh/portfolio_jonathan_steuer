import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  NavLink,
  Outlet,
  RouterProvider,
  useLocation
} from "react-router-dom";
import * as ReactDOM from "react-dom/client";
import Home from './pages/home.jsx';
import Informations from './pages/informations.jsx';
import Footer from './components/footer.jsx';
import Images from './pages/images.jsx';
import { motion } from "framer-motion";

const fadeInOutVariants = {
  hidden: {
    opacity: 0,
    y: 30
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: "easeOut"
    },
    exit: {
      opacity: 0,
      y: 30,
      transition: {
        duration: 1,
        ease: "easeIn"
      }
    },
  }
};


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/informations",
        element: <Informations />
      },
      {
        path: "/images",
        element: <Images />
      }
    ]
  }
]);

function Root() {
  const location = useLocation();
  const isInformationsPage = location.pathname === "/informations";
  const isImagesPage = location.pathname === "/images";

  const textColorClass = isImagesPage ? "text-black" : "text-white";

  return (
    <>
      {!isInformationsPage && (
        <motion.header className="fixed w-full bg-transparent z-10"
          variants={fadeInOutVariants}
          initial='hidden'
          animate='visible'
          exit='exit'
        >
          <div className="flex m-4 w-full">
            <NavLink className='flex flex-col' to="/">
              <h1 className={`text-8xl ${textColorClass}`}>Jonathan</h1>
              <h1 className={`text-8xl ${textColorClass}`}>Steuer</h1>
            </NavLink>
            <nav className={`text-xl space-x-4 right-4 top-5 fixed ${textColorClass}`}>
              <NavLink
                to="/staging"
                className={({ isActive }) =>
                  isActive ? `${textColorClass}/60` : textColorClass
                }
              >
                Staging
              </NavLink>
              <NavLink
                to="/informations"
                className={({ isActive }) =>
                  isActive ? `${textColorClass}/60` : textColorClass
                }
              >
                Informations
              </NavLink>
              <NavLink
                to="/images"
                className={({ isActive }) =>
                  isActive ? `${textColorClass}/60` : textColorClass
                }
              >
                Images
              </NavLink>
            </nav>
          </div>
        </motion.header>
      )}
      <div>
        <Outlet />
      </div>
      <Footer isInformationsPage={isInformationsPage} isImagesPage={isImagesPage} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);