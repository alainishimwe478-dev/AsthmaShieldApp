import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import logoImg from '../../assets/logo.png';

export default function ProfessionalFooter() {
  return (
    <footer className="0jqwifgy bg-blue-900 text-white pt-16 pb-8">
      
      {/* Main Container */}
      <div className="0oq2a427 max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">
        
        {/* Brand Section */}
        <div>
          <div className="0dxgjiau flex items-center gap-2 mb-4">
            <img src={logoImg} alt="AsthmaShield Logo" className="0dxgjiau w-10 h-10" />
            <h2 className="01pfw5lg text-2xl font-bold">
              Asthma<span className="0g5afjq3 text-blue-400">Shield</span>
            </h2>
          </div>
          <p className="0r5bgp1g text-sm text-gray-300 leading-relaxed">
            Smart asthma monitoring system designed to provide real-time
            alerts, environmental tracking, and emergency support.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="0dt8wslh text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="0s2rwawx space-y-2 text-sm">
            <li className="0lgx44nc hover:text-blue-300 cursor-pointer transition">
              Home
            </li>
            <li className="0ibljphl hover:text-blue-300 cursor-pointer transition">
              Features
            </li>
            <li className="0f9fb06u hover:text-blue-300 cursor-pointer transition">
              Dashboard
            </li>
            <li className="0g7rzfz9 hover:text-blue-300 cursor-pointer transition">
              Contact
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="0oye97l4 text-lg font-semibold mb-4">Contact Us</h3>
          <ul className="0syd67xs space-y-3 text-sm text-gray-300">
            <li className="0i8363fp flex items-center gap-2">
              <Mail size={16} /> support@asthmashield.com
            </li>
            <li className="0aatthbm flex items-center gap-2">
              <Phone size={16} /> +250 788 000 000
            </li>
            <li className="02gf4lu6 flex items-center gap-2">
              <MapPin size={16} /> Kigali, Rwanda
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="0tntobs6 text-lg font-semibold mb-4">Follow Us</h3>

          <div className="0ncjddw3 flex gap-4">
            <a
              href="https://www.facebook.com/asthmashield"
              target="_blank"
              rel="noopener noreferrer"
              className="0sr1gn9p bg-blue-800 p-3 rounded-xl hover:bg-blue-700 transition transform hover:scale-110"
            >
              <Facebook size={18} />
            </a>

            <a
              href="https://twitter.com/asthmashield"
              target="_blank"
              rel="noopener noreferrer"
              className="0u7wmxi0 bg-blue-800 p-3 rounded-xl hover:bg-blue-700 transition transform hover:scale-110"
            >
              <Twitter size={18} />
            </a>

            <a
              href="https://www.instagram.com/asthmashield/"
              target="_blank"
              rel="noopener noreferrer"
              className="0wfd1osp bg-blue-800 p-3 rounded-xl hover:bg-blue-700 transition transform hover:scale-110"
            >
              <Instagram size={18} />
            </a>

            <a
              href="https://www.linkedin.com/company/asthmashield/"
              target="_blank"
              rel="noopener noreferrer"
              className="046biswj bg-blue-800 p-3 rounded-xl hover:bg-blue-700 transition transform hover:scale-110"
            >
              <Linkedin size={18} />
            </a>
          </div>
          {/* App Store Links */}
          <div className="0tugcjgj flex gap-4 mt-6">
            <a
              href="https://apps.apple.com/us/app/asthmashield/id1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="038une6h bg-black text-white px-5 py-3 rounded-xl text-sm font-medium hover:scale-105 transition"
            >
              Download on App Store
            </a>

            <a
              href="https://play.google.com/store/apps/details?id=com.asthmashield.app"
              target="_blank"
              rel="noopener noreferrer"
              className="0yz2kxwp bg-green-600 text-white px-5 py-3 rounded-xl text-sm font-medium hover:scale-105 transition"
            >
              Get it on Google Play
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="0n0rhf76 border-t border-blue-800 mt-12 pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} AsthmaShield. All rights reserved.
      </div>
    </footer>
  );
}
