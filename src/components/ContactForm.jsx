import React, { useState } from "react";

function ContactForm() {
  const [formData, setFormData] = useState({
    ime: "",
    email: "",
    poruka: ""
  });

  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  // Validacija polja
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

    // Slanje podataka na json-server
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
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <label>Ime:</label><br />
        <input
          type="text"
          name="ime"
          value={formData.ime}
          onChange={handleChange}
        />
        {errors.ime && <div style={{ color: "red" }}>{errors.ime}</div>}
      </div>

      <div>
        <label>Email:</label><br />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <div style={{ color: "red" }}>{errors.email}</div>}
      </div>

      <div>
        <label>Poruka:</label><br />
        <textarea
          name="poruka"
          value={formData.poruka}
          onChange={handleChange}
        />
        {errors.poruka && <div style={{ color: "red" }}>{errors.poruka}</div>}
      </div>

      <button type="submit">Pošalji</button>

      {errors.submit && <div style={{ color: "red" }}>{errors.submit}</div>}
      {successMsg && <div style={{ color: "green" }}>{successMsg}</div>}
    </form>
  );
}

export default ContactForm;