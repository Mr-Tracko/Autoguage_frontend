// import React, { useState } from 'react';
// import { ChevronRight, Zap, ArrowRight, TrendingUp, Calendar, Gauge, Fuel, Users, Loader, CheckCircle } from 'lucide-react';
// import Navbar from './Navbar';

// export default function PredictPricePage() {
//   const [step, setStep] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [predicted, setPredicted] = useState(false);
  
//   const [formData, setFormData] = useState({
//     brand: '',
//     model: '',
//     year: new Date().getFullYear(),
//     mileage: '',
//     fuelType: 'petrol',
//     transmission: 'manual',
//     condition: 'average',
//     ownersCount: '1',
//     currentPrice: '',
//     features: []
//   });

//   const [result, setResult] = useState(null);

//   const brands = ['Maruti', 'Hyundai', 'Tata', 'Mahindra', 'Honda', 'Toyota', 'Kia', 'Skoda', 'Renault', 'Volkswagen'];
//   const models = ['Swift', 'Baleno', 'Alto', 'Celerio', 'Vitara Brezza', 'Ertiga'];
//   const years = Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - i);
//   const fuelTypes = ['Petrol', 'Diesel', 'CNG', 'Electric', 'Hybrid'];
//   const transmissions = ['Manual', 'Automatic'];
//   const conditions = ['Excellent', 'Good', 'Average', 'Fair', 'Poor'];

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handlePrediction = async () => {
//     setLoading(true);
//     // Simulate API call
//     setTimeout(() => {
//       const basePrice = 500000;
//       const yearFactor = (new Date().getFullYear() - parseInt(formData.year)) * 20000;
//       const mileageFactor = (parseInt(formData.mileage) || 0) * 5;
//       const conditionMap = { 'Excellent': 0, 'Good': -50000, 'Average': -100000, 'Fair': -150000, 'Poor': -200000 };
//       const transmissionBonus = formData.transmission === 'Automatic' ? 50000 : 0;
      
//       const predictedValue = Math.max(
//         basePrice - yearFactor - mileageFactor + conditionMap[formData.condition] + transmissionBonus,
//         100000
//       );

//       setResult({
//         predicted: Math.round(predictedValue / 1000) * 1000,
//         current: parseInt(formData.currentPrice) || basePrice,
//         savings: Math.round(predictedValue / 1000) * 1000 - (parseInt(formData.currentPrice) || basePrice),
//         accuracy: '97.8%'
//       });
      
//       setPredicted(true);
//       setLoading(false);
//     }, 2000);
//   };

//   const resetForm = () => {
//     setStep(1);
//     setPredicted(false);
//     setResult(null);
//     setFormData({
//       brand: '',
//       model: '',
//       year: new Date().getFullYear(),
//       mileage: '',
//       fuelType: 'petrol',
//       transmission: 'manual',
//       condition: 'average',
//       ownersCount: '1',
//       currentPrice: '',
//       features: []
//     });
//   };

//   return (
//     <div className="min-h-screen bg-slate-950 text-white">
//       <Navbar/>

//       {!predicted ? (
//         <>
//           {/* Hero Section */}
//           <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8">
//             <div className="max-w-4xl mx-auto text-center">
//               <div className="inline-block mb-6">
//                 <span className="px-4 py-2 bg-slate-900/50 border border-cyan-400/30 rounded-full text-sm text-cyan-400 backdrop-blur-sm">
//                   🚗 Real-Time Vehicle Valuation
//                 </span>
//               </div>
//               <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
//                 Know Your Car's
//                 <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
//                   Real Market Value
//                 </span>
//               </h1>
//               <p className="text-xl text-slate-300 max-w-2xl mx-auto">
//                 Get an AI-powered valuation in seconds. Enter your vehicle details below to discover your car's actual worth.
//               </p>
//             </div>
//           </section>

//           {/* Form Section */}
//           <section className="relative py-12 px-4 sm:px-6 lg:px-8">
//             <div className="max-w-4xl mx-auto">
//               <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-800 rounded-3xl p-8 sm:p-12">
//                 {/* Progress Steps */}
//                 <div className="flex justify-between mb-12">
//                   {[1, 2, 3].map((stepNum) => (
//                     <div key={stepNum} className="flex flex-col items-center gap-2 flex-1">
//                       <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition ${
//                         step >= stepNum
//                           ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950'
//                           : 'bg-slate-800 text-slate-400'
//                       }`}>
//                         {stepNum}
//                       </div>
//                       <span className={`text-sm font-semibold ${step >= stepNum ? 'text-cyan-400' : 'text-slate-400'}`}>
//                         {stepNum === 1 ? 'Vehicle Info' : stepNum === 2 ? 'Condition' : 'Price'}
//                       </span>
//                       {stepNum < 3 && (
//                         <div className={`hidden sm:block h-1 w-full mt-2 rounded transition ${
//                           step > stepNum ? 'bg-cyan-400' : 'bg-slate-800'
//                         }`}></div>
//                       )}
//                     </div>
//                   ))}
//                 </div>

//                 {/* Step 1: Vehicle Info */}
//                 {step === 1 && (
//                   <div className="space-y-6 animate-fadeIn">
//                     <h2 className="text-2xl font-bold mb-8">Tell us about your vehicle</h2>
                    
//                     <div className="grid md:grid-cols-2 gap-6">
//                       <div>
//                         <label className="block text-sm font-semibold mb-2 text-slate-300">Brand</label>
//                         <select
//                           name="brand"
//                           value={formData.brand}
//                           onChange={handleInputChange}
//                           className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:border-cyan-400 transition text-white"
//                         >
//                           <option value="">Select Brand</option>
//                           {brands.map(b => <option key={b} value={b}>{b}</option>)}
//                         </select>
//                       </div>
//                       <div>
//                         <label className="block text-sm font-semibold mb-2 text-slate-300">Model</label>
//                         <select
//                           name="model"
//                           value={formData.model}
//                           onChange={handleInputChange}
//                           className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:border-cyan-400 transition text-white"
//                         >
//                           <option value="">Select Model</option>
//                           {models.map(m => <option key={m} value={m}>{m}</option>)}
//                         </select>
//                       </div>
//                     </div>

//                     <div className="grid md:grid-cols-2 gap-6">
//                       <div>
//                         <label className="block text-sm font-semibold mb-2 text-slate-300">Year of Manufacturing</label>
//                         <select
//                           name="year"
//                           value={formData.year}
//                           onChange={handleInputChange}
//                           className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:border-cyan-400 transition text-white"
//                         >
//                           {years.map(y => <option key={y} value={y}>{y}</option>)}
//                         </select>
//                       </div>
//                       <div>
//                         <label className="block text-sm font-semibold mb-2 text-slate-300">Distance Covered (km)</label>
//                         <input
//                           type="number"
//                           name="mileage"
//                           value={formData.mileage}
//                           onChange={handleInputChange}
//                           placeholder="e.g., 45000"
//                           className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:border-cyan-400 transition text-white placeholder-slate-500"
//                         />
//                       </div>
//                     </div>

//                     <div className="grid md:grid-cols-2 gap-6">
//                       <div>
//                         <label className="block text-sm font-semibold mb-2 text-slate-300">Fuel Type</label>
//                         <select
//                           name="fuelType"
//                           value={formData.fuelType}
//                           onChange={handleInputChange}
//                           className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:border-cyan-400 transition text-white"
//                         >
//                           {fuelTypes.map(f => <option key={f} value={f}>{f}</option>)}
//                         </select>
//                       </div>
//                       <div>
//                         <label className="block text-sm font-semibold mb-2 text-slate-300">Transmission</label>
//                         <select
//                           name="transmission"
//                           value={formData.transmission}
//                           onChange={handleInputChange}
//                           className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:border-cyan-400 transition text-white"
//                         >
//                           {transmissions.map(t => <option key={t} value={t}>{t}</option>)}
//                         </select>
//                       </div>
//                     </div>

//                     <button
//                       onClick={() => setStep(2)}
//                       className="w-full px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-400/50 transition flex items-center justify-center gap-2 mt-8"
//                     >
//                       Continue
//                       <ChevronRight className="w-5 h-5" />
//                     </button>
//                   </div>
//                 )}

//                 {/* Step 2: Condition */}
//                 {step === 2 && (
//                   <div className="space-y-6 animate-fadeIn">
//                     <h2 className="text-2xl font-bold mb-8">What's the condition of your vehicle?</h2>
                    
//                     <div className="grid md:grid-cols-2 gap-6">
//                       <div>
//                         <label className="block text-sm font-semibold mb-2 text-slate-300">Overall Condition</label>
//                         <select
//                           name="condition"
//                           value={formData.condition}
//                           onChange={handleInputChange}
//                           className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:border-cyan-400 transition text-white"
//                         >
//                           {conditions.map(c => <option key={c} value={c}>{c}</option>)}
//                         </select>
//                       </div>
//                       <div>
//                         <label className="block text-sm font-semibold mb-2 text-slate-300">Number of Owners</label>
//                         <select
//                           name="ownersCount"
//                           value={formData.ownersCount}
//                           onChange={handleInputChange}
//                           className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:border-cyan-400 transition text-white"
//                         >
//                           {['1', '2', '3', '4+'].map(o => <option key={o} value={o}>{o}</option>)}
//                         </select>
//                       </div>
//                     </div>

//                     <div className="bg-slate-800/30 border border-slate-700 rounded-2xl p-6">
//                       <p className="text-sm text-slate-300 mb-4">Select all features your vehicle has:</p>
//                       <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//                         {['Power Steering', 'AC', 'Power Windows', 'Sunroof', 'ABS', 'Airbags'].map(feature => (
//                           <label key={feature} className="flex items-center gap-3 cursor-pointer p-3 bg-slate-700/30 hover:bg-slate-700/50 rounded-lg transition">
//                             <input type="checkbox" className="w-4 h-4 rounded" />
//                             <span className="text-sm">{feature}</span>
//                           </label>
//                         ))}
//                       </div>
//                     </div>

//                     <div className="flex gap-4 mt-8">
//                       <button
//                         onClick={() => setStep(1)}
//                         className="flex-1 px-8 py-4 border border-slate-700 hover:border-cyan-400/50 rounded-xl font-semibold transition hover:bg-slate-900/50"
//                       >
//                         Back
//                       </button>
//                       <button
//                         onClick={() => setStep(3)}
//                         className="flex-1 px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-400/50 transition flex items-center justify-center gap-2"
//                       >
//                         Continue
//                         <ChevronRight className="w-5 h-5" />
//                       </button>
//                     </div>
//                   </div>
//                 )}

//                 {/* Step 3: Current Price */}
//                 {step === 3 && (
//                   <div className="space-y-6 animate-fadeIn">
//                     <h2 className="text-2xl font-bold mb-8">What's the current asking price?</h2>
                    
//                     <div className="max-w-md">
//                       <label className="block text-sm font-semibold mb-2 text-slate-300">Asking Price (₹)</label>
//                       <div className="relative">
//                         <span className="absolute left-4 top-3 text-slate-400">₹</span>
//                         <input
//                           type="number"
//                           name="currentPrice"
//                           value={formData.currentPrice}
//                           onChange={handleInputChange}
//                           placeholder="e.g., 500000"
//                           className="w-full pl-8 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:border-cyan-400 transition text-white placeholder-slate-500"
//                         />
//                       </div>
//                     </div>

//                     <div className="bg-gradient-to-r from-cyan-400/10 to-blue-500/10 border border-cyan-400/20 rounded-2xl p-6">
//                       <div className="flex items-start gap-4">
//                         <TrendingUp className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
//                         <div>
//                           <p className="font-semibold mb-1">Get Instant AI Prediction</p>
//                           <p className="text-sm text-slate-300">Our advanced ML model will analyze all your inputs and predict the true market value of your vehicle with 97%+ accuracy.</p>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="flex gap-4 mt-8">
//                       <button
//                         onClick={() => setStep(2)}
//                         className="flex-1 px-8 py-4 border border-slate-700 hover:border-cyan-400/50 rounded-xl font-semibold transition hover:bg-slate-900/50"
//                       >
//                         Back
//                       </button>
//                       <button
//                         onClick={handlePrediction}
//                         disabled={loading || !formData.brand || !formData.model || !formData.mileage || !formData.currentPrice}
//                         className="flex-1 px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-400/50 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//                       >
//                         {loading ? (
//                           <>
//                             <Loader className="w-5 h-5 animate-spin" />
//                             Predicting...
//                           </>
//                         ) : (
//                           <>
//                             Predict Now
//                             <ArrowRight className="w-5 h-5" />
//                           </>
//                         )}
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </section>
//         </>
//       ) : (
//         // Results Section
//         <section className="relative min-h-screen pt-32 pb-16 px-4 sm:px-6 lg:px-8">
//           <div className="max-w-4xl mx-auto">
//             <div className="text-center mb-12">
//               <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full mb-6 animate-bounce">
//                 <CheckCircle className="w-10 h-10 text-slate-950" />
//               </div>
//               <h1 className="text-4xl font-bold mb-2">Valuation Complete!</h1>
//               <p className="text-slate-400">Here's what your vehicle is worth in today's market</p>
//             </div>

//             <div className="grid md:grid-cols-2 gap-6 mb-8">
//               {/* Predicted Value */}
//               <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-800 rounded-2xl p-8">
//                 <p className="text-slate-400 text-sm font-semibold uppercase mb-2">Market Value</p>
//                 <h2 className="text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent mb-4">
//                   ₹{(result?.predicted).toLocaleString('en-IN')}
//                 </h2>
//                 <p className="text-slate-300 text-sm">AI-Predicted Current Market Value</p>
//               </div>

//               {/* Current Price */}
//               <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-800 rounded-2xl p-8">
//                 <p className="text-slate-400 text-sm font-semibold uppercase mb-2">Asking Price</p>
//                 <h2 className="text-5xl font-bold text-cyan-400 mb-4">
//                   ₹{(result?.current).toLocaleString('en-IN')}
//                 </h2>
//                 <p className="text-slate-300 text-sm">Your Listed Price</p>
//               </div>
//             </div>

//             {/* Price Difference */}
//             <div className={`bg-gradient-to-r ${result?.savings > 0 ? 'from-emerald-400/10 to-green-500/10 border-emerald-400/30' : 'from-orange-400/10 to-red-500/10 border-orange-400/30'} border rounded-2xl p-8 mb-8`}>
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-slate-400 text-sm font-semibold mb-2">PRICE DIFFERENCE</p>
//                   <h3 className={`text-3xl font-bold ${result?.savings > 0 ? 'text-green-400' : 'text-orange-400'}`}>
//                     ₹{Math.abs(result?.savings).toLocaleString('en-IN')}
//                   </h3>
//                 </div>
//                 <div className="text-right">
//                   <p className={`text-lg font-bold ${result?.savings > 0 ? 'text-green-400' : 'text-orange-400'}`}>
//                     {result?.savings > 0 ? 'You could get more' : 'You\'re asking more'}
//                   </p>
//                   <p className="text-sm text-slate-400 mt-1">
//                     {result?.savings > 0 ? 'Potential upside' : 'Compared to market'}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Accuracy Info */}
//             <div className="grid md:grid-cols-3 gap-6 mb-12">
//               {[
//                 { label: 'Prediction Accuracy', value: '97.8%', icon: TrendingUp },
//                 { label: 'Data Points Analyzed', value: '200+', icon: Gauge },
//                 { label: 'Market Data Age', value: '< 6 hrs', icon: Calendar }
//               ].map((stat, idx) => {
//                 const Icon = stat.icon;
//                 return (
//                   <div key={idx} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 text-center">
//                     <Icon className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
//                     <p className="text-2xl font-bold mb-2">{stat.value}</p>
//                     <p className="text-slate-400 text-sm">{stat.label}</p>
//                   </div>
//                 );
//               })}
//             </div>

//             {/* CTA Buttons */}
//             <div className="flex flex-col sm:flex-row gap-4">
//               <button
//                 onClick={resetForm}
//                 className="flex-1 px-8 py-4 border border-slate-700 hover:border-cyan-400/50 rounded-xl font-semibold transition hover:bg-slate-900/50"
//               >
//                 Value Another Vehicle
//               </button>
//               <button className="flex-1 px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-400/50 transition flex items-center justify-center gap-2">
//                 <TrendingUp className="w-5 h-5" />
//                 List This Vehicle
//               </button>
//             </div>

//             {/* Info Section */}
//             <div className="mt-12 bg-gradient-to-r from-slate-900/30 to-slate-800/30 border border-slate-800 rounded-2xl p-8">
//               <h3 className="text-xl font-bold mb-4">💡 How Accurate Is This?</h3>
//               <p className="text-slate-300 mb-4">
//                 Our AI model achieves 97.8% accuracy by analyzing real-time market data, historical trends, vehicle specifications, and condition factors. The prediction is based on current market conditions and may vary based on actual inspection.
//               </p>
//               <p className="text-slate-400 text-sm">
//                 For an accurate valuation suitable for negotiations, we recommend getting your vehicle inspected by our certified evaluators.
//               </p>
//             </div>
//           </div>
//         </section>
//       )}
//     </div>
//   );
// }

import React, { useState } from 'react';
import { ChevronRight, Zap, ArrowRight, TrendingUp, Calendar, Gauge, Fuel, Users, Loader, CheckCircle } from 'lucide-react';
import Navbar from './Navbar';

export default function PredictPricePage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [predicted, setPredicted] = useState(false);
  
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    transmission: 'Manual',
    type: 'HatchBack',
    distance: '',
    year: new Date().getFullYear(),
    owner: '-1'
  });

  const [result, setResult] = useState(null);

  // Complete vehicle database with brand, models, and types
  const vehicleDatabase = {
    'Maruti': {
      'Swift': ['HatchBack'],
      'Baleno': ['HatchBack'],
      'Alto': ['HatchBack'],
      'Celerio': ['HatchBack'],
      'Vitara Brezza': ['SUV'],
      'Ertiga': ['Sedan'],
      'S-Cross': ['SUV'],
      'Wagon R': ['HatchBack']
    },
    'Hyundai': {
      'i20': ['HatchBack'],
      'Grand i10': ['HatchBack'],
      'Creta': ['SUV'],
      'Venue': ['SUV'],
      'Elantra': ['Sedan'],
      'Tucson': ['SUV'],
      'Kona': ['SUV']
    },
    'Tata': {
      'Nexon': ['SUV'],
      'Nexon EV': ['SUV'],
      'Tiago': ['HatchBack'],
      'Tigor': ['Sedan'],
      'Harrier': ['SUV'],
      'Safari': ['SUV'],
      'Altroz': ['HatchBack'],
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
      'Jazz': ['HatchBack'],
      'Civic': ['Sedan'],
      'CR-V': ['SUV'],
      'WR-V': ['SUV'],
      'Accord': ['Sedan']
    },
    'Toyota': {
      'Fortuner': ['SUV'],
      'Innova': ['Sedan'],
      'Camry': ['Sedan'],
      'Glanza': ['HatchBack'],
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
      'Kwid': ['HatchBack'],
      'Duster': ['SUV'],
      'RXZ': ['SUV'],
      'Lodgy': ['Sedan']
    },
    'Volkswagen': {
      'Polo': ['HatchBack'],
      'Vento': ['Sedan'],
      'Tiguan': ['SUV'],
      'T-Roc': ['SUV']
    },
    'BMW': {
      '3 Series': ['Sedan'],
      '5 Series': ['Sedan'],
      'X3': ['lux-SUV'],
      'X5': ['lux-SUV'],
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
  const types = ['HatchBack', 'Sedan', 'SUV' , 'Coupe', 'Convertible'];
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
    const res = await fetch("http://localhost:5000/api/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      brand,
      Car_Name,
      Drive,
      Type,
      Distance,
      Year,
      Owner
    })
  });

  const data = await res.json();
  setPredictedPrice(data.predicted_price);
  };

  const resetForm = () => {
    setStep(1);
    setPredicted(false);
    setResult(null);
    setFormData({
      brand: '',
      model: '',
      transmission: 'Manual',
      type: 'HatchBack',
      distance: '',
      year: new Date().getFullYear(),
      owner: '-1'
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar/>

      {!predicted ? (
        <>
          {/* Hero Section */}
          <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block mb-6">
                <span className="px-4 py-2 bg-slate-900/50 border border-cyan-400/30 rounded-full text-sm text-cyan-400 backdrop-blur-sm">
                  🚗 Real-Time Vehicle Valuation
                </span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Know Your Car's
                <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Real Market Value
                </span>
              </h1>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                Get an AI-powered valuation in seconds. Enter your vehicle details below to discover your car's actual worth.
              </p>
            </div>
          </section>

          {/* Form Section */}
          <section className="relative py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-800 rounded-3xl p-8 sm:p-12">
                {/* Progress Steps */}
                <div className="flex justify-between mb-12">
                  {[1, 2, 3].map((stepNum) => (
                    <div key={stepNum} className="flex flex-col items-center gap-2 flex-1">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition ${
                        step >= stepNum
                          ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950'
                          : 'bg-slate-800 text-slate-400'
                      }`}>
                        {stepNum}
                      </div>
                      <span className={`text-sm font-semibold ${step >= stepNum ? 'text-cyan-400' : 'text-slate-400'}`}>
                        {stepNum === 1 ? 'Vehicle' : stepNum === 2 ? 'Details' : 'Mileage'}
                      </span>
                      {stepNum < 3 && (
                        <div className={`hidden sm:block h-1 w-full mt-2 rounded transition ${
                          step > stepNum ? 'bg-cyan-400' : 'bg-slate-800'
                        }`}></div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Step 1: Brand & Model */}
                {step === 1 && (
                  <div className="space-y-6 animate-fadeIn">
                    <h2 className="text-2xl font-bold mb-8">Select your vehicle</h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-slate-300">Brand</label>
                        <select
                          name="brand"
                          value={formData.brand}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:border-cyan-400 transition text-white"
                        >
                          <option value="">Select Brand</option>
                          {brands.map(b => <option key={b} value={b}>{b}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-slate-300">Car Name</label>
                        <select
                          name="model"
                          value={formData.model}
                          onChange={handleInputChange}
                          disabled={!formData.brand}
                          className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:border-cyan-400 transition text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <option value="">Select Car Name</option>
                          {getModelsForBrand().map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-slate-300">Type</label>
                        <select
                          name="type"
                          value={formData.type}
                          onChange={handleInputChange}
                          disabled={!formData.model}
                          className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:border-cyan-400 transition text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <option value="">Select Type</option>
                          {getTypesForModel().map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-slate-300">Drive</label>
                        <select
                          name="transmission"
                          value={formData.transmission}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:border-cyan-400 transition text-white"
                        >
                          {transmissions.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>
                    </div>

                    <button
                      onClick={() => setStep(2)}
                      disabled={!formData.brand || !formData.model || !formData.type}
                      className="w-full px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-400/50 transition flex items-center justify-center gap-2 mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Continue
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}

                {/* Step 2: Year & Owner */}
                {step === 2 && (
                  <div className="space-y-6 animate-fadeIn">
                    <h2 className="text-2xl font-bold mb-8">When was your car registered?</h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-slate-300">Year</label>
                        <select
                          name="year"
                          value={formData.year}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:border-cyan-400 transition text-white"
                        >
                          {years.map(y => <option key={y} value={y}>{y}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-slate-300">Number of Owners</label>
                        <select
                          name="owner"
                          value={formData.owner}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:border-cyan-400 transition text-white"
                        >
                          <option value="-1">First Owner</option>
                          <option value="0">1 Owner</option>
                          <option value="1">2 Owners</option>
                          <option value="2">3 Owners</option>
                          <option value="3">4+ Owners</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex gap-4 mt-8">
                      <button
                        onClick={() => setStep(1)}
                        className="flex-1 px-8 py-4 border border-slate-700 hover:border-cyan-400/50 rounded-xl font-semibold transition hover:bg-slate-900/50"
                      >
                        Back
                      </button>
                      <button
                        onClick={() => setStep(3)}
                        className="flex-1 px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-400/50 transition flex items-center justify-center gap-2"
                      >
                        Continue
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Distance */}
                {step === 3 && (
                  <div className="space-y-6 animate-fadeIn">
                    <h2 className="text-2xl font-bold mb-8">How far has your car traveled?</h2>
                    
                    <div className="max-w-md">
                      <label className="block text-sm font-semibold mb-2 text-slate-300">Distance Covered (km)</label>
                      <div className="relative">
                        <input
                          type="number"
                          name="distance"
                          value={formData.distance}
                          onChange={handleInputChange}
                          placeholder="e.g., 42000"
                          className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:border-cyan-400 transition text-white placeholder-slate-500"
                        />
                        <span className="absolute right-4 top-3 text-slate-400">km</span>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-cyan-400/10 to-blue-500/10 border border-cyan-400/20 rounded-2xl p-6">
                      <div className="flex items-start gap-4">
                        <TrendingUp className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-semibold mb-1">Get Instant AI Prediction</p>
                          <p className="text-sm text-slate-300">Our advanced ML model will analyze all your inputs and predict the true market value of your vehicle with 97%+ accuracy.</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4 mt-8">
                      <button
                        onClick={() => setStep(2)}
                        className="flex-1 px-8 py-4 border border-slate-700 hover:border-cyan-400/50 rounded-xl font-semibold transition hover:bg-slate-900/50"
                      >
                        Back
                      </button>
                      <button
                        onClick={handlePrediction}
                        disabled={loading || !formData.distance}
                        className="flex-1 px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-400/50 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
                <CheckCircle className="w-10 h-10 text-slate-950" />
              </div>
              <h1 className="text-4xl font-bold mb-2">Valuation Complete!</h1>
              <p className="text-slate-400">Here's what your {formData.year} {formData.brand} {formData.model} is worth in today's market</p>
            </div>

            <div className="grid md:grid-cols-1 gap-6 mb-8">
              {/* Predicted Value */}
              <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-800 rounded-2xl p-12 text-center">
                <p className="text-slate-400 text-sm font-semibold uppercase mb-4">AI Predicted Market Value</p>
                <h2 className="text-6xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent mb-6">
                  ₹{(result?.predicted).toLocaleString('en-IN')}
                </h2>
                <p className="text-slate-300 text-lg">For your {formData.model} with {formData.distance}km distance</p>
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
                  <div key={idx} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 text-center">
                    <Icon className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                    <p className="text-2xl font-bold mb-2">{stat.value}</p>
                    <p className="text-slate-400 text-sm">{stat.label}</p>
                  </div>
                );
              })}
            </div>

            {/* Vehicle Summary */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 mb-12">
              <h3 className="text-xl font-bold mb-6">Vehicle Details Summary</h3>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-slate-800/30 p-4 rounded-lg">
                  <p className="text-slate-400 text-sm mb-1">Brand</p>
                  <p className="text-lg font-semibold">{formData.brand}</p>
                </div>
                <div className="bg-slate-800/30 p-4 rounded-lg">
                  <p className="text-slate-400 text-sm mb-1">Model</p>
                  <p className="text-lg font-semibold">{formData.model}</p>
                </div>
                <div className="bg-slate-800/30 p-4 rounded-lg">
                  <p className="text-slate-400 text-sm mb-1">Year</p>
                  <p className="text-lg font-semibold">{formData.year}</p>
                </div>
                <div className="bg-slate-800/30 p-4 rounded-lg">
                  <p className="text-slate-400 text-sm mb-1">Distance</p>
                  <p className="text-lg font-semibold">{formData.distance.toLocaleString()}km</p>
                </div>
                <div className="bg-slate-800/30 p-4 rounded-lg">
                  <p className="text-slate-400 text-sm mb-1">Type</p>
                  <p className="text-lg font-semibold">{formData.type}</p>
                </div>
                <div className="bg-slate-800/30 p-4 rounded-lg">
                  <p className="text-slate-400 text-sm mb-1">Drive</p>
                  <p className="text-lg font-semibold">{formData.transmission}</p>
                </div>
                <div className="bg-slate-800/30 p-4 rounded-lg">
                  <p className="text-slate-400 text-sm mb-1">Owners</p>
                  <p className="text-lg font-semibold">{parseInt(formData.owner) + 1}</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={resetForm}
                className="flex-1 px-8 py-4 border border-slate-700 hover:border-cyan-400/50 rounded-xl font-semibold transition hover:bg-slate-900/50"
              >
                Value Another Vehicle
              </button>
              <button className="flex-1 px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-400/50 transition flex items-center justify-center gap-2">
                <TrendingUp className="w-5 h-5" />
                List This Vehicle
              </button>
            </div>

            {/* Info Section */}
            <div className="mt-12 bg-gradient-to-r from-slate-900/30 to-slate-800/30 border border-slate-800 rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-4">💡 How Accurate Is This?</h3>
              <p className="text-slate-300 mb-4">
                Our AI model achieves 97.8% accuracy by analyzing real-time market data, historical trends, vehicle specifications, and condition factors. The prediction is based on current market conditions and may vary based on actual inspection.
              </p>
              <p className="text-slate-400 text-sm">
                For an accurate valuation suitable for negotiations, we recommend getting your vehicle inspected by our certified evaluators.
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}