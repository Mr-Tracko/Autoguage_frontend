import React, { useState } from 'react';
import { ChevronRight, Zap, Brain, TrendingUp, Shield, Search } from 'lucide-react';
import Navbar from './Navbar';
export default function HomePage() {
  const [email, setEmail] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      <Navbar/>

      {/* Hero Section with Background Image */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Image - Full Screen */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/pictures/photo1.webp" 
            alt="Vehicle" 
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-block">
                <span className="px-4 py-2 bg-slate-900/50 border border-cyan-400/30 rounded-full text-sm text-cyan-400 backdrop-blur-sm">
                  ✨ AI-Powered Vehicle Intelligence
                </span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Know Your Car's
                <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  True Value
                </span>
              </h1>
              <p className="text-lg text-slate-300 max-w-xl">
                Get AI-predicted resale prices, vehicle health scores, and dealer insights in seconds. Make smarter decisions about your used vehicle.
              </p>
            </div>

            {/* CTA Section */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-cyan-400/50 transition hover:scale-105 transform">
                <Search className="w-5 h-5" />
                Value My Vehicle
              </button>
              <button className="px-8 py-4 border border-slate-700 hover:border-cyan-400/50 rounded-xl font-semibold flex items-center justify-center gap-2 transition hover:bg-slate-900/50">
                Learn More
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="space-y-2">
                <p className="text-3xl font-bold text-cyan-400">50K+</p>
                <p className="text-sm text-slate-400">Vehicles Valued</p>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-bold text-cyan-400">99%</p>
                <p className="text-sm text-slate-400">Accuracy Rate</p>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-bold text-cyan-400">10 sec</p>
                <p className="text-sm text-slate-400">Valuation Time</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose AutoGauge AI?</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Powered by advanced AI, our platform gives you complete vehicle intelligence
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Brain,
                title: "AI Valuation",
                desc: "Intelligent price prediction based on market data & vehicle condition"
              },
              {
                icon: Shield,
                title: "Health Score",
                desc: "Comprehensive vehicle health assessment and condition analysis"
              },
              {
                icon: TrendingUp,
                title: "Market Insights",
                desc: "Track price trends and detect overpriced vehicles instantly"
              }
            ].map((feature, i) => (
              <div key={i} className="group p-8 bg-slate-900/50 border border-slate-800 hover:border-cyan-400/50 rounded-2xl transition hover:shadow-lg hover:shadow-cyan-400/10">
                <feature.icon className="w-12 h-12 text-cyan-400 mb-4 group-hover:scale-110 transition" />
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-slate-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-slate-900/80 to-slate-900/40 border border-cyan-400/20 backdrop-blur-sm rounded-3xl p-8 sm:p-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to value your vehicle?</h2>
            <p className="text-slate-300 mb-8 text-lg">
              Get instant AI insights about your car or bike. No registration required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-6 py-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:outline-none focus:border-cyan-400 transition text-white"
              />
              <button className="px-8 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-400/50 transition">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center text-slate-400 text-sm">
          <p>&copy; 2024 AutoGauge AI. All rights reserved.</p>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <a href="#" className="hover:text-cyan-400 transition">Privacy</a>
            <a href="#" className="hover:text-cyan-400 transition">Terms</a>
            <a href="#" className="hover:text-cyan-400 transition">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}