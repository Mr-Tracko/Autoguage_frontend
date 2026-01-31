import React from 'react';
import { Zap, Facebook, Twitter, Linkedin, Instagram, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white text-slate-600 pt-16 pb-8 px-4 sm:px-6 lg:px-8 border-t border-slate-200">
      <div className="max-w-6xl mx-auto">
        {/* Footer Content */}
        <div className="grid md:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">AutoGauge AI</h3>
            </div>
            <p className="text-sm leading-relaxed text-slate-600">
              Revolutionizing the used car market with AI-powered transparency and trust.
            </p>
            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              <a href="#" className="hover:text-blue-600 transition p-2 hover:bg-slate-100 rounded-lg text-slate-500">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-blue-600 transition p-2 hover:bg-slate-100 rounded-lg text-slate-500">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-blue-600 transition p-2 hover:bg-slate-100 rounded-lg text-slate-500">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-blue-600 transition p-2 hover:bg-slate-100 rounded-lg text-slate-500">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-blue-600 transition text-slate-600">Home</a></li>
              <li><a href="/features" className="hover:text-blue-600 transition text-slate-600">Features</a></li>
              <li><a href="/Predict" className="hover:text-blue-600 transition text-slate-600">Price Prediction</a></li>
              <li><a href="/buy" className="hover:text-blue-600 transition text-slate-600">Buy Cars</a></li>
              <li><a href="/sell" className="hover:text-blue-600 transition text-slate-600">Sell Car</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-600 transition text-slate-600">Blog</a></li>
              <li><a href="#" className="hover:text-blue-600 transition text-slate-600">Market Trends</a></li>
              <li><a href="#" className="hover:text-blue-600 transition text-slate-600">Guides</a></li>
              <li><a href="#" className="hover:text-blue-600 transition text-slate-600">FAQ</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-600 transition text-slate-600">About Us</a></li>
              <li><a href="#" className="hover:text-blue-600 transition text-slate-600">Careers</a></li>
              <li><a href="#" className="hover:text-blue-600 transition text-slate-600">Press</a></li>
              <li><a href="#" className="hover:text-blue-600 transition text-slate-600">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-600" />
                <a href="tel:+919876543210" className="hover:text-blue-600 transition text-slate-600">+91 98765 43210</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-600" />
                <a href="mailto:support@autogauge.ai" className="hover:text-blue-600 transition text-slate-600">support@autogauge.ai</a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span className="text-slate-600">Mohali, Punjab, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-200 mb-8"></div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-slate-600">
          <p>&copy; 2024 AutoGauge AI. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-blue-600 transition">Privacy Policy</a>
            <a href="#" className="hover:text-blue-600 transition">Terms of Service</a>
            <a href="#" className="hover:text-blue-600 transition">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}