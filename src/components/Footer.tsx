import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, Lock } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 pt-16 pb-8 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
                <span className="text-xl font-bold">M</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">MindDental</span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              Providing world-class dental care with a gentle touch. Our mission is to give you a healthy, beautiful smile that lasts a lifetime.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-blue-500 transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="hover:text-blue-500 transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="hover:text-blue-500 transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="hover:text-blue-500 transition-colors"><Linkedin className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 text-sm font-bold uppercase tracking-wider text-white">Quick Links</h3>
            <ul className="space-y-4 text-sm">
              <li><Link to="/" className="hover:text-blue-500 transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-blue-500 transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-blue-500 transition-colors">Services</Link></li>
              <li><Link to="/book" className="hover:text-blue-500 transition-colors">Book Appointment</Link></li>
              <li><Link to="/contact" className="hover:text-blue-500 transition-colors">Contact</Link></li>
              <li className="pt-2 border-t border-gray-800">
                <Link to="/admin" className="flex items-center gap-2 text-gray-500 hover:text-blue-400 transition-colors text-xs font-bold">
                  <Lock className="h-3 w-3" />
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-6 text-sm font-bold uppercase tracking-wider text-white">Our Services</h3>
            <ul className="space-y-4 text-sm">
              <li><Link to="/services" className="hover:text-blue-500 transition-colors">Teeth Cleaning</Link></li>
              <li><Link to="/services" className="hover:text-blue-500 transition-colors">Root Canal Treatment</Link></li>
              <li><Link to="/services" className="hover:text-blue-500 transition-colors">Dental Implants</Link></li>
              <li><Link to="/services" className="hover:text-blue-500 transition-colors">Teeth Whitening</Link></li>
              <li><Link to="/services" className="hover:text-blue-500 transition-colors">Braces & Invisalign</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-6 text-sm font-bold uppercase tracking-wider text-white">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 text-blue-500" />
                <span>123 Dental Street, Medical Plaza,<br />New Delhi, India - 110001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-blue-500" />
                <a href="tel:9142645990" className="hover:text-blue-500 transition-colors">+91 9142645990</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-500" />
                <a href="mailto:info@minddental.com" className="hover:text-blue-500 transition-colors">info@minddental.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-gray-800 pt-8 text-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} MindDental Clinic. All rights reserved. Designed for excellence.</p>
        </div>
      </div>
    </footer>
  );
}
