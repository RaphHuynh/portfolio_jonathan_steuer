import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from 'react-router-dom';
import { FaInstagram } from "react-icons/fa";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img4 from "../assets/img4.jpg";
import img5 from "../assets/img5.jpg";
import img6 from "../assets/img6.jpg";
import img7 from "../assets/img7.jpg";
import img8 from "../assets/img8.jpg";
import img9 from "../assets/img9.jpg";
import img10 from "../assets/img10.jpg";
import img11 from "../assets/img11.jpg";

function Images() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleImages, setVisibleImages] = useState([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    const images = [
        img1, img2, img4, img5, img6, img7, img8, img9, img10, img11
    ];

    // Préchargement des images
    useEffect(() => {
        const imagePromises = images.map(src => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.src = src;
                img.onload = resolve;
                img.onerror = reject;
            });
        });

        Promise.all(imagePromises)
            .then(() => {
                setImagesLoaded(true);
            })
            .catch(error => console.error("Error preloading images:", error));
    }, []);

    // Affichage progressif des images une fois chargées
    useEffect(() => {
        if (!imagesLoaded) return;

        const interval = setInterval(() => {
            if (visibleImages.length < images.length) {
                setVisibleImages(prev => [...prev, images[prev.length]]);
            } else {
                clearInterval(interval);
            }
        }, 250);

        return () => clearInterval(interval);
    }, [visibleImages, images, imagesLoaded]);

    const openModal = (index) => {
        setSelectedImage(images[index]);
        setCurrentIndex(index);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsVisible(false);
        setTimeout(() => {
            setIsModalOpen(false);
            setSelectedImage(null);
        }, 300);
    };

    const nextImage = () => {
        const nextIndex = (currentIndex + 1) % images.length;
        setSelectedImage(images[nextIndex]);
        setCurrentIndex(nextIndex);
    };

    useEffect(() => {
        if (isModalOpen) {
            setTimeout(() => {
                setIsVisible(true);
            }, 10);
        }
    }, [isModalOpen]);

    const fadeInVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    if (!imagesLoaded) {
        return <div className="flex justify-center items-center h-screen">Chargement des images...</div>;
    }

    return (
        <>
            <header className="fixed w-full bg-transparent z-10">
                <div className="flex w-full m-4">
                    <NavLink className='absolute flex flex-col title-medium left-[16px] top-[32px] md:top-[24px] md:left-[24px]' to="/">
                        <h1 className="text-6xl md:text-8xl text-black">Jonathan</h1>
                        <h1 className="text-6xl md:text-8xl text-black">Steuer</h1>
                    </NavLink>
                    <nav className="flex flex-col md:flex-row bottom-[83px] space-y-[32px] md:space-y-0 left-[16px] text-[13px] md: md:space-x-[32px] md:right-[48px] md:top-[40px] md:bottom-auto md:left-auto fixed text-black title-medium">
                        <NavLink to="/" className={({ isActive }) => isActive ? 'text-gray-300' : 'text-black'}>
                            Films
                        </NavLink>
                        <NavLink to="/informations" className={({ isActive }) => isActive ? 'text-gray-300' : 'text-black'}>
                            Informations
                        </NavLink>
                    </nav>
                </div>
            </header>
            <section className="fixed md:relative flex md:block w-full px-0 md:px-40 py-10 h-screen items-center justify-start md:justify-center">
                <div className="flex flex-row md:grid md:grid-cols-4 gap-4 md:pt-48 md:pb-10 md:justify-center mx-auto overflow-x-auto items-center px-4 ">
                    <AnimatePresence>
                        {visibleImages.map((img, index) => (
                            <motion.div
                                key={index}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                variants={fadeInVariants}
                                className="flex-shrink-0 md:w-auto mx-auto mb-4"
                                onClick={() => openModal(index)}
                            >
                                <img
                                    src={img}
                                    alt={`Image ${index + 1}`}
                                    className="w-auto h-52 mr-10 md:w-full md:h-auto md:object-cover"
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
                <footer className={`fixed flex space-x-[32px] items-center left-4 md:left-auto bottom-[24px] text-black text-[13px] title-medium md:bottom-[40px] md:right-[48px] z-10`}
                >
                    <p className="fixed left-[16px] md:relative md:left-auto">Creative filmmaker & Creative Director</p>
                    <a href="https://www.instagram.com/jonathan.steuer/" target="_blank" rel="noreferrer" className="fixed right-[16px] md:relative md:right-auto">
                        <FaInstagram />
                    </a>
                </footer>
            </section>
            {isModalOpen && (
                    <div
                        className={`fixed inset-0 h-screen bg-white bg-opacity-95 flex items-center justify-center z-20 transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                        onClick={closeModal}
                    >
                        <div className="relative" onClick={(e) => e.stopPropagation()}>
                            <img
                                src={selectedImage}
                                alt="Selected"
                                className="h-96 md:h-[700px] object-cover transition-opacity duration-300"
                                onClick={nextImage}
                            />
                        </div>
                    </div>
                )}
        </>

    );
}

export default Images;