import Item1 from './slike/Item1.jpg';
import Item2 from './slike/Item2.jpg';
import Item3 from './slike/Item3.jpg';
import Item4 from './slike/Item4.jpg';
import Item5 from './slike/Item5.jpg';
import Item7 from './slike/Item7.jpg';

// Funkcija za generisanje sluga
const generateSlug = (name) => {
    return name
        .toLowerCase()
        .replace(/\s+/g, '-') // Zamijeni razmake crticama
        .replace(/[^\w-]+/g, '') // Ukloni sve što nije riječ ili crtica
        .replace(/--+/g, '-') // Zamijeni više crtica jednom
        .trim(); // Ukloni prazan prostor na početku/kraju
};

export const products = [
    {
        id: 1,
        name: "Udarna Bušilica",
        slug: generateSlug("Udarna Bušilica"), // ✨ Dodan slug
        price: "129.99 KM",
        priceValue: 129.99,
        imageUrl: Item1,
        alt: "Udarna Bušilica",
        description: "Snažna bušilica za sve vaše građevinske projekte, idealna za profesionalce i hobiste.",
    },
    {
        id: 2,
        name: "Set Ručnih Alata",
        slug: generateSlug("Set Ručnih Alata"), // ✨ Dodan slug
        price: "59.50 KM",
        priceValue: 59.50,
        imageUrl: Item3,
        alt: "Set Ručnih Alata",
        description: "Kompletan set alata za svaku kućnu popravku, neophodan u svakoj radionici.",
    },
    {
        id: 3,
        name: "Komplet vrtnog crijeva",
        slug: generateSlug("Komplet vrtnog crijeva"), // ✨ Dodan slug
        price: "15.00 KM",
        priceValue: 15.00,
        imageUrl: Item2,
        alt: "Komplet vrtnog crijeva",
        description: "Izdržljivo rastezljivo baštensko crevo s podesivom mlaznicom i brzim priključcima",
    },
    {
        id: 4,
        name: "Električna kosilica za travu",
        slug: generateSlug("Električna kosilica za travu"), // ✨ Dodan slug
        price: "189.99 KM",
        priceValue: 189.99,
        imageUrl: Item4,
        alt: "Električna kosilica za travu",
        description: "Baterijska električna kosilica za travu s podesivom visinom rezanja i torbom za skupljanje trave",
    },
    {
        id: 5,
        name: "Komplet valjaka za boju",
        slug: generateSlug("Komplet valjaka za boju"), // ✨ Dodan slug
        price: "19.99 KM",
        priceValue: 19.99,
        imageUrl: Item5,
        alt: "Komplet valjaka za boju",
        description: "Potpuni komplet valjaka za bojenje s produžnom drškom i raznim veličinama valjaka za sve površine",
    },
    {
        id: 6,
        name: "Automatski zalijevač biljaka",
        slug: generateSlug("Automatski zalijevač biljaka"), // ✨ Dodan slug
        price: "34.50 KM",
        priceValue: 34.50,
        imageUrl: Item7,
        alt: "Automatski zalijevač biljaka",
        description: "Sistem za samo zalijevanje biljaka s podesivim protokom.",
    },
];
