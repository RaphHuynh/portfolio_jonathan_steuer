import React from 'react';
import img1 from "../assets/img1.png";
import img2 from "../assets/img2.jpg"
import img4 from "../assets/img4.jpg";
import img5 from "../assets/img5.jpg";
import img7 from "../assets/img7.jpg";
import img8 from "../assets/img8.jpg";
import img9 from "../assets/img9.png";
import img12 from "../assets/img12.jpg";
import img13 from "../assets/img13.png";
import img14 from "../assets/img14.jpg";

function Images() {
    const images = [
        img1, img2, img4, img5, img7, 
        img8, img9, img12, img13, img14
    ];

    return (
        <section className="w-full px-4 md:px-40 py-10 h-screen flex items-center justify-center">
            <div className="md:grid md:grid-cols-4 md:gap-4 items-center justify-center overflow-x-auto flex md:flex-wrap max-w-full">
                {images.map((img, index) => (
                    <div key={index} className="flex-shrink-0 w-64 md:w-auto mx-2 md:mx-0 flex items-center justify-center">
                        <img 
                            src={img} 
                            alt={`Image ${index + 1}`}
                            className="w-full h-auto object-cover max-h-[80vh]" 
                        />
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Images;