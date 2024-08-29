function Footer({ isInformationsPage }) {
    const textColorClass = isInformationsPage ? "text-black" : "text-white";
    
    return (
      <footer className={`flex space-x-4 fixed right-4 bottom-5 z-20 ${textColorClass}`}>
        <p>Creative filmmaker & Creative Director</p>
        <a href="">ln</a>
      </footer>
    )
  }
  
  export default Footer;