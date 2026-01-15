import React, { useState } from 'react';
import { Upload, X, Sparkles, Camera, AlertCircle, User, Phone, MapPin, FileText } from 'lucide-react';
import Navbar from './Navbar';

export default function SellVehicle() {
  const [formData, setFormData] = useState({
    // Seller Information
    name: '',
    contactNo: '',
    email: '',
    city: '',
    state: '',
    fulladdress: '',

    // Vehicle Details
    brand: '',
    model: '',
    year: '',
    mileage: '',
    condition: '',
    fuelType: '',
    transmission: '',
    price: '',
    description: '',

    // Additional Features
    registrationNumber: '',
    engineCC: '',
    ownershipType: '',
    insuranceValidity: '',
    serviceHistory: '',
    features: [],
  });

  const [images, setImages] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [aiPriceSuggestion, setAiPriceSuggestion] = useState(null);
  const [loadingAI, setLoadingAI] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const featuresList = [
    'Air Conditioning',
    'Power Steering',
    'Power Windows',
    'Airbags',
    'ABS',
    'Cruise Control',
    'Parking Sensors',
    'Touchscreen',
    'Bluetooth',
    'Sunroof',
    'Leather Seats',
    'Alloy Wheels',
  ];

  const handleSubmit = async (req, res) => {
    try {
      const res = await fetch("http://localhost:5000/api/sellers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: Json.stringify({
          name: formData.sellerName,
          contactNo: formData.contactNo,
          email: formData.email,
          fullAddress: formData.address,
          city: formData.city,
          state: formData.state
        })
      });

      if (!res.ok) {
        throw new Error(data.error || "Failed to create seller");
      }

      // Seller created successfully
      console.log("Seller created:", data);

      // This is the MongoDB _id of the seller
      const sellerId = data._id;

      // You will use this sellerId when saving the vehicle
      console.log("Seller ID:", sellerId);

      alert("Seller registered successfully!");

    } catch (error) {
      console.error("Error creating seller:", error);
      alert(error.message || "Something went wrong");
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFeatureToggle = (feature) => {
    setSelectedFeatures(prev =>
      prev.includes(feature)
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = e.dataTransfer.files;
    addImages(files);
  };

  const handleImageInput = (e) => {
    const files = e.target.files;
    addImages(files);
  };

  const addImages = (files) => {
    const newImages = Array.from(files).map(file => ({
      id: Math.random(),
      file,
      preview: URL.createObjectURL(file)
    }));
    setImages(prev => [...prev, ...newImages].slice(0, 8));
  };

  const removeImage = (id) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  const getAIPriceSuggestion = async () => {
    if (!formData.brand || !formData.model || !formData.year || !formData.mileage || !formData.condition) {
      alert('Please fill in all vehicle details');
      return;
    }

    setLoadingAI(true);

    // Simulate AI API call
    setTimeout(() => {
      const basePrices = {
        'excellent': 1200,
        'good': 900,
        'fair': 650,
        'poor': 400
      };

      const basePrice = basePrices[formData.condition] || 800;
      const mileageDeduction = (parseInt(formData.mileage) / 1000) * 5;
      const yearDeduction = (2025 - parseInt(formData.year)) * 50;
      const suggestedPrice = Math.max(200, basePrice * 1000 - mileageDeduction * 1000 - yearDeduction * 1000);

      setAiPriceSuggestion(Math.round(suggestedPrice / 1000) * 1000);
      setLoadingAI(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white pt-24">
      {/* Main Content */}
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Section */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
            List Your Vehicle
          </h2>
          <p className="text-slate-400 text-lg">Get AI-powered pricing and connect with buyers instantly</p>
        </div>

        {/* Form Container */}
        <div className="space-y-8">

          {/* Seller Information Section */}
          <div className="bg-slate-900/50 backdrop-blur border border-slate-800/50 rounded-2xl p-8 shadow-lg">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                <User className="text-cyan-400" size={18} />
              </div>
              Seller Information
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Seller Name */}
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Rajesh Kumar"
                  className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition"
                />
              </div>

              {/* Contact Number */}
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">Contact Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-3.5 text-slate-500" size={18} />
                  <input
                    type="tel"
                    name="contactNo"
                    value={formData.contactNo}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                    className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg pl-11 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">Full Address</label>
                <input
                  type="text"
                  name="fulladdress"
                  value={formData.fulladdress}
                  onChange={handleInputChange}
                  placeholder="e.g., 123 Main Street"
                  className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition"
                />
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="e.g., Delhi, Mumbai"
                  className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition"
                />
              </div>

              {/* State */}
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="e.g., Delhi, Maharashtra"
                  className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition"
                />
              </div>
            </div>
          </div>

          {/* Vehicle Details Section */}
          <div className="bg-slate-900/50 backdrop-blur border border-slate-800/50 rounded-2xl p-8 shadow-lg">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                <span className="text-cyan-400">📋</span>
              </div>
              Vehicle Details
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Brand */}
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">Brand</label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  placeholder="e.g., Toyota, Maruti"
                  className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition"
                />
              </div>

              {/* Model */}
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">Model</label>
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  placeholder="e.g., Swift, Fortuner"
                  className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition"
                />
              </div>

              {/* Year */}
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">Year</label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  placeholder="2020"
                  className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition"
                />
              </div>

              {/* Mileage */}
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">Mileage (km)</label>
                <input
                  type="number"
                  name="mileage"
                  value={formData.mileage}
                  onChange={handleInputChange}
                  placeholder="50000"
                  className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition"
                />
              </div>

              {/* Condition */}
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">Condition</label>
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleInputChange}
                  className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition"
                >
                  <option value="">Select condition</option>
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="poor">Poor</option>
                </select>
              </div>

              {/* Fuel Type */}
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">Fuel Type</label>
                <select
                  name="fuelType"
                  value={formData.fuelType}
                  onChange={handleInputChange}
                  className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition"
                >
                  <option value="">Select fuel type</option>
                  <option value="petrol">Petrol</option>
                  <option value="diesel">Diesel</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="electric">Electric</option>
                  <option value="lpg">LPG</option>
                </select>
              </div>

              {/* Transmission */}
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">Transmission</label>
                <select
                  name="transmission"
                  value={formData.transmission}
                  onChange={handleInputChange}
                  className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition"
                >
                  <option value="">Select transmission</option>
                  <option value="manual">Manual</option>
                  <option value="automatic">Automatic</option>
                </select>
              </div>

              {/* Registration Number */}
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">Registration Number</label>
                <input
                  type="text"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleInputChange}
                  placeholder="e.g., DL01AB1234"
                  className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition"
                />
              </div>

              {/* Engine CC */}
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">Engine Capacity (CC)</label>
                <input
                  type="number"
                  name="engineCC"
                  value={formData.engineCC}
                  onChange={handleInputChange}
                  placeholder="1500"
                  className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition"
                />
              </div>

              {/* Ownership */}
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">Ownership Type</label>
                <select
                  name="ownershipType"
                  value={formData.ownershipType}
                  onChange={handleInputChange}
                  className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition"
                >
                  <option value="">Select ownership</option>
                  <option value="first">First Owner</option>
                  <option value="second">Second Owner</option>
                  <option value="third">Third Owner</option>
                  <option value="more">More than 3 Owners</option>
                </select>
              </div>

              {/* Insurance Validity */}
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">Insurance Validity</label>
                <input
                  type="date"
                  name="insuranceValidity"
                  value={formData.insuranceValidity}
                  onChange={handleInputChange}
                  className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition"
                />
              </div>

              {/* Price with AI Suggestion */}
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">Your Asking Price (₹)</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="500000"
                    className="flex-1 bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition"
                  />
                  <button
                    onClick={getAIPriceSuggestion}
                    disabled={loadingAI}
                    className="px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:from-slate-700 disabled:to-slate-700 rounded-lg font-medium flex items-center gap-2 transition transform hover:scale-105 disabled:hover:scale-100 whitespace-nowrap"
                  >
                    <Sparkles size={18} />
                    <span className="hidden sm:inline">{loadingAI ? 'Analyzing...' : 'AI Price'}</span>
                  </button>
                </div>
                {aiPriceSuggestion && (
                  <div className="mt-3 p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                    <p className="text-sm text-cyan-300">AI Suggested Price: <span className="text-cyan-100 font-semibold">₹{aiPriceSuggestion.toLocaleString()}</span></p>
                  </div>
                )}
              </div>
            </div>

            {/* Service History */}
            <div className="mt-6">
              <label className="block text-sm font-medium mb-2 text-slate-300">Service History</label>
              <textarea
                name="serviceHistory"
                value={formData.serviceHistory}
                onChange={handleInputChange}
                placeholder="Describe service records, maintenance, and repairs..."
                rows={3}
                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition resize-none"
              />
            </div>

            {/* Description */}
            <div className="mt-6">
              <label className="block text-sm font-medium mb-2 text-slate-300">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe any special features, recent repairs, or condition details..."
                rows={4}
                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition resize-none"
              />
            </div>
          </div>

          {/* Features Section */}
          <div className="bg-slate-900/50 backdrop-blur border border-slate-800/50 rounded-2xl p-8 shadow-lg">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                <span className="text-cyan-400">✨</span>
              </div>
              Vehicle Features
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {featuresList.map((feature) => (
                <button
                  key={feature}
                  onClick={() => handleFeatureToggle(feature)}
                  className={`px-4 py-3 rounded-lg font-medium transition ${selectedFeatures.includes(feature)
                      ? 'bg-cyan-500/30 border border-cyan-400 text-cyan-300'
                      : 'bg-slate-800/50 border border-slate-700/50 text-slate-300 hover:border-slate-600'
                    }`}
                >
                  {feature}
                </button>
              ))}
            </div>
          </div>

          {/* Images Section */}
          <div className="bg-slate-900/50 backdrop-blur border border-slate-800/50 rounded-2xl p-8 shadow-lg">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                <Camera className="text-cyan-400" size={18} />
              </div>
              Vehicle Images
            </h3>

            {/* Drag & Drop Area */}
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-xl p-8 text-center transition cursor-pointer ${dragActive
                  ? 'border-cyan-400 bg-cyan-500/10'
                  : 'border-slate-700/50 bg-slate-800/30 hover:border-slate-600/50'
                }`}
            >
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageInput}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                  <Upload className="text-cyan-400" size={24} />
                </div>
                <div>
                  <p className="text-white font-medium">Drag & drop images here</p>
                  <p className="text-slate-400 text-sm mt-1">or click to browse (Max 8 images)</p>
                </div>
              </div>
            </div>

            {/* Image Preview Grid */}
            {images.length > 0 && (
              <div className="mt-6">
                <p className="text-sm text-slate-300 mb-4">
                  {images.length} of 8 images uploaded
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {images.map(img => (
                    <div key={img.id} className="relative group">
                      <img
                        src={img.preview}
                        alt="vehicle"
                        className="w-full h-28 object-cover rounded-lg border border-slate-700/50"
                      />
                      <button
                        onClick={() => removeImage(img.id)}
                        className="absolute top-2 right-2 bg-red-500/80 hover:bg-red-600 p-1 rounded-lg opacity-0 group-hover:opacity-100 transition"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Info Box */}
            <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg flex gap-3">
              <AlertCircle className="text-blue-400 flex-shrink-0" size={18} />
              <p className="text-sm text-blue-200">Upload clear, well-lit photos of the vehicle from multiple angles for better buyer interest</p>
            </div>
          </div>

          {/* Submit Section */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button onclick={handleSubmit} className="flex-1 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-lg font-semibold transition transform hover:scale-105">
              List Vehicle
            </button>
            <button className="flex-1 h-12 bg-slate-800 hover:bg-slate-700 rounded-lg font-semibold transition">
              Save as Draft
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}