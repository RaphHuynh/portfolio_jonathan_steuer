import { StrictMode, useState, useEffect } from 'react'
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
import { motion, AnimatePresence } from "framer-motion";
import AnimatedCursor from "react-animated-cursor"
import img1 from "./assets/img1.jpg";
import img2 from "./assets/img2.jpg";
import img3 from "./assets/img3.jpg";
import img4 from "./assets/img4.jpg";
import img5 from "./assets/img5.jpg";
import img6 from "./assets/img6.jpg";
import img7 from "./assets/img7.jpg";
import img8 from "./assets/img8.jpg";
import img9 from "./assets/img9.jpg";
import img10 from "./assets/img10.jpg";
import img11 from "./assets/img11.jpg";
import arte from "./assets/video/arte.mov";
import courreges from "./assets/video/courreges.mov";
import les_oiseaux from "./assets/video/les_oiseaux.mp4";
import manifeste_du_lin from "./assets/video/manifeste_du_lin.mp4";
import pulse from "./assets/video/pulse.mp4";
import red_bull from "./assets/video/redbull.mp4";
import till_the_end from "./assets/video/till_the_end.mov";
import venice from "./assets/video/venice.mp4";
import zambi from "./assets/video/zambi.mov";

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

const imagesToPreload = [
  img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11
];

const videosToPreload = [
  arte, courreges, les_oiseaux, pulse, red_bull, till_the_end, zambi, venice, manifeste_du_lin
];

function preloadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = resolve;
    img.onerror = reject;
    img.src = src;
  });
}

function preloadVideo(src) {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'auto';
    video.onloadeddata = resolve;
    video.onerror = reject;
    video.src = src;
  });
}

async function preloadResources() {
  const imagePromises = imagesToPreload.map(preloadImage);
  const videoPromises = videosToPreload.map(preloadVideo);
  await Promise.all([...imagePromises, ...videoPromises]);
}

function LoadingPage({ progress }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <motion.div
        className="text-black text-3xl mb-4 font-serif" 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        Chargement...
      </motion.div>
      <div className="w-64 h-2 bg-gray-300 rounded-full shadow-md">
        <div 
          className="h-full bg-black rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}


function Root() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isInformationsPage = location.pathname === "/informations";
  const isImagesPage = location.pathname === "/images";
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [hasTimedOut, setHasTimedOut] = useState(false);

  const textColorClass = isImagesPage ? "text-black" : "text-white";
  const headerZIndex = isHomePage ? -10 : 20;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    const loadResources = async () => {
      const totalResources = imagesToPreload.length + videosToPreload.length;
      let loadedResources = 0;

      const updateProgress = () => {
        loadedResources++;
        const progress = (loadedResources / totalResources) * 100;
        setLoadingProgress(progress);
      };

      try {
        const imagePromises = imagesToPreload.map(img => 
          preloadImage(img).then(updateProgress)
        );
        const videoPromises = videosToPreload.map(video => 
          preloadVideo(video).then(updateProgress)
        );

        await Promise.all([...imagePromises, ...videoPromises]);
        if (!hasTimedOut) {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error loading resources:", error);
        setIsLoading(false);
      }
    };

    // Charger les ressources
    loadResources();

    // Timeout de 5 secondes
    const timeoutId = setTimeout(() => {
      setHasTimedOut(true);
      setIsLoading(false);
    }, 5000); // Timeout après 5 secondes

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId); // Nettoyage du timeout
    };
  }, [hasTimedOut]);

  if (isLoading) {
    return <LoadingPage progress={loadingProgress} />;
  }

  return (
    <>
      <AnimatePresence>
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
              <nav className={`flex flex-col md:flex-row bottom-14 space-y-3 md:space-y-0 left-4 md:text-xl md:space-x-4 md:right-4 md:top-5 md:bottom-auto md:left-auto fixed ${textColorClass}`}>
                <NavLink
                  to="/home"
                  className={({ isActive }) =>
                    isActive ? `${textColorClass}/60` : textColorClass
                  }
                >
                  Home
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
      </AnimatePresence>
      <main>
        <div>
          {!isMobile && (
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
          )}
          <Outlet />
        </div>
      </main>
      <Footer isInformationsPage={isInformationsPage} isImagesPage={isImagesPage} headerZIndex={headerZIndex} />
    </>
  );
}

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

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
