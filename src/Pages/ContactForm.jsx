import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function ContactForm() {
  const [formData, setFormData] = useState({ ime: "", email: "", poruka: "" });
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
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
        {/* ime */}
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

        {/* email */}
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

        {/* poruka */}
        <div className="mb-10">
          <label className="block font-medium mb-2 text-lg">Poruka:</label>
          <textarea
            name="poruka"
            value={formData.poruka}
            onChange={handleChange}
            rows={6}
            className="w-full border border-gray-300 rounded px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          {errors.poruka && <div className="text-red-600 mt-1">{errors.poruka}</div>}
        </div>

        {/* submit */}
        <button
          type="submit"
          className="bg-green-600 text-white font-semibold px-6 py-3 rounded hover:bg-green-700 transition-colors"
        >
          Pošalji
        </button>

        {errors.submit && <div className="text-red-600 mt-4">{errors.submit}</div>}
        {successMsg && <div className="text-green-700 mt-4">{successMsg}</div>}
      </form>

      {/* GOOGLE MAP */}
      <div className="max-w-6xl mx-auto px-6 pb-12">
        <h2 className="text-2xl font-semibold mb-4 text-center">Naša lokacija</h2>
        <div className="w-full h-96 rounded-lg overflow-hidden shadow-md">
          <iframe
  title="Naša lokacija - Sarajevo"
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2873.239682005486!2d18.413076415501883!3d43.85625894644539!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4758c8c3340e1953%3A0x7e8ce3d8f3d379d2!2sSarajevo%2C%20Bosnia%20and%20Herzegovina!5e0!3m2!1sen!2sba!4v1717425150003!5m2!1sen!2sba"
  width="100%"
  height="100%"
  style={{ border: 0 }}
  allowFullScreen=""
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
/>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ContactForm;