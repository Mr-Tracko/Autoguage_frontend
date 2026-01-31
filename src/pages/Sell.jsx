import React, { useState } from 'react';
import { Upload, X, Sparkles, Camera, AlertCircle, User, Phone, MapPin, FileText, Type, Mail, Home } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function SellVehicle() {
  const [formData, setFormData] = useState({
    // Seller Information
    name: '',
    contactNo: '',
    email: '',
    city: '',
    state: '',
    fullAddress: '',

    // Vehicle Details
    brand: '',
    model: '',
    year: '',
    mileage: '',
    Type: '',
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

  const handleSubmit = async () => {
    try {
      const sellerRes = await fetch("http://localhost:5000/api/sellers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          contactNo: formData.contactNo,
          email: formData.email,
          fullAddress: formData.fullAddress,
          city: formData.city,
          state: formData.state
        })
      });

      const sellerData = await sellerRes.json();

      if (!sellerRes.ok) {
        throw new Error(sellerData.error || "Failed to create seller");
      }

      const sellerId = sellerData._id;
      console.log("Seller created:", sellerId);

      //for vehicle
      const vehicleRes = await fetch("http://localhost:5000/api/vehicles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          seller: sellerId,

          brand: formData.brand,
          model: formData.model,
          year: Number(formData.year),
          mileage: Number(formData.mileage),
          Type: formData.Type,
          fuelType: formData.fuelType,
          transmission: formData.transmission,
          engineCC: Number(formData.engineCC),
          registrationNumber: formData.registrationNumber,
          ownershipType: formData.ownershipType,
          insuranceValidity: formData.insuranceValidity,
          askingPrice: Number(formData.price),
          aiSuggestedPrice: aiPriceSuggestion,
          serviceHistory: formData.serviceHistory,
          description: formData.description,
          features: selectedFeatures,
          images: []
        })
      });

      const vehicleData = await vehicleRes.json();

      if (!vehicleRes.ok) {
        throw new Error(vehicleData.error || "Failed to create vehicle");
      }

      console.log("Vehicle created:", vehicleData);

      alert("Vehicle listed successfully!");

    } catch (error) {
      console.error("Submission error:", error);
      alert(error.message || "Something went wrong");
    }
  };


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
    if (
      !formData.brand ||
      !formData.model ||
      !formData.year ||
      !formData.mileage ||
      !formData.Type
    ) {
      alert("Please fill in all vehicle details");
      return;
    }

    setLoadingAI(true);
    const OwnerMap = {
      first: 4,
      second: 3,
      third: 2,
      more: 1,
    }

    try {
      const res = await fetch("http://localhost:5000/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          brand: formData.brand,
          Car_Name: formData.model,
          Drive: formData.transmission,
          Type: formData.Type,
          Distance: Number(formData.mileage),
          Year: Number(formData.year),
          Owner: OwnerMap[formData.ownershipType],
        }),
      });

      const data = await res.json();
      setAiPriceSuggestion(data.predicted_price);
    } catch (err) {
      console.error("AI price error:", err);
      alert("Failed to get AI price");
    } finally {
      setLoadingAI(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900 pt-24">
      {/* Main Content */}
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Title Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            List Your Vehicle
            <span className="block bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Get AI-Powered Pricing
            </span>
          </h1>
          <p className="text-slate-600 text-lg">Connect with buyers instantly with accurate AI valuation and transparent pricing</p>
        </div>

        {/* Form Container */}
        <div className="space-y-8">

          {/* Seller Information Section */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <User className="text-blue-600" size={20} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Seller Information</h3>
                <p className="text-sm text-slate-600">Tell us about yourself</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Seller Name */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-900">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Rajesh Kumar"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 placeholder-slate-500 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200 transition"
                />
              </div>

              {/* Contact Number */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-900">Contact Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-3.5 text-slate-400" size={18} />
                  <input
                    type="tel"
                    name="contactNo"
                    value={formData.contactNo}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-11 pr-4 py-3 text-slate-900 placeholder-slate-500 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200 transition"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-900">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 text-slate-400" size={18} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-11 pr-4 py-3 text-slate-900 placeholder-slate-500 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200 transition"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-900">Full Address</label>
                <div className="relative">
                  <Home className="absolute left-4 top-3.5 text-slate-400" size={18} />
                  <input
                    type="text"
                    name="fullAddress"
                    value={formData.fullAddress}
                    onChange={handleInputChange}
                    placeholder="e.g., 123 Main Street"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-11 pr-4 py-3 text-slate-900 placeholder-slate-500 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200 transition"
                  />
                </div>
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-900">City</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-3.5 text-slate-400" size={18} />
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="e.g., Delhi, Mumbai"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-11 pr-4 py-3 text-slate-900 placeholder-slate-500 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200 transition"
                  />
                </div>
              </div>

              {/* State */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-900">State</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-3.5 text-slate-400" size={18} />
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="e.g., Delhi, Maharashtra"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-11 pr-4 py-3 text-slate-900 placeholder-slate-500 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200 transition"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Vehicle Details Section */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Type className="text-blue-600" size={20} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Vehicle Details</h3>
                <p className="text-sm text-slate-600">Provide accurate vehicle information</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Brand */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-900">Brand</label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  placeholder="e.g., Toyota, Maruti"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 placeholder-slate-500 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200 transition"
                />
              </div>

              {/* Model */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-900">Model</label>
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  placeholder="e.g., Swift, Fortuner"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 placeholder-slate-500 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200 transition"
                />
              </div>

              {/* Year */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-900">Year</label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  placeholder="2020"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 placeholder-slate-500 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200 transition"
                />
              </div>

              {/* Mileage */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-900">Mileage (km)</label>
                <input
                  type="number"
                  name="mileage"
                  value={formData.mileage}
                  onChange={handleInputChange}
                  placeholder="50000"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 placeholder-slate-500 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200 transition"
                />
              </div>

              {/* Type */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-900">Type of Vehicle</label>
                <select
                  name="Type"
                  value={formData.Type}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200 transition"
                >
                  <option value="">Select Type of your vehicle</option>
                  <option value="Hatchback">Hatchback</option>
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Lux-sedan">Lux-Sedan</option>
                  <option value="Lux-SUV">Lux-SUV</option>
                </select>
              </div>

              {/* Fuel Type */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-900">Fuel Type</label>
                <select
                  name="fuelType"
                  value={formData.fuelType}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200 transition"
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
                <label className="block text-sm font-semibold mb-2 text-slate-900">Transmission</label>
                <select
                  name="transmission"
                  value={formData.transmission}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200 transition"
                >
                  <option value="">Select transmission</option>
                  <option value="Manual">Manual</option>
                  <option value="Automatic">Automatic</option>
                </select>
              </div>

              {/* Registration Number */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-900">Registration Number</label>
                <input
                  type="text"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleInputChange}
                  placeholder="e.g., DL01AB1234"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 placeholder-slate-500 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200 transition"
                />
              </div>

              {/* Engine CC */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-900">Engine Capacity (CC)</label>
                <input
                  type="number"
                  name="engineCC"
                  value={formData.engineCC}
                  onChange={handleInputChange}
                  placeholder="1500"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 placeholder-slate-500 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200 transition"
                />
              </div>

              {/* Ownership */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-900">Ownership Type</label>
                <select
                  name="ownershipType"
                  value={formData.ownershipType}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200 transition"
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
                <label className="block text-sm font-semibold mb-2 text-slate-900">Insurance Validity</label>
                <input
                  type="date"
                  name="insuranceValidity"
                  value={formData.insuranceValidity}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200 transition"
                />
              </div>

              {/* Price with AI Suggestion */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2 text-slate-900">Your Asking Price (₹)</label>
                <div className="flex gap-3">
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="500000"
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 placeholder-slate-500 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200 transition"
                  />
                  <button
                    onClick={getAIPriceSuggestion}
                    disabled={loadingAI}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:from-slate-400 disabled:to-slate-400 text-white rounded-lg font-semibold flex items-center gap-2 transition transform hover:scale-105 disabled:hover:scale-100 whitespace-nowrap shadow-md hover:shadow-lg"
                  >
                    <Sparkles size={18} />
                    <span className="hidden sm:inline">{loadingAI ? 'Analyzing...' : 'AI Price'}</span>
                  </button>
                </div>
                {aiPriceSuggestion && (
                  <div className="mt-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-slate-700">AI Suggested Price: <span className="text-blue-600 font-bold text-lg">₹{aiPriceSuggestion.toLocaleString()}</span></p>
                  </div>
                )}
              </div>
            </div>

            {/* Service History */}
            <div className="mt-6">
              <label className="block text-sm font-semibold mb-2 text-slate-900">Service History</label>
              <textarea
                name="serviceHistory"
                value={formData.serviceHistory}
                onChange={handleInputChange}
                placeholder="Describe service records, maintenance, and repairs..."
                rows={3}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 placeholder-slate-500 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200 transition resize-none"
              />
            </div>

            {/* Description */}
            <div className="mt-6">
              <label className="block text-sm font-semibold mb-2 text-slate-900">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe any special features, recent repairs, or condition details..."
                rows={4}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 placeholder-slate-500 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200 transition resize-none"
              />
            </div>
          </div>

          {/* Features Section */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-lg">✨</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Vehicle Features</h3>
                <p className="text-sm text-slate-600">Select available features and amenities</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {featuresList.map((feature) => (
                <button
                  key={feature}
                  onClick={() => handleFeatureToggle(feature)}
                  className={`px-4 py-3 rounded-lg font-medium transition border-2 ${selectedFeatures.includes(feature)
                    ? 'bg-blue-100 border-blue-400 text-blue-700'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-100'
                    }`}
                >
                  {selectedFeatures.includes(feature) && '✓ '}{feature}
                </button>
              ))}
            </div>
          </div>

          {/* Images Section */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Camera className="text-blue-600" size={20} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Vehicle Images</h3>
                <p className="text-sm text-slate-600">Upload clear photos from multiple angles</p>
              </div>
            </div>

            {/* Drag & Drop Area */}
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-xl p-8 text-center transition cursor-pointer ${dragActive
                ? 'border-blue-400 bg-blue-50'
                : 'border-slate-300 bg-slate-50 hover:border-slate-400'
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
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Upload className="text-blue-600" size={24} />
                </div>
                <div>
                  <p className="text-slate-900 font-semibold">Drag & drop images here</p>
                  <p className="text-slate-600 text-sm mt-1">or click to browse (Max 8 images)</p>
                </div>
              </div>
            </div>

            {/* Image Preview Grid */}
            {images.length > 0 && (
              <div className="mt-6">
                <p className="text-sm font-semibold text-slate-700 mb-4">
                  {images.length} of 8 images uploaded
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {images.map(img => (
                    <div key={img.id} className="relative group">
                      <img
                        src={img.preview}
                        alt="vehicle"
                        className="w-full h-28 object-cover rounded-lg border border-slate-200 group-hover:border-blue-400 transition"
                      />
                      <button
                        onClick={() => removeImage(img.id)}
                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-lg opacity-0 group-hover:opacity-100 transition shadow-md"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Info Box */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex gap-3">
              <AlertCircle className="text-blue-600 flex-shrink-0" size={18} />
              <p className="text-sm text-blue-900 font-medium">Upload clear, well-lit photos of the vehicle from multiple angles for better buyer interest</p>
            </div>
          </div>

          {/* Submit Section */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button 
              onClick={handleSubmit}
              className="flex-1 h-13 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg font-bold text-lg transition transform hover:scale-105 shadow-md hover:shadow-lg"
            >
              List Vehicle Now
            </button>
            <button className="flex-1 h-13 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-lg font-bold text-lg transition border border-slate-300">
              Save as Draft
            </button>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}