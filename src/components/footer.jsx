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
    <footer className={`fixed flex items-center bottom-[24px] title-medium text-[13px] md:space-x-[32px] md:left-auto md:right-[48px] md:bottom-[40px] ${textColorClass} `}
      variants={fadeInOutVariants}
      style={{ zIndex: headerZIndex }}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <p className="fixed left-[16px] md:relative md:left-auto">Creative filmmaker & Creative Director</p>
      <a href="https://www.instagram.com/jonathan.steuer/" target="_blank" rel="noreferrer" className="fixed right-[16px] md:relative md:right-auto">
      <FaInstagram />
      </a>
    </footer>
  );
}


export default Footer;