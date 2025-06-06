import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';

export default function SigninForm() {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [errors, setErrors] = useState({});
    const [successMsg, setSuccessMsg] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const validate = () => {
        const newErrors = {};
        if (!formData.username.trim()) newErrors.username = "Korisničko ime je obavezno.";
        if (!formData.password.trim()) newErrors.password = "Šifra je obavezna.";
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
            const response = await fetch(`http://localhost:3001/users?username=${formData.username}&password=${formData.password}`);
            const users = await response.json();

            if (!response.ok) {
                throw new Error(`Greška pri prijavi: ${response.statusText}`);
            }

            if (users.length === 0) {
                setErrors({ submit: "Netačno korisničko ime ili šifra." });
                setSuccessMsg("");
                return;
            }

            const loggedInUser = users[0];
            login(loggedInUser);

            setFormData({ username: "", password: "" });
            setSuccessMsg("Uspješna prijava! Preusmjeravam na početnu stranicu...");
            setErrors({});
            setTimeout(() => {
                navigate("/");
            }, 2000);
        } catch (error) {
            setSuccessMsg("");
            setErrors({ submit: error.message || "Došlo je do greške, pokušajte ponovo." });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <form onSubmit={handleSubmit} noValidate className="max-w-xl mx-auto p-6 pt-24 flex-grow">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Prijava</h2>
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
                <div className="mb-8">
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
                <button
                    type="submit"
                    className="bg-green-600 text-white font-semibold px-6 py-3 rounded hover:bg-green-700 transition-colors w-full"
                >
                    Prijavi se
                </button>
                {errors.submit && <div className="text-red-600 mt-4 text-center">{errors.submit}</div>}
                {successMsg && <div className="text-green-700 mt-4 text-center">{successMsg}</div>}
            </form>
            <Footer />
        </div>
    );
}