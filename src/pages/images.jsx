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
        <section className="w-full px-40 py-10">
            <div className="grid grid-cols-4 gap-4 pt-36 items-center justify-center">
                {images.map((img, index) => (
                    <div key={index} className="">
                        <img 
                            src={img} 
                            alt={`Image ${index + 1}`} 
                        />
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Images;