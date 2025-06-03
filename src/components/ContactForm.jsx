import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

function ContactForm() {
  const [formData, setFormData] = useState({
    ime: "",
    email: "",
    poruka: ""
  });

  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  const validate = () => {
    const newErrors = {};
    if (!formData.ime.trim()) newErrors.ime = "Ime je obavezno";
    if (!formData.email.trim()) {
      newErrors.email = "Email je obavezan";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email nije validan";
    }
    if (!formData.poruka.trim()) newErrors.poruka = "Poruka je obavezna";

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
      const response = await fetch("http://localhost:3001/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error("Greška pri slanju poruke");

      setFormData({ ime: "", email: "", poruka: "" });
      setSuccessMsg("Poruka je uspješno poslata!");
      setErrors({});
    } catch (error) {
      setSuccessMsg("");
      setErrors({ submit: "Došlo je do greške, pokušajte ponovo." });
    }
  };

  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit} noValidate className="max-w-xl mx-auto p-6 pt-24">
        <div className="mb-10">
          <label className="block font-medium mb-2 text-lg">Ime:</label>
          <input
            type="text"
            name="ime"
            value={formData.ime}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          {errors.ime && <div className="text-red-600 mt-1">{errors.ime}</div>}
        </div>

        <div className="mb-10">
          <label className="block font-medium mb-2 text-lg">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          {errors.email && <div className="text-red-600 mt-1">{errors.email}</div>}
        </div>

        <div className="mb-10">
          <label className="block font-medium mb-2 text-lg">Poruka:</label>
          <textarea
            name="poruka"
            value={formData.poruka}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-green-600"
            rows={6}
          />
          {errors.poruka && <div className="text-red-600 mt-1">{errors.poruka}</div>}
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white font-semibold px-6 py-3 rounded hover:bg-green-700 transition-colors"
        >
          Pošalji
        </button>

        {errors.submit && <div className="text-red-600 mt-4">{errors.submit}</div>}
        {successMsg && <div className="text-green-700 mt-4">{successMsg}</div>}
      </form>
      <Footer />
    </>
  );
}

export default ContactForm;