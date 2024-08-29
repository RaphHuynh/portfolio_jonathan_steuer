import { Link } from 'react-router-dom';

export default Informations;

function Informations() {
    return (
        <section className="grid grid-cols-2 h-screen w-full z-20 bg-[#DADADA] p-4">
            <article className="">
                <aside className="w-full text-sm">
                    <div className="flex mb-4">
                        <div className="mr-40 w-2/5">
                            <h2 className="text-slate-900 font-bold">
                                USA
                            </h2>
                            <p className="text-[#8C8C8C]">
                                ICONIC TALENT AGENCY
                            </p>
                            <p className="text-[#8C8C8C]">
                                Heinrich Meyer - Heinrich@iconictalentagency.com
                            </p>
                            <p className="text-[#8C8C8C]">
                                p/ 323-491-4102
                            </p>
                        </div>
                        <div className="">
                            <h2 className="text-slate-900 font-bold">
                                Scandinavia
                            </h2>
                            <p className="text-[#8C8C8C]"> 
                                XO MGMT
                            </p>
                            <p className="text-[#8C8C8C]">
                                info@xomgmt.se
                            </p>
                        </div>
                    </div>
                    <div className="">
                        <h2 className="text-slate-900 font-bold">
                            Europe
                        </h2>
                        <p className="text-[#8C8C8C]">
                            LUX  ARTISTS
                        </p>
                        <p className="text-[#8C8C8C]">
                            Wladimir Baseden
                        </p>
                        <p className="text-[#8C8C8C]">
                            Wladimir@luxartists.net
                        </p>
                    </div>
                </aside>
                <aside className="flex flex-col text-[28px] line-[27.72px] bottom-4 fixed w-2/5">
                    <p className="mb-10">
                        Jonathan Steuer est un réalisateur et metteur en scène français. Il développe une pratique intimement liée au mouvement en filmant des danseurs pendant de nombreuses années.
                        Mêlant films, spectacles, photographie et théâtre, son travail met en avant différentes communautés et ce qu'elles représentent.
                    </p>
                    <p>
                        Employant fréquemment le dispositif du plan séquence, ses œuvres évoquent l'immersion, la transe, la mélancolie dans des créations humaines, sensibles et poétiques.
                    </p>
                </aside>
            </article>
            <article className="">
            </article>
            <Link to="/" className="text-black fixed top-4 right-4 hover:text-black/60 font-semibold">
                Close
             </Link>
        </section>
    );
}