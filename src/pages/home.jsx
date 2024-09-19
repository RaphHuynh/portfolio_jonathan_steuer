import React, { useState, useEffect, useRef } from 'react';
import manifeste_du_lin from '../assets/video/manifeste_du_lin.mp4';
import pulse from '../assets/video/pulse.mp4';
import arte from '../assets/video/arte.mov';
import red_bull from '../assets/video/redbull.mp4';
import till_the_end from '../assets/video/till_the_end.mov';
import les_oiseaux from '../assets/video/les_oiseaux.mp4';
import courreges from '../assets/video/courreges.mov';
import zambi from '../assets/video/zambi.mov';
import venice from '../assets/video/venice.mp4';

export default function Home() {
  const films = [
    { name: "Venice Beach - Fucking Young", time: "1:31", color: "#FFCE7F", video: venice },
    { name: "Till the end - Director Library", time: "13:34", color: "#86827B", video: till_the_end },
    { name: "Les oiseaux - Pierre de maere", time: "3:15", color: "#93DBF3", video: les_oiseaux },
    { name: "Manifeste du lin", time: "1:58", color: "#B493F3", video: manifeste_du_lin },
    { name: "Zambi- Trax Mag", time: "6:55", color: "#9D8A68", video: zambi },
    { name: "Wheels of freedom - Red Bull", time: "4:04", color: "#1E77EE", video: red_bull },
    { name: "Courrèges - Subway", time: "0:52", color: "#6FB574", video: courreges },
    { name: "Pulse - Trax Mag", time: "6:06", color: "#F76262", video: pulse },
    { name: "Arte - Illest Battle", time: "1:08", color: "#FF7F47", video: arte }
  ];

  const [backgroundColor, setBackgroundColor] = useState(films[0].color);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const scrollRef = useRef(null);
  const videoRef = useRef(null);
  const scrollIntervalRef = useRef(null);

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
        if (!isHovering) {
          scrollContainer.scrollLeft += 1;
        }
      }, 30);
    };

    startScrolling();

    const handleWheel = (e) => {
      if (!isHovering) {
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
  }, [isHovering]);

  const handleFilmHover = (video) => {
    setIsHovering(true);
    setCurrentVideo(video);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleFilmLeave = () => {
    setIsHovering(false);
    setCurrentVideo(null);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <section
      className="fixed w-full h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor, transition: 'background-color 2.5s ease' }}
    >
      {currentVideo && (
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full object-cover"
          src={currentVideo}
          loop
          muted
          autoPlay
          playsInline
          preload='auto'
        />
      )}
      <div
        ref={scrollRef}
        className="w-full overflow-x-scroll  whitespace-nowrap z-10"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="inline-block">
          {[...films, ...films].map((film, index) => (
            <span
              key={index}
              className="film-span inline-block px-10 text-white/50 text-xl capitalize hover:text-black/50 hover:cursor-pointer delay-150 transition"
              data-color={film.color}
              onMouseEnter={() => handleFilmHover(film.video)}
              onMouseLeave={handleFilmLeave}
            >
              <p>{film.name}</p> {film.time}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}