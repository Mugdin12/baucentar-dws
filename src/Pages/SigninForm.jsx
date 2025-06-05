import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const SigninForm = () => {
    const [formData, setFormData] = useState({ username: "", password: ""});
    const [errors, setErrors] = useState({});
    const [successMsg, setSuccessMsg] = useState("");
    
    const validate = () => {
        const newErrors = {};
        if (!formData.username.trim()) newErrors.username = "Korisnicko ime je obavezno";

        if (!formData.password.trim()) newErrors.password = "Sifra je obavezna";

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
            /* const response = await fetch("http://localhost:3001/contacts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error("Greška pri slanju poruke"); */

            setFormData({ username: "",passowrd: ""});
            setSuccessMsg("Uspješna prijava!");
            setErrors({});
        } catch (error) {
            setSuccessMsg("");
            setErrors({ submit: "Došlo je do greške, pokušajte ponovo." });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col pt-24">
            <Navbar /> {/* Renderujte vašu Navbar komponentu */}

            <form onSubmit={handleSubmit} noValidate className="max-w-xl mx-auto p-6 pt-24">
                {/* Korisnicko ime */}
                <div className="mb-10">
                    <label className="block font-medium mb-2 text-lg">Korisnicko ime:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                    {errors.username && <div className="text-red-600 mt-1">{errors.username}</div>}
                </div>

                {/* sifra */}
                <div className="mb-10">
                    <label className="block font-medium mb-2 text-lg">Sifra:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                    {errors.password && <div className="text-red-600 mt-1">{errors.password}</div>}
                </div>

                {/* submit */}
                <button
                    type="submit"
                    className="bg-green-600 text-white font-semibold px-6 py-3 rounded hover:bg-green-700 transition-colors"
                >
                    Prijavi se
                </button>

                {errors.submit && <div className="text-red-600 mt-4">{errors.submit}</div>}
                {successMsg && <div className="text-green-700 mt-4">{successMsg}</div>}
            </form>
        </div>
    )
}

export default SigninForm;