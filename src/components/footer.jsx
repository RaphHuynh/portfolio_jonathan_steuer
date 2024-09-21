import { motion } from "framer-motion";

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
    <footer className={`fixed flex space-x-4 left-4 md:left-auto md:right-4 bottom-5 ${textColorClass}`}
      variants={fadeInOutVariants}
      style={{ zIndex: headerZIndex }}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <p>Creative filmmaker & Creative Director</p>
      <a href="" className="fixed md:relative right-4 md:right-auto">ln</a>
    </footer>
  )
} 

export default Footer;