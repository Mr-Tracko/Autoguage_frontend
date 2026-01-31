import React, { useState } from 'react';
import { ChevronRight, Brain, Shield, TrendingUp, BarChart3, Zap, Search, Check, ArrowRight, Gauge, Fuel, MapPin, Star, Calendar, AlertCircle, Bell } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function FeaturesPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

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
      color: "from-blue-600 to-cyan-600",
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
      color: "from-green-600 to-emerald-600",
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
      color: "from-purple-600 to-violet-600",
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
      color: "from-orange-600 to-red-600",
      benefits: [
        "Multi-vehicle comparison",
        "Feature matching",
        "Value proposition analysis",
        "Price/performance ratio"
      ],
      stats: "Compare up to 10 vehicles"
    }
  ];

  const carTypes = [
    {
      name: 'Hatchback',
      image: '/pictures/hatchbackk.webp',
      desc: 'Compact and economical',
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

  const additionalFeatures = [
    { title: "Instant Valuation", desc: "Get price estimates in under 10 seconds with just basic vehicle details", icon: Zap },
    { title: "Dealer Detection", desc: "Identify overpriced vehicles and unfair dealer markups automatically", icon: AlertCircle },
    { title: "Export Reports", desc: "Download detailed vehicle reports in PDF format for your records", icon: Check },
    { title: "Price Alerts", desc: "Set alerts for vehicles matching your criteria and price ranges", icon: Bell },
    { title: "History Check", desc: "Access accident, ownership, and service history in one place", icon: Calendar },
    { title: "Mobile App", desc: "Value vehicles on-the-go with our native iOS and Android apps", icon: Search }
  ];

  const CurrentIcon = features[activeTab].icon;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 via-cyan-50 to-blue-50">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block mb-6">
            <span className="px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 border border-blue-200 rounded-full text-sm font-medium text-blue-700">
              ✨ Powerful Features Built for You
            </span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Everything You Need for
            <span className="block bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Vehicle Intelligence
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Comprehensive tools designed to give you complete visibility into vehicle valuation, health, and market dynamics.
          </p>
        </div>
      </section>

      {/* Main Features Showcase */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-3 mb-16 justify-center">
            {features.map((feature, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`px-6 py-3 rounded-xl font-semibold transition flex items-center gap-2 ${
                  activeTab === idx
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-600/30'
                    : 'bg-slate-100 border border-slate-200 hover:border-blue-400 text-slate-700'
                }`}
              >
                <feature.icon className="w-5 h-5" />
                {feature.title}
              </button>
            ))}
          </div>

          {/* Feature Detail */}
          <div className="bg-white border-2 border-slate-200 rounded-3xl p-8 sm:p-12 overflow-hidden shadow-sm hover:shadow-md transition">
            {/* Background Gradient Accent */}
            <div className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl ${features[activeTab].color} opacity-5 rounded-full blur-3xl`}></div>

            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-8">
                <div>
                  <div className="inline-flex items-center gap-3 mb-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${features[activeTab].color} rounded-2xl flex items-center justify-center`}>
                      <CurrentIcon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <p className={`text-sm font-bold text-blue-600`}>
                        {features[activeTab].id === 0 ? 'PRIMARY FEATURE' : 'ADVANCED FEATURE'}
                      </p>
                      <h3 className="text-2xl font-bold text-slate-900">{features[activeTab].subtitle}</h3>
                    </div>
                  </div>
                  <p className="text-lg text-slate-700">
                    {features[activeTab].description}
                  </p>
                </div>

                {/* Benefits List */}
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Key Benefits</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {features[activeTab].benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Check className={`w-5 h-5 flex-shrink-0 mt-1 text-blue-600`} />
                        <span className="text-slate-700 font-medium">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stat */}
                <div className={`p-4 bg-blue-50 border border-blue-200 rounded-xl`}>
                  <p className="text-sm text-slate-600 mb-1 font-medium">Performance</p>
                  <p className={`text-2xl font-bold text-blue-600`}>
                    {features[activeTab].stats}
                  </p>
                </div>

                <button className={`w-full px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-600/30 transition flex items-center justify-center gap-2 group`}>
                  Explore Feature
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                </button>
              </div>

              {/* Right Visual */}
              <div className="relative">
                <div className={`w-full aspect-square bg-gradient-to-br ${features[activeTab].color} opacity-10 rounded-2xl`}></div>
                <div className={`absolute inset-4 bg-gradient-to-t from-blue-50 to-transparent rounded-xl border border-slate-200`}></div>
                <div className={`absolute inset-8 flex items-center justify-center`}>
                  <div className={`w-24 h-24 bg-gradient-to-br ${features[activeTab].color} rounded-xl flex items-center justify-center opacity-90`}>
                    <CurrentIcon className="w-12 h-12 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Car Types Section - Same as Homepage */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-900">Intelligent Features for Every Car Type</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our advanced tools work perfectly across all vehicle categories
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6 w-full">
            {carTypes.map((type, i) => (
              <div key={i} className="group relative rounded-2xl overflow-hidden cursor-pointer h-72 border-2 border-slate-200 hover:border-blue-400 transition shadow-md hover:shadow-xl w-full">
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

      {/* Quick Features Grid */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-900">Additional Capabilities</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Beyond core features, AutoGauge AI offers a range of tools to enhance your vehicle decisions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalFeatures.map((item, idx) => (
              <div key={idx} className="group p-8 bg-gradient-to-br from-slate-50 to-blue-50 border-2 border-slate-200 hover:border-blue-400 rounded-2xl transition hover:shadow-lg">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-slate-900">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-900">Why AutoGauge Stands Out</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Compare our intelligent platform with traditional vehicle valuation methods
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="bg-blue-50 border-b border-slate-200">
                  <th className="px-8 py-4 text-left font-bold text-slate-900">Feature</th>
                  <th className="px-8 py-4 text-center font-bold text-blue-600">AutoGauge AI</th>
                  <th className="px-8 py-4 text-center font-bold text-slate-700">Manual Inspection</th>
                  <th className="px-8 py-4 text-center font-bold text-slate-700">Generic Tools</th>
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
                  <tr key={idx} className="border-b border-slate-200 hover:bg-blue-50 transition">
                    <td className="px-8 py-4 font-bold text-slate-900">{row.feature}</td>
                    <td className="px-8 py-4 text-center text-blue-600 font-bold">{row.autogauge}</td>
                    <td className="px-8 py-4 text-center text-slate-700">{row.manual}</td>
                    <td className="px-8 py-4 text-center text-slate-700">{row.generic}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 via-white to-cyan-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white border-2 border-slate-200 rounded-3xl p-8 sm:p-12 text-center shadow-sm hover:shadow-md transition">
            <h2 className="text-4xl font-bold mb-4 text-slate-900">Experience All Features Free</h2>
            <p className="text-slate-700 mb-8 text-lg max-w-2xl mx-auto font-medium">
              Start valuing vehicles right now. No credit card required. No hidden fees.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-600/30 transition flex items-center justify-center gap-2">
                <Search className="w-5 h-5" />
                Value Your Vehicle
              </button>
              <button className="px-8 py-4 border-2 border-slate-300 text-slate-900 rounded-xl font-semibold hover:bg-slate-100 transition">
                View Pricing
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer/>
    </div>
  );
}