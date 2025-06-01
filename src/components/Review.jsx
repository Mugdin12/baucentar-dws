import { Star, UserCircle2 } from "lucide-react";

const Review = () => {
    const testimonials = [
        {
            name: "Michael Becker",
            company: "Becker Construction GmbH",
            text: "\"BauCenter je moj glavni dobavljač građevinskog materijala već više od deset godina. Njihov kvalitet je nenadmašan, a osoblje uvijek stručno i uslužno.\"",
            stars: 5,
        },
        {
            name: "Sophia Krause",
            company: "Vlasnica kuće",
            text: "\"Kao entuzijasta za uradi sam projekte, cijenim veliki izbor proizvoda i stručne savjete koje dobijam u BauCenteru. Njihovo osoblje mi je pomoglo u brojnim renovacijama.\"",
            stars: 5,
        },
        {
            name: "Robert Hoffmann",
            company: "Hoffmann Razvoj Nekretnina",
            text: "\"Saradnju sa BauCenterom imamo u svim našim većim projektima. Njihova pouzdana dostava, konkurentne cijene i kvalitetni materijali su ključ našeg uspjeha.\"",
            stars: 4,
        },
    ];

    return (
        <section className="py-16 px-4 bg-gray-50 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Šta Naši Kupci Kažu
            </h2>
            <p className="text-gray-600 mb-10">
                Ponosni smo što smo stekli povjerenje i zadovoljstvo kupaca širom Evrope.
            </p>

            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {testimonials.map((t, i) => (
                    <div
                        key={i}
                        className="bg-white p-6 rounded-xl shadow-md text-left flex flex-col justify-between"
                    >
                        <div className="flex mb-4 text-yellow-500">
                            {[...Array(t.stars)].map((_, idx) => (
                                <Star key={idx} size={18} fill="currentColor" />
                            ))}
                        </div>
                        <p className="text-gray-700 italic mb-6">{t.text}</p>
                        <div className="flex items-center">
                            <UserCircle2 className="text-green-600 mr-3" size={32} />
                            <div>
                                <p className="font-semibold text-gray-800">{t.name}</p>
                                <p className="text-sm text-gray-500">{t.company}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Review;
