import Item1 from './slike/Item1.jpg';
import Item2 from './slike/Item2.jpg';
import Item3 from './slike/Item3.jpg';
import Item4 from './slike/Item4.jpg';
import Item5 from './slike/Item5.jpg';
import Item6 from './slike/Item6.jpg';
import Item7 from './slike/Item7.jpg';
import Item8 from './slike/Item8.jpg';
import Item9 from './slike/Item9.jpg';
import Item10 from './slike/Item10.jpg';
import Item11 from './slike/Item11.jpg';
import Item12 from './slike/Item12.jpg';
import Item13 from './slike/Item13.jpg';
import Item14 from './slike/Item14.jpg';
import Item15 from './slike/Item15.jpg';
import Item16 from './slike/Item16.jpg';
import Item17 from './slike/Item17.jpg';

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
    {
        id: 7,
        name: "Odvijač sa nastavcima",
        slug: generateSlug("Odvijač sa nastavcima"), // ✨ Dodan slug
        price: "39.99 KM",
        priceValue: 39.99,
        imageUrl: Item6,
        alt: "Odvijač sa nastavcima",
        description: "Multifunkcionalni set električnog odvijača koji se koristi za precizne radove.",
    },
    {
        id: 8,
        name: "Luljaška za vrt",
        slug: generateSlug("Luljaška za vrt"), // ✨ Dodan slug
        price: "149.50 KM",
        priceValue: 149.50,
        imageUrl: Item8,
        alt: "Luljaška za vrt",
        description: "Pronađite oazu mira i siguran hlad tokom vrelih ljetnih dana.",
    },
    {
        id: 9,
        name: "Suncobran 3m",
        slug: generateSlug("Suncobran 3m"), // ✨ Dodan slug
        price: "155.00 KM",
        priceValue: 155.00,
        imageUrl: Item9,
        alt: "Suncobran 3m",
        description: "Suncobran je praktičan i estetski privlačan dodatak za vašu terasu, dvorište ili vrt.",
    },
    {
        id: 10,
        name: "Električna kosilica 1600W",
        slug: generateSlug("Električna kosilica 1600W"), // ✨ Dodan slug
        price: "179.99 KM",
        priceValue: 179.99,
        imageUrl: Item10,
        alt: "Električna kosilica 1600W",
        description: "Električna kosilica LM385 1600W Ingco za održavanje travnjaka do 300m2.",
    },
    {
        id: 11,
        name: "BRADAS 4-djelni nastavak 3/4",
        slug: generateSlug("BRADAS 4-djelni nastavak 3/4"), // ✨ Dodan slug
        price: "9.99 KM",
        priceValue: 9.99,
        imageUrl: Item11,
        alt: "BRADAS 4-djelni nastavak 3/4",
        description: "Ovaj nastavak se sastoji od četiri dela, čime se omogućava veća fleksibilnost.",
    },
    {
        id: 12,
        name: "GARDENA MD PRSKALICA",
        slug: generateSlug("GARDENA MD PRSKALICA"), // ✨ Dodan slug
        price: "4.50 KM",
        priceValue: 4.50,
        imageUrl: Item12,
        alt: "GARDENA MD PRSKALICA",
        description: "MD PRSKALICA za navodnjavanje pruža ravnomjerno fino prskanje po cijeloj površini.",
    },
    {
        id: 13,
        name: "DŽOGER SA PUMPICOM",
        slug: generateSlug("DŽOGER SA PUMPICOM"), // ✨ Dodan slug
        price: "17.50 KM",
        priceValue: 17.50,
        imageUrl: Item13,
        alt: "DŽOGER SA PUMPICOM",
        description: "Sušilo za rublje Pegasus 150 od Leifheit-a predstavlja izuzetno čvrsto i stabilno",
    },
    {
        id: 14,
        name: "SUŠILO ZA RUBLJE 20M",
        slug: generateSlug("SUŠILO ZA RUBLJE 20M"), // ✨ Dodan slug
        price: "149.00 KM",
        priceValue: 149.00,
        imageUrl: Item14,
        alt: "SUŠILO ZA RUBLJE 20M",
        description: "Sušilo za rublje Pegasus 200 od Leifheit-a predstavlja izuzetno čvrsto i stabilno.",
    },
    {
        id: 15,
        name: "DP1910 ČETKA PVC",
        slug: generateSlug("DP1910 ČETKA PVC"), // ✨ Dodan slug
        price: "1.99 KM",
        priceValue: 1.99,
        imageUrl: Item15,
        alt: "DP1910 ČETKA PVC",
        description: "Četka pvc je vaš idealan saveznik u održavanju čistoće i sjaja vašeg doma.",
    },
    {
        id: 16,
        name: "STAKLENA POSUDA SA PLUTO LOPTICOM",
        slug: generateSlug("STAKLENA POSUDA SA PLUTO LOPTICOM"), // ✨ Dodan slug
        price: "14.99 KM",
        priceValue: 14.99,
        imageUrl: Item16,
        alt: "STAKLENA POSUDA SA PLUTO LOPTICOM",
        description: "Staklena posudaje praktična i dekorativna za čuvanje začina i drugih namirnica.",
    },
    {
        id: 17,
        name: "PANASONIC Aku-baterija",
        slug: generateSlug("PANASONIC Aku-baterija"), // ✨ Dodan slug
        price: "23.50 KM",
        priceValue: 23.50,
        imageUrl: Item17,
        alt: "PANASONIC Aku-baterija",
        description: "Ova baterija se odlikuje visokom gustoćom energije, dugim vijekom trajanja",
    },

];
