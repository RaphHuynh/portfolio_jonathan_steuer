import { useState, useEffect } from 'react';
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

    const images = [
        img1, img2, img4, img5, img6, img7, img8, img9, img10, img11
    ];

    const openModal = (img) => {
        setSelectedImage(img);
        setIsModalOpen(true);
    };


    const closeModal = () => {
        setIsVisible(false);
        setTimeout(() => {
            setIsModalOpen(false);
            setSelectedImage(null);
        }, 300); 
    };

    useEffect(() => {
        if (isModalOpen) {
            setTimeout(() => {
                setIsVisible(true);
            }, 10); 
        }
    }, [isModalOpen]);

    return (
        <>
            <section className="fixed md:relative flex md:block w-full px-5 md:px-40 py-10 h-screen items-center justify-center">
                <div className="flex flex-row md:grid md:grid-cols-4 gap-4 md:pt-48 md:pb-10 items-center justify-center overflow-x-auto max-w-full">
                    {images.map((img, index) => (
                        <div
                            key={index}
                            onClick={() => openModal(img)}
                            className="translate-x-1/2 md:translate-x-0 flex-shrink-0 w-64 md:w-auto mx-2 md:mx-0 flex items-center justify-center"
                        >
                            <img
                                src={img}
                                alt={`Image ${index + 1}`}
                                className="w-full h-auto object-cover max-h-[50vh]"
                            />
                        </div>
                    ))}
                </div>
            </section>

            {/* Modal */}
            {isModalOpen && (
                <div 
                    className={`fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                    onClick={closeModal}
                >
                    <div className="relative" onClick={(e) => e.stopPropagation()}>
                        <img
                            src={selectedImage}
                            alt="Selected"
                            className="h-96 md:h-[700px] object-cover transition-opacity duration-300"
                        />
                    </div>
                </div>
            )}
        </>
    );
}

export default Images;
