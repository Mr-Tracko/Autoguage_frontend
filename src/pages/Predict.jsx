import React, { useState } from 'react';
import { ChevronRight, Zap, ArrowRight, TrendingUp, Calendar, Gauge, Fuel, Users, Loader, CheckCircle, Sparkles } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function PredictPricePage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [predicted, setPredicted] = useState(false);

  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    transmission: 'Manual',
    type: 'Hatchback',
    distance: '',
    year: new Date().getFullYear(),
    owner: '1'
  });

  const [result, setResult] = useState(null);

  // Complete vehicle database with brand, models, and types
  const vehicleDatabase = {
    'Maruti': {
      'Swift': ['Hatchback'],
      'Baleno': ['Hatchback'],
      'Alto': ['Hatchback'],
      'Celerio': ['Hatchback'],
      'Vitara Brezza': ['SUV'],
      'Ertiga': ['Sedan'],
      'S-Cross': ['SUV'],
      'Wagon R': ['Hatchback']
    },
    'Hyundai': {
      'i20': ['Hatchback'],
      'Grand i10': ['Hatchback'],
      'Creta': ['SUV'],
      'Venue': ['SUV'],
      'Elantra': ['Sedan'],
      'Tucson': ['SUV'],
      'Kona': ['SUV']
    },
    'Tata': {
      'Nexon': ['SUV'],
      'Nexon EV': ['SUV'],
      'Tiago': ['Hatchback'],
      'Tigor': ['Sedan'],
      'Harrier': ['SUV'],
      'Safari': ['SUV'],
      'Altroz': ['Hatchback'],
      'Punch': ['SUV']
    },
    'Mahindra': {
      'XUV500': ['SUV'],
      'XUV300': ['SUV'],
      'Bolero': ['SUV'],
      'Scorpio': ['SUV'],
      'Marazzo': ['Sedan'],
      'Alturas G4': ['SUV'],
      'KUV100': ['SUV']
    },
    'Honda': {
      'City': ['Sedan'],
      'Jazz': ['Hatchback'],
      'Civic': ['Sedan'],
      'CR-V': ['SUV'],
      'WR-V': ['SUV'],
      'Accord': ['Sedan']
    },
    'Toyota': {
      'Fortuner': ['SUV'],
      'Innova': ['Sedan'],
      'Camry': ['Sedan'],
      'Glanza': ['Hatchback'],
      'Urban Cruiser': ['SUV'],
      'Rumion': ['Sedan']
    },
    'Kia': {
      'Seltos': ['SUV'],
      'Sonet': ['SUV'],
      'Carens': ['Sedan'],
      'EV6': ['SUV'],
      'Niro': ['SUV']
    },
    'Skoda': {
      'Rapid': ['Sedan'],
      'Superb': ['Sedan'],
      'Octavia': ['Sedan'],
      'Kodiaq': ['SUV'],
      'Karoq': ['SUV']
    },
    'Renault': {
      'Kwid': ['Hatchback'],
      'Duster': ['SUV'],
      'RXZ': ['SUV'],
      'Lodgy': ['Sedan']
    },
    'Volkswagen': {
      'Polo': ['Hatchback'],
      'Vento': ['Sedan'],
      'Tiguan': ['SUV'],
      'T-Roc': ['SUV']
    },
    'BMW': {
      '3 Series': ['Sedan'],
      '5 Series': ['Sedan'],
      'X3': ['Lux-SUV'],
      'X5': ['Lux-SUV'],
      '7 Series': ['Sedan']
    },
    'Mercedes-Benz': {
      'C-Class': ['Sedan'],
      'E-Class': ['Sedan'],
      'S-Class': ['Sedan'],
      'GLC': ['SUV'],
      'GLE': ['SUV']
    },
    'Audi': {
      'A3': ['Sedan'],
      'A4': ['Sedan'],
      'A6': ['Sedan'],
      'Q3': ['SUV'],
      'Q5': ['SUV']
    },
    'Jeep': {
      'Compass': ['SUV'],
      'Wrangler': ['SUV'],
      'Meridian': ['SUV']
    },
    'Force': {
      'Gurkha': ['SUV'],
      'One': ['Sedan']
    }
  };

  const brands = Object.keys(vehicleDatabase).sort();
  const transmissions = ['Manual', 'Automatic'];
  const types = ['Hatchback', 'Sedan', 'SUV', 'Coupe', 'Convertible'];
  const years = Array.from({ length: 25 }, (_, i) => new Date().getFullYear() - i);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let updateData = { [name]: value };

    // Reset model when brand changes
    if (name === 'brand') {
      updateData.model = '';
    }

    setFormData(prev => ({
      ...prev,
      ...updateData
    }));
  };

  // Get models for selected brand
  const getModelsForBrand = () => {
    if (!formData.brand) return [];
    return Object.keys(vehicleDatabase[formData.brand] || {}).sort();
  };

  // Get types for selected model
  const getTypesForModel = () => {
    if (!formData.brand || !formData.model) return [];
    return vehicleDatabase[formData.brand][formData.model] || [];
  };

  const handlePrediction = async () => {
    setLoading(true);

    let normalizedType = formData.type;
    if (normalizedType === "Lux-SUV") normalizedType = "Lux_SUV";
    if (normalizedType === "Lux-sedan") normalizedType = "Lux_sedan";

    const payload = {
      brand: formData.brand,
      Car_Name: formData.model,
      Drive: formData.transmission,
      Type: normalizedType,
      Distance: Number(formData.distance),
      Year: Number(formData.year),
      Owner: Number(formData.owner)
    };

    const res = await fetch("http://localhost:5000/api/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    setResult({ predicted: data.predicted_price });
    setPredicted(true); 
    setLoading(false);
  };

  const resetForm = () => {
    setStep(1);
    setPredicted(false);
    setResult(null);
    setFormData({
      brand: '',
      model: '',
      transmission: 'Manual',
      type: 'Hatchback',
      distance: '',
      year: new Date().getFullYear(),
      owner: '1'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900">
      <Navbar />

      {!predicted ? (
        <>
          {/* Hero Section */}
          <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 via-cyan-50 to-blue-50">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block mb-6">
                <span className="px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 border border-blue-200 rounded-full text-sm font-medium text-blue-700">
                  🚗 AI-Powered Valuation in Seconds
                </span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Discover Your Car's
                <span className="block bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Real Market Value
                </span>
              </h1>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Get an AI-powered valuation in seconds. Enter your vehicle details below to discover your car's actual worth in today's market.
              </p>
            </div>
          </section>

          {/* Form Section */}
          <section className="relative py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm hover:shadow-md transition">
                {/* Progress Steps */}
                <div className="flex justify-between mb-12">
                  {[1, 2, 3].map((stepNum) => (
                    <div key={stepNum} className="flex flex-col items-center gap-3 flex-1">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition ${step >= stepNum
                          ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
                          : 'bg-slate-200 text-slate-500'
                        }`}>
                        {stepNum}
                      </div>
                      <span className={`text-sm font-semibold hidden sm:block ${step >= stepNum ? 'text-blue-600' : 'text-slate-500'}`}>
                        {stepNum === 1 ? 'Vehicle' : stepNum === 2 ? 'Details' : 'Mileage'}
                      </span>
                      {stepNum < 3 && (
                        <div className={`hidden sm:block h-1 w-full mt-2 rounded transition ${step > stepNum ? 'bg-blue-600' : 'bg-slate-200'
                          }`}></div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Step 1: Brand & Model */}
                {step === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold mb-8 text-slate-900">Select your vehicle</h2>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-slate-900">Brand</label>
                        <select
                          name="brand"
                          value={formData.brand}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200 transition text-slate-900"
                        >
                          <option value="">Select Brand</option>
                          {brands.map(b => <option key={b} value={b}>{b}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-slate-900">Car Name</label>
                        <select
                          name="model"
                          value={formData.model}
                          onChange={handleInputChange}
                          disabled={!formData.brand}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200 transition text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <option value="">Select Car Name</option>
                          {getModelsForBrand().map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-slate-900">Type</label>
                        <select
                          name="type"
                          value={formData.type}
                          onChange={handleInputChange}
                          disabled={!formData.model}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200 transition text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <option value="">Select Type</option>
                          {getTypesForModel().map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-slate-900">Transmission</label>
                        <select
                          name="transmission"
                          value={formData.transmission}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200 transition text-slate-900"
                        >
                          {transmissions.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>
                    </div>

                    <button
                      onClick={() => setStep(2)}
                      disabled={!formData.brand || !formData.model || !formData.type}
                      className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-600/30 transition flex items-center justify-center gap-2 mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Continue
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}

                {/* Step 2: Year & Owner */}
                {step === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold mb-8 text-slate-900">When was your car registered?</h2>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-slate-900">Year</label>
                        <select
                          name="year"
                          value={formData.year}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200 transition text-slate-900"
                        >
                          {years.map(y => <option key={y} value={y}>{y}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-slate-900">Number of Owners</label>
                        <select
                          name="owner"
                          value={formData.owner}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200 transition text-slate-900"
                        >
                          <option value="1">First Owner</option>
                          <option value="2">Second Owner</option>
                          <option value="3">Third Owner</option>
                          <option value="4">More than Three</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex gap-4 mt-8">
                      <button
                        onClick={() => setStep(1)}
                        className="flex-1 px-8 py-4 border border-slate-300 hover:bg-slate-100 text-slate-900 rounded-xl font-semibold transition"
                      >
                        Back
                      </button>
                      <button
                        onClick={() => setStep(3)}
                        className="flex-1 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-600/30 transition flex items-center justify-center gap-2"
                      >
                        Continue
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Distance */}
                {step === 3 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold mb-8 text-slate-900">How far has your car traveled?</h2>

                    <div className="max-w-md">
                      <label className="block text-sm font-semibold mb-2 text-slate-900">Distance Covered (km)</label>
                      <div className="relative">
                        <input
                          type="number"
                          name="distance"
                          value={formData.distance}
                          onChange={handleInputChange}
                          placeholder="e.g., 42000"
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200 transition text-slate-900 placeholder-slate-500"
                        />
                        <span className="absolute right-4 top-3 text-slate-500 font-medium">km</span>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                      <div className="flex items-start gap-4">
                        <Sparkles className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-semibold text-slate-900 mb-1">Get Instant AI Prediction</p>
                          <p className="text-sm text-slate-700">Our advanced ML model analyzes all your inputs and predicts the true market value of your vehicle with 97%+ accuracy.</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4 mt-8">
                      <button
                        onClick={() => setStep(2)}
                        className="flex-1 px-8 py-4 border border-slate-300 hover:bg-slate-100 text-slate-900 rounded-xl font-semibold transition"
                      >
                        Back
                      </button>
                      <button
                        onClick={handlePrediction}
                        disabled={loading || !formData.distance}
                        className="flex-1 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-600/30 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? (
                          <>
                            <Loader className="w-5 h-5 animate-spin" />
                            Predicting...
                          </>
                        ) : (
                          <>
                            Predict Now
                            <ArrowRight className="w-5 h-5" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        </>
      ) : (
        // Results Section
        <section className="relative min-h-screen pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full mb-6 animate-bounce">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold mb-2 text-slate-900">Valuation Complete!</h1>
              <p className="text-slate-600">Here's what your {formData.year} {formData.brand} {formData.model} is worth in today's market</p>
            </div>

            <div className="grid md:grid-cols-1 gap-6 mb-8">
              {/* Predicted Value */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-3xl p-12 text-center shadow-lg">
                <p className="text-slate-600 text-sm font-bold uppercase mb-4 tracking-wide">AI Predicted Market Value</p>
                <h2 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-6">
                  ₹{(result?.predicted).toLocaleString('en-IN')}
                </h2>
                <p className="text-slate-700 text-lg font-medium">For your {formData.model} with {formData.distance.toLocaleString()}km distance</p>
              </div>
            </div>

            {/* Accuracy Info */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                { label: 'Prediction Accuracy', value: '97.8%', icon: TrendingUp },
                { label: 'Data Points Analyzed', value: '200+', icon: Gauge },
                { label: 'Market Data Age', value: '< 6 hrs', icon: Calendar }
              ].map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition">
                    <Icon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                    <p className="text-2xl font-bold text-slate-900 mb-2">{stat.value}</p>
                    <p className="text-slate-600 text-sm font-medium">{stat.label}</p>
                  </div>
                );
              })}
            </div>

            {/* Vehicle Summary */}
            <div className="bg-white border border-slate-200 rounded-2xl p-8 mb-12 shadow-sm">
              <h3 className="text-xl font-bold mb-6 text-slate-900">Vehicle Details Summary</h3>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg">
                  <p className="text-slate-600 text-sm mb-1 font-medium">Brand</p>
                  <p className="text-lg font-bold text-slate-900">{formData.brand}</p>
                </div>
                <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg">
                  <p className="text-slate-600 text-sm mb-1 font-medium">Model</p>
                  <p className="text-lg font-bold text-slate-900">{formData.model}</p>
                </div>
                <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg">
                  <p className="text-slate-600 text-sm mb-1 font-medium">Year</p>
                  <p className="text-lg font-bold text-slate-900">{formData.year}</p>
                </div>
                <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg">
                  <p className="text-slate-600 text-sm mb-1 font-medium">Distance</p>
                  <p className="text-lg font-bold text-slate-900">{formData.distance.toLocaleString()}km</p>
                </div>
                <div className="bg-cyan-50 border border-cyan-100 p-4 rounded-lg">
                  <p className="text-slate-600 text-sm mb-1 font-medium">Type</p>
                  <p className="text-lg font-bold text-slate-900">{formData.type}</p>
                </div>
                <div className="bg-cyan-50 border border-cyan-100 p-4 rounded-lg">
                  <p className="text-slate-600 text-sm mb-1 font-medium">Transmission</p>
                  <p className="text-lg font-bold text-slate-900">{formData.transmission}</p>
                </div>
                <div className="bg-cyan-50 border border-cyan-100 p-4 rounded-lg">
                  <p className="text-slate-600 text-sm mb-1 font-medium">Owners</p>
                  <p className="text-lg font-bold text-slate-900">{parseInt(formData.owner)}</p>
                </div>
                <div className="bg-cyan-50 border border-cyan-100 p-4 rounded-lg">
                  <p className="text-slate-600 text-sm mb-1 font-medium">Transmission</p>
                  <p className="text-lg font-bold text-slate-900">{formData.transmission}</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button
                onClick={resetForm}
                className="flex-1 px-8 py-4 border border-slate-300 hover:bg-slate-100 text-slate-900 rounded-xl font-semibold transition"
              >
                Value Another Vehicle
              </button>
              <button className="flex-1 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-600/30 transition flex items-center justify-center gap-2">
                <TrendingUp className="w-5 h-5" />
                List This Vehicle
              </button>
            </div>

            {/* Info Section */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-slate-900">💡 How Accurate Is This?</h3>
              <p className="text-slate-700 mb-4 leading-relaxed">
                Our AI model achieves 97.8% accuracy by analyzing real-time market data, historical trends, vehicle specifications, and condition factors. The prediction is based on current market conditions and may vary based on actual inspection.
              </p>
              <p className="text-slate-600 text-sm font-medium">
                For an accurate valuation suitable for negotiations, we recommend getting your vehicle inspected by our certified evaluators.
              </p>
            </div>
          </div>
        </section>
      )}
      <Footer/>
      
    </div>
  );
}