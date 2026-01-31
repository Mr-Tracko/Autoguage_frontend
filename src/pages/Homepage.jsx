import React, { useState } from 'react';
import { ChevronRight, Zap, Brain, TrendingUp, Shield, Search, Heart, Star, MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
export default function HomePage() {
  const [email, setEmail] = useState('');

  const carBrands = [
    { name: 'Toyota', logo: './pictures/toyota.jpg' },
    { name: 'Hyundai', logo: './pictures/hyundai.jpg' },
    { name: 'Honda', logo: './pictures/honda.jpg' },
    { name: 'Tata', logo: './pictures/tatalogo.jpg' },
    { name: 'Mahindra', logo: './pictures/mahindra2.jpg' },
    { name: 'Kia', logo: './pictures/kia.png' },
    { name: 'Volkswagen', logo: './pictures/v3.jpg' },
    { name: 'Renault', logo: './pictures/reneault.jpg' },
    { name: 'Audi', logo: './pictures/audi.jpg' },
    { name: 'BMW', logo: './pictures/bmw3.jpg' },
    { name: 'Mercedes', logo: './pictures/mercedes.jpg' },
  ];

  const carTypes = [
    {
      name: 'Hatchback',
      image: '/pictures/hatchbackk.webp',
      desc: 'Mainly economical',
      count: '2,400+ listings'
    },
    {
      name: 'Sedan',
      image: '/pictures/sedannn.webp',
      desc: 'Comfortable daily use',
      count: '3,100+ listings'
    },
    {
      name: 'SUV',
      image: '/pictures/SUV.webp',
      desc: 'Spacious and powerful',
      count: '2,800+ listings'
    },
    {
      name: 'Lux-Sedan',
      image: '/pictures/lodii.webp',
      desc: 'Premium experience',
      count: '890+ listings'
    },
    {
      name: 'Luxury SUV',
      image: '/pictures/bmwww.webp',
      desc: 'Ultimate luxury',
      count: '650+ listings'
    },
  ];

  const customers = [
    {
      name: 'Rajesh Kumar',
      review: 'Got the best price for my old Swift. The AI valuation was spot on!',
      rating: 5,
      image: '👨‍💼'
    },
    {
      name: 'Priya Singh',
      review: 'Found my dream car here. The entire process was seamless and transparent.',
      rating: 5,
      image: '👩‍💼'
    },
    {
      name: 'Amit Patel',
      review: 'Excellent customer service and fair pricing. Highly recommended!',
      rating: 5,
      image: '👨‍💼'
    },
    {
      name: 'Sneha Sharma',
      review: 'The health score report gave me confidence in my purchase decision.',
      rating: 5,
      image: '👩‍💼'
    },
    {
      name: 'Vikram Mishra',
      review: 'Best platform for buying used cars. Trust and transparency at its finest.',
      rating: 5,
      image: '👨‍💼'
    },
  ];

  const testimonials = [
    {
      quote: 'We revolutionized the used car market by bringing trust and transparency.',
      author: 'Our Mission'
    },
    {
      quote: 'Technology meets trust. That\'s what drives us every single day.',
      author: 'Our Vision'
    },
    {
      quote: 'Every customer deserves fair pricing and complete peace of mind.',
      author: 'Our Promise'
    },
  ];

  const features = [
    {
      icon: Brain,
      title: 'AI Price Prediction',
      desc: 'Advanced ML models predict accurate vehicle prices in seconds'
    },
    {
      icon: Shield,
      title: 'Vehicle Health Score',
      desc: 'Comprehensive inspection reports and condition analysis'
    },
    {
      icon: TrendingUp,
      title: 'Market Insights',
      desc: 'Real-time price trends and market intelligence'
    },
    {
      icon: Search,
      title: 'Smart Search',
      desc: 'Find your perfect car with intelligent filters'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900 overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Image with Dark Overlay */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/pictures/picc1.jpg')",
          }}
        >
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/75 via-slate-900/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/75 via-transparent to-transparent"></div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col justify-center">
          <div className="text-center space-y-8">
            {/* Badge */}
            <div className="inline-block mx-auto">
              <span className="px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 border border-blue-200 rounded-full text-sm font-medium text-blue-700">
                ✨ AI-Powered Vehicle Intelligence Platform
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Know Your Car's
                <span className="block bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  True Value
                </span>
              </h1>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Get AI-predicted resale prices, vehicle health scores, and dealer insights. Make smarter decisions about your used vehicle.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-blue-600/30 transition hover:scale-105 transform">
                <Search className="w-5 h-5" />
                Predict the Price
              </button>
              <button className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-50 transition">
                Browse Cars
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-12 max-w-xl mx-auto">
              <div className="space-y-2">
                <p className="text-3xl font-bold text-blue-600">50K+</p>
                <p className="text-sm text-slate-600">Vehicles Valued</p>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-bold text-blue-600">99%</p>
                <p className="text-sm text-slate-600">Accuracy Rate</p>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-bold text-blue-600">5 sec</p>
                <p className="text-sm text-slate-600">Valuation Time</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Car Brands Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">
            Trusted by Leading Brands
          </h2>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-11 gap-6">
            {carBrands.map((brand, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center p-4 bg-white rounded-xl hover:bg-blue-50 hover:shadow-md transition group cursor-pointer border border-slate-200"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-12 h-12 object-contain mb-2 group-hover:scale-110 transition"
                />
                <p className="text-xs font-medium text-slate-700 text-center">
                  {brand.name}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-900">Why Choose AutoGauge AI?</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Powered by advanced AI and industry expertise, we deliver complete vehicle intelligence
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div key={i} className="group p-8 bg-gradient-to-br from-slate-50 to-blue-50 border-2 border-slate-200 hover:border-blue-400 rounded-2xl transition hover:shadow-lg">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">{feature.title}</h3>
                <p className="text-slate-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Car Types Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-900">Find Your Perfect Car Type</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Explore our wide range of vehicle categories
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {carTypes.map((type, i) => (
              <div key={i} className="group relative rounded-2xl overflow-hidden cursor-pointer h-72 border-2 border-slate-200 hover:border-blue-400 transition shadow-md hover:shadow-xl">
                {/* Background Image */}
                <div className="absolute inset-0  overflow-hidden">
                  <img src={type.image} alt={type.name} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition duration-300 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
                  <div></div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{type.name}</h3>
                    <p className="text-sm opacity-90 mb-2">{type.desc}</p>
                    <p className="text-xs font-medium opacity-75">{type.count}</p>
                  </div>
                </div>

                {/* Hover Arrow */}
                <div className="absolute bottom-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition transform group-hover:translate-x-1">
                  <ChevronRight className="w-5 h-5 text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Happy Customers Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-900">Happy Customers, Happy Stories</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Join thousands of satisfied customers who found their perfect vehicle
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {customers.map((customer, i) => (
              <div key={i} className="group p-6 bg-gradient-to-br from-slate-50 to-blue-50 border-2 border-slate-200 rounded-2xl hover:shadow-lg transition hover:border-blue-400">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">{customer.image}</span>
                  <div>
                    <h3 className="font-bold text-slate-900">{customer.name}</h3>
                    <div className="flex gap-1">
                      {[...Array(customer.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-slate-600 text-sm italic">"{customer.review}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Motivates Us - Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 via-white to-cyan-50 border-y border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-900">What Motivates Us</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our commitment to trust, transparency, and technology
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="relative p-8 bg-white rounded-2xl border-2 border-slate-200 hover:border-blue-400 hover:shadow-lg transition">
                <div className="absolute -top-4 left-8 text-4xl text-slate-300">"</div>
                <p className="text-lg font-medium text-slate-900 mb-6 leading-relaxed">
                  {testimonial.quote}
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{testimonial.author.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{testimonial.author}</p>
                    <p className="text-xs text-slate-500">AutoGauge AI</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">Stay Updated</h2>
          <p className="text-blue-100 mb-8">
            Get the latest car prices, market trends, and exclusive deals delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-6 py-3 bg-white/20 border border-white/30 backdrop-blur-sm rounded-lg placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-bold hover:bg-blue-50 transition">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <Footer/>
    </div>
  );
}