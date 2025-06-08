import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


export default function Signup() {
    const [formData, setFormData] = useState({ username: "", email: "", password: "", "repeat-password": "" });
    const [errors, setErrors] = useState({});
    const [successMsg, setSuccessMsg] = useState("");
    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};
        if (!formData.username.trim()) newErrors.username = "Korisničko ime je obavezno.";
        if (!formData.email.trim()) {
            newErrors.email = "Email je obavezan.";
        } else if (!/\S+@\S+\.\S/.test(formData.email)) {
            newErrors.email = "Email nije validan.";
        }

        if (!formData.password.trim()) newErrors.password = "Šifra je obavezna.";
        if (formData.password.trim().length < 6) newErrors.password = "Šifra mora imati najmanje 6 karaktera.";

        if (!formData["repeat-password"].trim()) newErrors["repeat-password"] = "Potvrda šifre je obavezna.";

        if (formData.password.trim() !== formData["repeat-password"].trim()) {
            newErrors.password = "Šifre moraju biti iste.";
            newErrors["repeat-password"] = "Šifre moraju biti iste.";
        }

        return newErrors;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
        setSuccessMsg("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            // Provjera da li korisničko ime ili email već postoje
            const existingUsersRes = await fetch(`http://localhost:3001/users?username=${formData.username}&email=${formData.email}`);
            const existingUsers = await existingUsersRes.json();

            if (existingUsers.some(user => user.username === formData.username)) {
                setErrors({ username: "Korisničko ime je već zauzeto." });
                return;
            }
            if (existingUsers.some(user => user.email === formData.email)) {
                setErrors({ email: "Email je već registrovan." });
                return;
            }

            // Slanje podataka za registraciju na json-server
            const response = await fetch("http://localhost:3001/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                    role: "guest"
                }),
            });

            if (!response.ok) {
                let errorData = {};
                try {
                    errorData = await response.json();
                } catch (errorParsingJson) {
                    // Ignorisati gresku parsiranja JSON-a ako odgovor nije JSON
                }
                throw new Error(errorData.message || `Greška pri registraciji: ${response.statusText}`);
            }

            setFormData({ username: "", email: "", password: "", "repeat-password": "" });
            setSuccessMsg("Uspješna registracija! Preusmjeravam na stranicu za prijavu...");
            setErrors({});

            // Preusmeravanje na stranicu za prijavu nakon uspješne registracije
            setTimeout(() => {
                navigate("/prijavi-se"); //  Promijenjena putanja na /prijavi-se
            }, 2000); // Preusmeri nakon 2 sekunde
        } catch (error) {
            setSuccessMsg("");
            setErrors({ submit: error.message || "Došlo je do greške, pokušajte ponovo." });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <form onSubmit={handleSubmit} noValidate className="max-w-xl mx-auto p-6 pt-24 flex-grow">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Registracija</h2>
                <div className="mb-6">
                    <label className="block font-medium mb-2 text-lg">Korisničko ime:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                    {errors.username && <div className="text-red-600 mt-1 text-sm">{errors.username}</div>}
                </div>

                <div className="mb-6">
                    <label className="block font-medium mb-2 text-lg">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                    {errors.email && <div className="text-red-600 mt-1 text-sm">{errors.email}</div>}
                </div>

                <div className="mb-6">
                    <label className="block font-medium mb-2 text-lg">Šifra:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                    {errors.password && <div className="text-red-600 mt-1 text-sm">{errors.password}</div>}
                </div>

                <div className="mb-8">
                    <label className="block font-medium mb-2 text-lg">Ponovite šifru:</label>
                    <input
                        type="password"
                        name="repeat-password"
                        value={formData["repeat-password"]}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                    {errors["repeat-password"] && <div className="text-red-600 mt-1 text-sm">{errors["repeat-password"]}</div>}
                </div>

                <button
                    type="submit"
                    className="bg-green-600 text-white font-semibold px-6 py-3 rounded hover:bg-green-700 transition-colors w-full"
                >
                    Registriraj se
                </button>

                {errors.submit && <div className="text-red-600 mt-4 text-center">{errors.submit}</div>}
                {successMsg && <div className="text-green-700 mt-4 text-center">{successMsg}</div>}
            </form>
            <Footer />
        </div>
    );
}

