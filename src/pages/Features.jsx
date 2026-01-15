import React, { useState } from 'react';
import { ChevronRight, Brain, Shield, TrendingUp, BarChart3, Zap, Search, Check, ArrowRight } from 'lucide-react';
import Navbar from './Navbar';

export default function FeaturesPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

//   const CurrentIcon = features[activeTab].icon;
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      id: 0,
      title: "AI-Powered Valuation",
      subtitle: "Intelligent Price Prediction",
      description: "Our advanced AI engine analyzes thousands of data points to predict accurate resale prices in seconds.",
      icon: Brain,
      color: "from-cyan-400 to-blue-500",
      benefits: [
        "Real-time market analysis",
        "Historical price trends",
        "Model-specific algorithms",
        "Seasonal adjustments"
      ],
      stats: "±5% accuracy rate"
    },
    {
      id: 1,
      title: "Vehicle Health Score",
      subtitle: "Comprehensive Condition Analysis",
      description: "Get a detailed health report covering mechanical, structural, and cosmetic aspects of any vehicle.",
      icon: Shield,
      color: "from-emerald-400 to-teal-500",
      benefits: [
        "Engine diagnostics",
        "Body condition scan",
        "Interior quality check",
        "Service history review"
      ],
      stats: "200+ data points analyzed"
    },
    {
      id: 2,
      title: "Market Insights",
      subtitle: "Price Trend Intelligence",
      description: "Track real-time market movements and identify overpriced or underpriced vehicles instantly.",
      icon: TrendingUp,
      color: "from-violet-400 to-purple-500",
      benefits: [
        "Price volatility tracking",
        "Comparative analysis",
        "Dealer markup detection",
        "Seasonal price patterns"
      ],
      stats: "Updated every 6 hours"
    },
    {
      id: 3,
      title: "Vehicle Comparison",
      subtitle: "Side-by-Side Analysis",
      description: "Compare multiple vehicles across valuation, health, features, and market value metrics.",
      icon: BarChart3,
      color: "from-orange-400 to-red-500",
      benefits: [
        "Multi-vehicle comparison",
        "Feature matching",
        "Value proposition analysis",
        "Price/performance ratio"
      ],
      stats: "Compare up to 10 vehicles"
    }
  ];

  const CurrentIcon = features[activeTab].icon;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar/>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block mb-6">
            <span className="px-4 py-2 bg-slate-900/50 border border-cyan-400/30 rounded-full text-sm text-cyan-400 backdrop-blur-sm">
              ✨ Powerful Features Built for You
            </span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Everything You Need for
            <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Vehicle Intelligence
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Comprehensive tools designed to give you complete visibility into vehicle valuation, health, and market dynamics.
          </p>
        </div>
      </section>

      {/* Main Features Showcase */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-4 mb-16 justify-center">
            {features.map((feature, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`px-6 py-3 rounded-xl font-semibold transition flex items-center gap-2 ${
                  activeTab === idx
                    ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 shadow-lg shadow-cyan-400/50'
                    : 'bg-slate-900/50 border border-slate-800 hover:border-cyan-400/50 text-slate-300'
                }`}
              >
                <feature.icon className="w-5 h-5" />
                {feature.title}
              </button>
            ))}
          </div>

          {/* Feature Detail */}
          <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-800 rounded-3xl p-12 overflow-hidden relative">
            {/* Background Gradient Accent */}
            <div className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl ${features[activeTab].color} opacity-5 rounded-full blur-3xl`}></div>

            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-8">
                <div>
                  <div className="inline-flex items-center gap-3 mb-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${features[activeTab].color} rounded-2xl flex items-center justify-center`}>
                      <CurrentIcon className="w-8 h-8" />
                    </div>
                    <div>
                      <p className={`text-sm font-semibold bg-gradient-to-r ${features[activeTab].color} bg-clip-text text-transparent`}>
                        {features[activeTab].color === 'from-cyan-400 to-blue-500' ? 'MAIN FEATURE' : 'ADVANCED FEATURE'}
                      </p>
                      <h3 className="text-2xl font-bold">{features[activeTab].subtitle}</h3>
                    </div>
                  </div>
                  <p className="text-lg text-slate-300">
                    {features[activeTab].description}
                  </p>
                </div>

                {/* Benefits List */}
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wide">Key Benefits</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {features[activeTab].benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Check className={`w-5 h-5 flex-shrink-0 mt-1 bg-gradient-to-r ${features[activeTab].color} bg-clip-text text-transparent`} />
                        <span className="text-slate-300">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stat */}
                <div className={`p-4 bg-gradient-to-r ${features[activeTab].color} bg-opacity-5 border border-gradient-to-r ${features[activeTab].color} rounded-xl`}>
                  <p className="text-sm text-slate-400 mb-1">Performance</p>
                  <p className={`text-2xl font-bold bg-gradient-to-r ${features[activeTab].color} bg-clip-text text-transparent`}>
                    {features[activeTab].stats}
                  </p>
                </div>

                <button className={`w-full px-8 py-3 bg-gradient-to-r ${features[activeTab].color} text-slate-950 rounded-xl font-semibold hover:shadow-lg transition flex items-center justify-center gap-2 group`}>
                  Explore Feature
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                </button>
              </div>

              {/* Right Visual */}
              <div className="relative">
                <div className={`w-full aspect-square bg-gradient-to-br ${features[activeTab].color} opacity-10 rounded-2xl`}></div>
                <div className={`absolute inset-4 bg-gradient-to-t from-slate-950 to-transparent rounded-xl border border-slate-700`}></div>
                <div className={`absolute inset-8 flex items-center justify-center`}>
                  <div className={`w-24 h-24 bg-gradient-to-br ${features[activeTab].color} rounded-xl flex items-center justify-center opacity-80`}>
                    <CurrentIcon className="w-12 h-12 text-slate-950" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Features Grid */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Additional Capabilities</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Beyond core features, AutoGauge AI offers a range of tools to enhance your vehicle decisions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Instant Valuation", desc: "Get price estimates in under 10 seconds with just basic vehicle details" },
              { title: "Dealer Detection", desc: "Identify overpriced vehicles and unfair dealer markups automatically" },
              { title: "Export Reports", desc: "Download detailed vehicle reports in PDF format for your records" },
              { title: "Price Alerts", desc: "Set alerts for vehicles matching your criteria and price ranges" },
              { title: "History Check", desc: "Access accident, ownership, and service history in one place" },
              { title: "Mobile App", desc: "Value vehicles on-the-go with our native iOS and Android apps" }
            ].map((item, idx) => (
              <div key={idx} className="group p-8 bg-slate-900/50 border border-slate-800 hover:border-cyan-400/50 rounded-2xl transition hover:shadow-lg hover:shadow-cyan-400/10">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
                  <Check className="w-6 h-6 text-slate-950" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why AutoGauge Stands Out</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Compare our intelligent platform with traditional vehicle valuation methods
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-900/50 border-b border-slate-800">
                  <th className="px-8 py-4 text-left font-semibold text-slate-300">Feature</th>
                  <th className="px-8 py-4 text-center font-semibold text-slate-300">AutoGauge AI</th>
                  <th className="px-8 py-4 text-center font-semibold text-slate-300">Manual Inspection</th>
                  <th className="px-8 py-4 text-center font-semibold text-slate-300">Generic Tools</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Valuation Speed", autogauge: "10 seconds", manual: "2-3 hours", generic: "5-10 minutes" },
                  { feature: "Accuracy", autogauge: "±5%", manual: "±15%", generic: "±20%" },
                  { feature: "Data Points", autogauge: "200+", manual: "30-50", generic: "50-100" },
                  { feature: "Market Insights", autogauge: "Real-time", manual: "Manual", generic: "Delayed" },
                  { feature: "Scalability", autogauge: "Unlimited", manual: "Limited", generic: "Limited" },
                  { feature: "Cost", autogauge: "Free to use", manual: "₹500-2000", generic: "₹100-500" }
                ].map((row, idx) => (
                  <tr key={idx} className="border-b border-slate-800/50 hover:bg-slate-900/30 transition">
                    <td className="px-8 py-4 font-semibold text-slate-300">{row.feature}</td>
                    <td className="px-8 py-4 text-center text-cyan-400 font-semibold">{row.autogauge}</td>
                    <td className="px-8 py-4 text-center text-slate-400">{row.manual}</td>
                    <td className="px-8 py-4 text-center text-slate-400">{row.generic}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-slate-900/80 to-slate-900/40 border border-cyan-400/20 backdrop-blur-sm rounded-3xl p-8 sm:p-12 text-center">
            <h2 className="text-4xl font-bold mb-4">Experience All Features Free</h2>
            <p className="text-slate-300 mb-8 text-lg max-w-2xl mx-auto">
              Start valuing vehicles right now. No credit card required. No hidden fees.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-400/50 transition flex items-center justify-center gap-2">
                <Search className="w-5 h-5" />
                Value Your Vehicle
              </button>
              <button className="px-8 py-4 border border-slate-700 hover:border-cyan-400/50 rounded-xl font-semibold transition hover:bg-slate-900/50">
                View Pricing
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