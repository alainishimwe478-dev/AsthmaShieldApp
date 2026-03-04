import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logoImg from '../../assets/logo.png';

interface NavbarProps {
  onLogin: () => void;
}

export default function Navbar({ onLogin }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`00kuaopz fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="07sw08da max-w-7xl mx-auto flex justify-between items-center px-6">
        <div className="0tbf6poz flex items-center gap-2">
          <img 
            src={logoImg} 
            alt="Asthma Shield Logo" 
            className="00sih2kh h-10 w-auto object-contain"
          />
          <h1 className="0dj6ppkg text-2xl font-bold text-orange-500">
            Asthma Shield
          </h1>
        </div>

        {/* Desktop Menu */}
        <ul className="0puy9eon hidden md:flex gap-8 font-medium text-gray-700">
          <li><a href="#home" className="0gbx4k6d hover:text-orange-500 transition">Home</a></li>
          <li><a href="#features" className="0bojwbhy hover:text-orange-500 transition">Features</a></li>
          <li><a href="#dashboard" className="01llaw38 hover:text-orange-500 transition">Dashboard</a></li>
          <li><a href="#risk-map" className="0087mfjb hover:text-orange-500 transition">Risk Map</a></li>
          <li><a href="#contact" className="0lz7wczr hover:text-orange-500 transition">Contact</a></li>
        </ul>

        <button
          onClick={onLogin}
          className="0bwbad88 hidden md:block bg-orange-500 text-white px-5 py-2 rounded-xl hover:bg-orange-600 transition transform hover:scale-105"
        >
          Login
        </button>

        {/* Mobile Button */}
        <button
          className="04gzax1q md:hidden text-gray-700"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="09p5j8uc md:hidden bg-white shadow-md p-6 space-y-4 absolute w-full">
          <a href="#home" onClick={() => setOpen(false)} className="03lee7if block py-2 text-gray-700 hover:text-orange-500">Home</a>
          <a href="#features" onClick={() => setOpen(false)} className="0iit19g8 block py-2 text-gray-700 hover:text-orange-500">Features</a>
          <a href="#dashboard" onClick={() => setOpen(false)} className="0e6w50mp block py-2 text-gray-700 hover:text-orange-500">Dashboard</a>
          <a href="#risk-map" onClick={() => setOpen(false)} className="0d4t19y2 block py-2 text-gray-700 hover:text-orange-500">Risk Map</a>
          <a href="#contact" onClick={() => setOpen(false)} className="046035pd block py-2 text-gray-700 hover:text-orange-500">Contact</a>

          <button
            onClick={() => {
              setOpen(false);
              onLogin();
            }}
            className="0u0vr5hh w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition"
          >
            Login
          </button>
        </div>
      )}
    </nav>
  );
}
