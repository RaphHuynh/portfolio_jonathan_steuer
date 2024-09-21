import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import manifeste_du_lin from '../assets/video/manifeste_du_lin.mp4';
import pulse from '../assets/video/pulse.mp4';
import arte from '../assets/video/arte.mov';
import red_bull from '../assets/video/redbull.mp4';
import till_the_end from '../assets/video/till_the_end.mov';
import les_oiseaux from '../assets/video/les_oiseaux.mp4';
import courreges from '../assets/video/courreges.mov';
import zambi from '../assets/video/zambi.mov';
import venice from '../assets/video/venice.mp4';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const letterAnimation = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
    },
  }),
};

const otherElementsAnimation = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { delay: 1.5, duration: 0.5 }
  }
};

export default function Home() {
  const films = [
    { name: "Venice Beach - Fucking Young", time: "1:31", color: "#FFCE7F", video: venice, link: "https://vimeo.com/845017943" },
    { name: "Till the end - Director Library", time: "13:34", color: "#86827B", video: till_the_end, link: "https://vimeo.com/967734838" },
    { name: "Les oiseaux - Pierre de maere", time: "3:15", color: "#93DBF3", video: les_oiseaux, link: "https://vimeo.com/778314485" },
    { name: "Manifeste du lin", time: "1:58", color: "#B493F3", video: manifeste_du_lin, link: "https://vimeo.com/718852941" },
    { name: "Zambi- Trax Mag", time: "6:55", color: "#9D8A68", video: zambi, link: "https://vimeo.com/647091055" },
    { name: "Wheels of freedom - Red Bull", time: "4:04", color: "#1E77EE", video: red_bull, link: "https://vimeo.com/647102047" },
    { name: "Courrèges - Subway", time: "0:52", color: "#6FB574", video: courreges, link: "https://vimeo.com/882834973/b5e58f3413" },
    { name: "Pulse - Trax Mag", time: "6:06", color: "#F76262", video: pulse, link: "https://vimeo.com/566808151" },
    { name: "Arte - Illest Battle", time: "1:08", color: "#FF7F47", video: arte, link: "https://vimeo.com/551618195" },
  ];

  const [backgroundColor, setBackgroundColor] = useState(films[0].color);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const scrollRef = useRef(null);
  const scrollIntervalRef = useRef(null);

  const nameJonathan = "Jonathan".split('');
  const nameSteuer = "Steuer".split('');

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const updateBackgroundColor = () => {
      const containerRect = scrollContainer.getBoundingClientRect();
      const centerX = containerRect.left + containerRect.width / 2;

      const filmSpans = scrollContainer.querySelectorAll('.film-span');
      for (const span of filmSpans) {
        const spanRect = span.getBoundingClientRect();
        if (spanRect.left <= centerX && spanRect.right >= centerX) {
          setBackgroundColor(span.dataset.color);
          break;
        }
      }
    };

    const handleScroll = () => {
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0;
      }
      updateBackgroundColor();
    };

    scrollContainer.addEventListener('scroll', handleScroll);

    updateBackgroundColor();

    const startScrolling = () => {
      scrollIntervalRef.current = setInterval(() => {
        if (!isHovering && !isPlaying) {
          scrollContainer.scrollLeft += 1;
        }
      }, 30);
    };

    startScrolling();

    const handleWheel = (e) => {
      if (!isHovering && !isPlaying) {
        e.preventDefault();
        scrollContainer.scrollLeft += e.deltaY;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
      }
      scrollContainer.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [isHovering, isPlaying]);

  const handleFilmHover = (video) => {
    setIsHovering(true);
    setCurrentVideo(video);
  };

  const handleFilmLeave = () => {
    setIsHovering(false);
    if (!isPlaying) {
      setCurrentVideo(null);
    }
  };

  const handleFilmClick = (film) => {
    setCurrentVideo(film.link || film.video);
    setIsPlaying(true);
  };

  const handleCloseVideo = () => {
    setIsPlaying(false);
    setCurrentVideo(null);
  };

  return (
    <section
      className="fixed w-full h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor, transition: 'background-color 2.5s ease' }}
    >
      <header className="fixed w-full bg-transparent h-screen">
        <div className="flex m-4 w-full">
          <NavLink className='flex flex-col' to="/">
            <div className="flex">
              {nameJonathan.map((letter, index) => (
                <motion.h1
                  key={index}
                  className="text-6xl md:text-8xl text-white"
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={letterAnimation}
                >
                  {letter}
                </motion.h1>
              ))}
            </div>
            <div className="flex">
              {nameSteuer.map((letter, index) => (
                <motion.h1
                  key={index}
                  className="text-6xl md:text-8xl text-white"
                  custom={index + nameJonathan.length}
                  initial="hidden"
                  animate="visible"
                  variants={letterAnimation}
                >
                  {letter}
                </motion.h1>
              ))}
            </div>
          </NavLink>

          {/* Other elements appear after the animation */}
          <motion.nav
            className="flex flex-col md:flex-row bottom-20 space-y-3 md:space-y-0 left-4 md:text-xl md:space-x-4 md:right-4 md:top-5 md:bottom-auto md:left-auto fixed text-white"
            initial="hidden"
            animate="visible"
            variants={otherElementsAnimation}
          >
            <NavLink to="/images" className={({ isActive }) => isActive ? 'text-gray-300' : 'text-white'}>
              Images
            </NavLink>
            <NavLink to="/informations" className={({ isActive }) => isActive ? 'text-gray-300' : 'text-white'}>
              Informations
            </NavLink>
          </motion.nav>
        </div>
      </header>
      
      {/* The video and scrolling section */}
      <motion.div
        className="w-full overflow-x-scroll whitespace-nowrap z-10"
        ref={scrollRef}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        initial="hidden"
        animate="visible"
        variants={otherElementsAnimation}
      >
        <div className="inline-block">
          {[...films, ...films].map((film, index) => (
            <span
              key={index}
              className="film-span inline-block px-10 text-white/50 text-xl capitalize hover:text-black/50 hover:cursor-pointer delay-150 transition"
              data-color={film.color}
              onMouseEnter={() => handleFilmHover(film.video)}
              onMouseLeave={handleFilmLeave}
              onClick={() => handleFilmClick(film)}
            >
              {film.name}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Video player */}
      {isPlaying && currentVideo && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black z-50">
          <ReactPlayer
            url={currentVideo}
            playing
            controls
            width="100%"
            height="100%"
          />
          <button
            className="absolute top-5 right-5 text-white text-lg"
            onClick={handleCloseVideo}
          >
            close
          </button>
        </div>
      )}

      {!isPlaying && currentVideo && (
        <video
          className="absolute top-0 left-0 w-full h-full object-cover -z-10"
          src={currentVideo}
          loop
          muted
          autoPlay
          playsInline
          preload='auto'
        />
      )}

      {/* Footer */}
      <motion.footer className={`fixed flex space-x-4 left-4 md:left-auto md:right-4 bottom-5 text-white`} initial="hidden" animate="visible" variants={otherElementsAnimation}>
        <p>Creative filmmaker & Creative Director</p>
        <a href="" className="fixed md:relative right-4 md:right-auto">ln</a>
      </motion.footer>
    </section>
  );
}
