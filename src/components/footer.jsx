import { motion } from "framer-motion";
import { FaInstagram } from "react-icons/fa";

const fadeInOutVariants = {
  hidden: {
    opacity: 0,
    y: -30
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
      y: -30,
      transition: {
        duration: 1,
        ease: "easeIn"
      }
    },
  }
};


function Footer({ isInformationsPage, isImagesPage, headerZIndex }) {
  const textColorClass = isInformationsPage || isImagesPage ? "text-black" : "text-white";
  
  return (
    <footer className={`fixed flex items-center space-x-[16px] left-4 md:left-auto md:right-[48px] bottom-[40px] ${textColorClass} `}
      variants={fadeInOutVariants}
      style={{ zIndex: headerZIndex }}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <p>Creative filmmaker & Creative Director</p>
      <a href="https://www.instagram.com/jonathan.steuer/" target="_blank" rel="noreferrer">
      <FaInstagram />
      </a>
    </footer>
  );
}


export default Footer;