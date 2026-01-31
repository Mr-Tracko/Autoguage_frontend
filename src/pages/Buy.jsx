import React, { useState } from 'react';
import { Search, Filter, Heart, MapPin, Gauge, Fuel, Users, Calendar, TrendingUp, Star, ChevronRight, X, AlertCircle, ChevronDown } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function BuyPage() {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [filters, setFilters] = useState({
    priceMin: 100000,
    priceMax: 5000000,
    brand: '',
    fuelType: '',
    condition: ''
  });
  const [wishlist, setWishlist] = useState([]);
  const [sortBy, setSortBy] = useState('relevance');
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedBrand, setExpandedBrand] = useState(null);

  React.useEffect(() => {
    fetchvehicles();
  }, []);

  const fetchvehicles = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/vehicles");
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch vehicles");
      }
      setVehicles(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredVehicles = vehicles.filter(vehicle => {
    return (
      vehicle.askingPrice >= filters.priceMin &&
      vehicle.askingPrice <= filters.priceMax &&
      (filters.brand === '' || vehicle.brand.toLowerCase().includes(filters.brand.toLowerCase())) &&
      (filters.fuelType === '' || vehicle.fuelType === filters.fuelType) &&
      (filters.condition === '' || vehicle.condition === filters.condition)
    );
  });

  const sortedVehicles = [...filteredVehicles].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.askingPrice - b.askingPrice;
      case 'price-high':
        return b.askingPrice - a.askingPrice;
      case 'newest':
        return b.year - a.year;
      case 'healthScore':
        return b.healthScore - a.healthScore;
      default:
        return 0;
    }
  });

  const toggleWishlist = (id) => {
    setWishlist(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const priceDiscount = (vehicle) => {
    return Math.round(((vehicle.marketValue - vehicle.askingPrice) / vehicle.marketValue) * 100);
  };

  // Get unique brands with count
  const getBrandCounts = () => {
    const counts = {};
    vehicles.forEach(v => {
      counts[v.brand] = (counts[v.brand] || 0) + 1;
    });
    return counts;
  };

  const brandCounts = getBrandCounts();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900">
        <Navbar />
        <div className="text-center mt-40 text-slate-400 text-xl">
          Loading vehicles...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900">
        <Navbar />
        <div className="text-center mt-40 text-red-600 text-xl">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900">
      <Navbar />

      <div className="pt-24 pb-12">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-blue-50 via-cyan-50 to-blue-50 border-b border-slate-200 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              Find Your Perfect
              <span className="block bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Used Vehicle
              </span>
            </h1>
            <p className="text-slate-600 text-lg">AI-verified pricing, health scores & intelligent comparisons</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 mt-8">
            {/* Left Sidebar - Filters */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 sticky top-24 shadow-sm hover:shadow-md transition">
                {/* Budget Filter */}
                <div className="mb-8 pb-8 border-b border-slate-200">
                  <h3 className="text-lg font-bold mb-4 text-slate-900">Budget</h3>
                  <div className="space-y-4">
                    <div>
                      <input
                        type="range"
                        min="100000"
                        max="5000000"
                        value={filters.priceMax}
                        onChange={(e) => setFilters({ ...filters, priceMax: parseInt(e.target.value) })}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">₹ {(filters.priceMin / 100000).toFixed(1)}L</span>
                      <span className="text-blue-600 font-bold">₹{(filters.priceMax / 100000).toFixed(1)}L</span>
                    </div>
                  </div>
                </div>

                {/* Make & Model Search */}
                <div className="mb-8 pb-8 border-b border-slate-200">
                  <h3 className="text-lg font-bold mb-4 text-slate-900">Make & Model</h3>
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search a brand or model"
                      value={filters.brand}
                      onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
                      className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200 text-slate-900 placeholder-slate-500 text-sm"
                    />
                  </div>

                  <div className="mb-4">
                    <button className="w-full text-left font-bold text-slate-700 mb-2">All Brands</button>
                  </div>

                  {/* Brand List */}
                  <div className="space-y-2">
                    {Object.entries(brandCounts).map(([brand, count]) => (
                      <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={filters.brand === brand}
                          onChange={(e) => setFilters({ ...filters, brand: e.target.checked ? brand : '' })}
                          className="w-4 h-4 rounded bg-white border-slate-300 text-blue-600 cursor-pointer accent-blue-600"
                        />
                        <span className="text-slate-700 group-hover:text-blue-600 text-sm transition">{brand}</span>
                        <span className="text-slate-500 text-sm ml-auto">({count})</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Fuel Type Filter */}
                <div className="mb-8 pb-8 border-b border-slate-200">
                  <h3 className="text-lg font-bold mb-4 text-slate-900">Fuel Type</h3>
                  <div className="space-y-2">
                    {['Petrol', 'Diesel', 'CNG', 'Hybrid', 'Electric'].map(fuel => (
                      <label key={fuel} className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={filters.fuelType === fuel}
                          onChange={(e) => setFilters({ ...filters, fuelType: e.target.checked ? fuel : '' })}
                          className="w-4 h-4 rounded bg-white border-slate-300 text-blue-600 cursor-pointer accent-blue-600"
                        />
                        <span className="text-slate-700 group-hover:text-blue-600 text-sm transition">{fuel}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Condition Filter */}
                <div className="mb-4">
                  <h3 className="text-lg font-bold mb-4 text-slate-900">Condition</h3>
                  <div className="space-y-2">
                    {['Excellent', 'Good', 'Average', 'Fair'].map(cond => (
                      <label key={cond} className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={filters.condition === cond}
                          onChange={(e) => setFilters({ ...filters, condition: e.target.checked ? cond : '' })}
                          className="w-4 h-4 rounded bg-white border-slate-300 text-blue-600 cursor-pointer accent-blue-600"
                        />
                        <span className="text-slate-700 group-hover:text-blue-600 text-sm transition">{cond}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Reset Button */}
                <button
                  onClick={() => {
                    setFilters({ priceMin: 100000, priceMax: 5000000, brand: '', fuelType: '', condition: '' });
                    setSortBy('relevance');
                  }}
                  className="w-full mt-6 px-4 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg font-semibold transition text-sm text-slate-700"
                >
                  Reset Filters
                </button>
              </div>
            </div>

            {/* Right Section - Results & Grid */}
            <div className="flex-1">
              {/* Sort & Results Info */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-200">
                <div className="text-slate-600">
                  Showing <span className="text-blue-600 font-bold">{sortedVehicles.length}</span> vehicles
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
                  <span className="text-slate-600 text-sm">❤️ Wishlist: <span className="text-blue-600 font-bold">{wishlist.length}</span></span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200 text-slate-900 text-sm"
                  >
                    <option value="relevance">Most Relevant</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="newest">Newest First</option>
                    <option value="healthScore">Health Score</option>
                  </select>
                </div>
              </div>

              {/* Vehicles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {sortedVehicles.map(vehicle => (
                  <div
                    key={vehicle._id}
                    className="bg-white border border-slate-200 hover:border-blue-400 rounded-2xl overflow-hidden transition hover:shadow-lg group cursor-pointer"
                    onClick={() => setSelectedVehicle(vehicle)}
                  >
                    {/* Image Container */}
                    <div className="relative overflow-hidden h-40 bg-slate-100">
                      <img
                        src={vehicle.image}
                        alt={`${vehicle.brand} ${vehicle.model}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                      {/* Badge & Wishlist */}
                      <div className="absolute top-3 right-3 flex gap-2">
                        {/* <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-md">
                          <TrendingUp className="w-3 h-3" />
                          {priceDiscount(vehicle)}% off
                        </div> */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist(vehicle._id);
                          }}
                          className="bg-white/90 hover:bg-white p-2 rounded-full transition shadow-md"
                        >
                          <Heart
                            className="w-5 h-5"
                            fill={wishlist.includes(vehicle._id) ? 'currentColor' : 'none'}
                            color={wishlist.includes(vehicle._id) ? '#dc2626' : '#475569'}
                          />
                        </button>
                      </div>

                      {/* Badge/Certification */}
                      <div className="absolute bottom-1 left-1 bg-blue-100 border border-blue-300 text-blue-700 px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                        ✓ AI Verified
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      {/* Title */}
                      <h3 className="text-lg font-bold mb-1 text-slate-900">{vehicle.year} {vehicle.brand} {vehicle.model}</h3>

                      {/* Key Stats - 3 Column Grid */}
                      <div className="grid grid-cols-3 gap-2 mb-2 pb-2 border-b border-slate-200">
                        <div className="flex items-center gap-1 text-sm">
                          <Gauge className="w-4 h-4 text-blue-600" />
                          <span className="text-slate-600">{vehicle.mileage.toLocaleString()} </span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Fuel className="w-4 h-4 text-blue-600" />
                          <span className="text-slate-600">{vehicle.fuelType}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <span className="text-slate-600">|{vehicle.transmission}|</span>
                        </div>
                      </div>

                      {/* Price & EMI Section */}
                      <div className="mb-2">
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className="text-xl font-bold text-blue-600">₹{(vehicle.askingPrice / 100000).toFixed(2)}L</span>
                        </div>
                        <p className="text-xs text-slate-500">EMI starts ₹{Math.round(vehicle.askingPrice / 60).toLocaleString()}/month</p>
                      </div>

                      {/* Location */}
                      <div className="flex items-center gap-1 text-slate-600 text-sm mb-2">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        {vehicle.seller?.city}, {vehicle.seller?.state}
                      </div>

                      {/* View Details Button */}
                      <button className="w-full py-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-600/30 transition text-sm">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Empty State */}
              {sortedVehicles.length === 0 && (
                <div className="text-center py-16">
                  <AlertCircle className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <p className="text-xl text-slate-600 mb-4">No vehicles found matching your criteria</p>
                  <button
                    onClick={() => {
                      setFilters({ priceMin: 100000, priceMax: 5000000, brand: '', fuelType: '', condition: '' });
                      setSortBy('relevance');
                    }}
                    className="px-6 py-3 bg-blue-100 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-200 transition font-medium"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Vehicle Detail Modal */}
      {selectedVehicle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-5xl w-full max-h-[85vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 flex items-center justify-between bg-white/95 border-b border-slate-200 p-6">
              <h2 className="text-2xl font-bold text-slate-900">{selectedVehicle.brand} {selectedVehicle.model}</h2>
              <button
                onClick={() => setSelectedVehicle(null)}
                className="p-2 hover:bg-slate-100 rounded-lg transition"
              >
                <X className="w-6 h-6 text-slate-600" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <img
                src={selectedVehicle.image}
                alt={`${selectedVehicle.brand} ${selectedVehicle.model}`}
                className="w-full h-64 object-cover rounded-xl border border-slate-200"
              />

              {/* Price Section */}
              <div className="grid md:grid-cols-2 gap-6 pb-6 border-b border-slate-200">
                <div>
                  <p className="text-slate-600 text-sm mb-1 font-medium">Asking Price</p>
                  <p className="text-3xl font-bold text-blue-600">₹{(selectedVehicle.askingPrice / 100000).toFixed(2)}L</p>
                </div>
                <div>
                  <p className="text-slate-600 text-sm mb-1 font-medium">Market Value</p>
                  <p className="text-3xl font-bold text-green-600">₹{(selectedVehicle.marketValue / 100000).toFixed(2)}L</p>
                </div>
              </div>

              {/* Key Details */}
              <div>
                <h4 className="text-lg font-bold mb-4 text-slate-900">Vehicle Specifications</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <p className="text-slate-600 text-sm mb-1 font-medium">Year</p>
                    <p className="text-lg font-bold text-slate-900">{selectedVehicle.year}</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <p className="text-slate-600 text-sm mb-1 font-medium">Mileage</p>
                    <p className="text-lg font-bold text-slate-900">{selectedVehicle.mileage} km</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <p className="text-slate-600 text-sm mb-1 font-medium">Fuel Type</p>
                    <p className="text-lg font-bold text-slate-900">{selectedVehicle.fuelType}</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <p className="text-slate-600 text-sm mb-1 font-medium">Transmission</p>
                    <p className="text-lg font-bold text-slate-900">{selectedVehicle.transmission}</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <p className="text-slate-600 text-sm mb-1 font-medium">Engine CC</p>
                    <p className="text-lg font-bold text-slate-900">{selectedVehicle.engineCC}</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <p className="text-slate-600 text-sm mb-1 font-medium">Ownership</p>
                    <p className="text-lg font-bold text-slate-900">{selectedVehicle.ownershipType}</p>
                  </div>
                </div>
              </div>

              {/* Health Score */}
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-bold text-slate-900">Overall Health Score</span>
                  <span className={`text-2xl font-bold ${selectedVehicle.healthScore >= 90 ? 'text-green-600' : selectedVehicle.healthScore >= 80 ? 'text-yellow-600' : 'text-orange-600'}`}>
                    {selectedVehicle.healthScore}%
                  </span>
                </div>
                <div className="w-full bg-slate-300 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition ${selectedVehicle.healthScore >= 90 ? 'bg-green-500' : selectedVehicle.healthScore >= 80 ? 'bg-yellow-500' : 'bg-orange-500'}`}
                    style={{ width: `${selectedVehicle.healthScore}%` }}
                  ></div>
                </div>
              </div>

              {/* Additional Info */}
              <div>
                <h4 className="text-lg font-bold mb-4 text-slate-900">Additional Information</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-start bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <span className="text-slate-600 font-medium">Registration Number</span>
                    <span className="font-semibold text-slate-900">{selectedVehicle.registrationNumber}</span>
                  </div>
                  <div className="flex justify-between items-start bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <span className="text-slate-600 font-medium">Insurance Validity</span>
                    <span className="font-semibold text-slate-900">{selectedVehicle.insuranceValidity}</span>
                  </div>
                  <div className="flex justify-between items-start bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <span className="text-slate-600 font-medium">Service History</span>
                    <span className="font-semibold text-slate-900">{selectedVehicle.serviceHistory}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-lg font-bold mb-3 text-slate-900">Description</h4>
                <p className="text-slate-700 leading-relaxed">{selectedVehicle.description}</p>
              </div>

              {/* Features */}
              <div>
                <h4 className="text-lg font-bold mb-4 text-slate-900">Features & Amenities</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedVehicle.features?.map((feature, idx) => (
                    <span key={idx} className="bg-blue-100 border border-blue-300 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium">
                      ✓ {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Rating & Reviews */}
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <span className="text-xl font-bold text-slate-900">{selectedVehicle.rating}</span>
                  </div>
                  <p className="text-slate-700 font-medium">Based on {selectedVehicle.reviews} verified reviews</p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => toggleWishlist(selectedVehicle._id)}
                  className={`flex-1 py-3 rounded-xl font-semibold transition ${
                    wishlist.includes(selectedVehicle._id)
                      ? 'bg-red-100 border border-red-300 text-red-700 hover:bg-red-200'
                      : 'bg-slate-100 border border-slate-300 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {wishlist.includes(selectedVehicle._id) ? '❤️ Added to Wishlist' : '🤍 Save to Wishlist'}
                </button>
                <button className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-600/30 transition">
                  Contact Seller
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer/>
    </div>
  );
}