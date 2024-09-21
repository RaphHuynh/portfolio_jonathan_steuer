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
import AnimatedCursor from "react-animated-cursor"

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
  const isHomePage = location.pathname === "/";
  const isInformationsPage = location.pathname === "/informations";
  const isImagesPage = location.pathname === "/images";

  const textColorClass = isImagesPage ? "text-black" : "text-white";
  const headerZIndex = isHomePage ? 0 : 10; 

  return (
    <>
      {!isInformationsPage && (
        <motion.header 
          className="fixed w-full bg-transparent" 
          style={{ zIndex: headerZIndex }} 
          variants={fadeInOutVariants}
          initial='hidden'
          animate='visible'
          exit='exit'
        >
          <div className="flex m-4 w-full">
            <NavLink className='flex flex-col' to="/">
              <h1 className={`text-6xl md:text-8xl ${textColorClass}`}>Jonathan</h1>
              <h1 className={`text-6xl md:text-8xl ${textColorClass}`}>Steuer</h1>
            </NavLink>
            <nav className={`flex flex-col md:flex-row bottom-20 space-y-3 md:space-y-0 left-4 md:text-xl md:space-x-4 md:right-4 md:top-5 md:bottom-auto md:left-auto fixed ${textColorClass}`}>
              <NavLink
                to="/images"
                className={({ isActive }) =>
                  isActive ? `${textColorClass}/60` : textColorClass
                }
              >
                Images
              </NavLink>
              <NavLink
                to="/informations"
                className={({ isActive }) =>
                  isActive ? `${textColorClass}/60` : textColorClass
                }
              >
                Informations
              </NavLink>
            </nav>
          </div>
        </motion.header>
      )}
      <main>
        <div>
          <AnimatedCursor
            innerSize={8}
            outerSize={8}
            color='10, 10, 10'
            outerAlpha={0.2}
            innerScale={0.7}
            outerScale={5}
            clickables={[
              'a',
              'input[type="text"]',
              'input[type="email"]',
              'input[type="number"]',
              'input[type="submit"]',
              'input[type="image"]',
              'label[for]',
              'select',
              'textarea',
              'button',
              '.link',
              'span'
            ]}
          />
          <Outlet />
        </div>
      </main>
      <Footer isInformationsPage={isInformationsPage} isImagesPage={isImagesPage} isHome={headerZIndex} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);