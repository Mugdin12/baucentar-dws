import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home.jsx'; // Uvezite Home komponentu


function App() {
    return (
        <Router> {/* Omotajte cijelu aplikaciju sa Routerom */}
            <Routes> {/* Definirajte rute unutar Routes komponente */}
                <Route path="/" element={<Home />} /> {/* Ruta za početnu stranicu */}
                {/* Ovdje možete dodati i druge rute, npr.:
                <Route path="/o-nama" element={<About />} />
                <Route path="/kontakt" element={<Contact />} />
                */}
            </Routes>
        </Router>
    );
}

export default App;
