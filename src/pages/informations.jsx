import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import photo from '../assets/carmen.png';

export default Informations;

const fadeInOutVariants = {
    hidden: { opacity: 0 },
    visible: { 
        opacity: 1,
        transition: { 
            duration: 1.2,
            ease: "easeInOut"
        }
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.8,
            ease: "easeInOut"
        }
    }
};

  function Informations() {
    return (
        <AnimatePresence>
            <motion.section 
                className="grid grid-cols-2 h-screen w-full z-20 bg-[#DADADA] p-4"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={fadeInOutVariants}
            >
                <motion.article className="">
                    <motion.aside className="w-full text-sm" variants={fadeInOutVariants}>
                        <div className="flex mb-4">
                            <motion.div className="mr-40 w-2/5" variants={fadeInOutVariants}>
                                <h2 className="text-slate-900 font-bold">USA</h2>
                                <p className="text-[#8C8C8C]">ICONIC TALENT AGENCY</p>
                                <p className="text-[#8C8C8C]">Heinrich Meyer - Heinrich@iconictalentagency.com</p>
                                <p className="text-[#8C8C8C]">p/ 323-491-4102</p>
                            </motion.div>
                            <motion.div variants={fadeInOutVariants}>
                                <h2 className="text-slate-900 font-bold">Scandinavia</h2>
                                <p className="text-[#8C8C8C]">XO MGMT</p>
                                <p className="text-[#8C8C8C]">info@xomgmt.se</p>
                            </motion.div>
                        </div>
                        <motion.div variants={fadeInOutVariants}>
                            <h2 className="text-slate-900 font-bold">Europe</h2>
                            <p className="text-[#8C8C8C]">LUX ARTISTS</p>
                            <p className="text-[#8C8C8C]">Wladimir Baseden</p>
                            <p className="text-[#8C8C8C]">Wladimir@luxartists.net</p>
                        </motion.div>
                    </motion.aside>
                    <motion.aside 
                        className="flex flex-col text-[28px] line-[27.72px] bottom-4 fixed w-2/5" 
                        variants={fadeInOutVariants}
                    >
                        <p className="mb-10">
                            Jonathan Steuer est un réalisateur et metteur en scène français. Il développe une pratique intimement liée au mouvement en filmant des danseurs pendant de nombreuses années.
                            Mêlant films, spectacles, photographie et théâtre, son travail met en avant différentes communautés et ce qu'elles représentent.
                        </p>
                        <p>
                            Employant fréquemment le dispositif du plan séquence, ses œuvres évoquent l'immersion, la transe, la mélancolie dans des créations humaines, sensibles et poétiques.
                        </p>
                    </motion.aside>
                </motion.article>
                <motion.article 
                    className="w-full items-center h-full justify-center flex"
                    variants={fadeInOutVariants}
                >
                    <img src={photo} alt="Carmen" className="h-1/2 object-cover grayscale" />
                </motion.article>
                <Link to="/" className="text-black fixed top-4 right-4 hover:text-black/60 font-semibold">
                    Close
                </Link>
            </motion.section>
        </AnimatePresence>
    );
}
