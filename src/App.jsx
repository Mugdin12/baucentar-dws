import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home.jsx'; // Uvezite Home komponentu
import About from "./Pages/About.jsx"

function App() {
    return (
        <Router> {/* Omotajte cijelu aplikaciju sa Routerom */}
            <Routes> {/* Definirajte rute unutar Routes komponente */}
                <Route path="/" element={<Home />} /> {/* Ruta za početnu stranicu */}
                <Route path="/o-nama" element={<About />} />
            </Routes>
        </Router>
    );
}

export default App;
