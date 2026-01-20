import React, { useState } from 'react';
import { Search, Filter, Heart, MapPin, Gauge, Fuel, Users, Calendar, TrendingUp, Star, ChevronRight, X, AlertCircle, ChevronDown } from 'lucide-react';
import Navbar from './Navbar';

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
      <div className="min-h-screen bg-slate-950 text-white">
        <Navbar />
        <div className="text-center mt-40 text-slate-400 text-xl">
          Loading vehicles...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 text-white">
        <Navbar />
        <div className="text-center mt-40 text-red-400 text-xl">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="pt-24 pb-12">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-slate-900/80 via-slate-800/60 to-slate-900/80 border-b border-slate-800 py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              Find Your Perfect
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Used Vehicle
              </span>
            </h1>
            <p className="text-slate-300 text-lg">AI-verified pricing, health scores & intelligent comparisons</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 mt-8">
            {/* Left Sidebar - Filters */}
            <div className="lg:w-65 flex-shrink-0">
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 sticky top-24">
                {/* Budget Filter */}
                <div className="mb-8 pb-8 border-b border-slate-800">
                  <h3 className="text-lg font-semibold mb-4 text-white">Budget</h3>
                  <div className="space-y-4">
                    <div>
                      <input
                        type="range"
                        min="100000"
                        max="5000000"
                        value={filters.priceMax}
                        onChange={(e) => setFilters({ ...filters, priceMax: parseInt(e.target.value) })}
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                      />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">₹ {(filters.priceMin / 100000).toFixed(1)}L</span>
                      <span className="text-cyan-400 font-semibold">₹{(filters.priceMax / 100000).toFixed(1)}L</span>
                    </div>
                  </div>
                </div>

                {/* Make & Model Search */}
                <div className="mb-8 pb-8 border-b border-slate-800">
                  <h3 className="text-lg font-semibold mb-4 text-white">Make & Model</h3>
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      placeholder="Search a brand or model"
                      value={filters.brand}
                      onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
                      className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg focus:outline-none focus:border-cyan-400 text-white placeholder-slate-500 text-sm"
                    />
                  </div>

                  <div className="mb-4">
                    <button className="w-full text-left font-semibold text-slate-300 mb-2">All Brands</button>
                  </div>

                  {/* Brand List */}
                  <div className="space-y-2">
                    {Object.entries(brandCounts).map(([brand, count]) => (
                      <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={filters.brand === brand}
                          onChange={(e) => setFilters({ ...filters, brand: e.target.checked ? brand : '' })}
                          className="w-4 h-4 rounded bg-slate-700 border-slate-600 text-cyan-500 cursor-pointer"
                        />
                        <span className="text-slate-300 group-hover:text-slate-200 text-sm">{brand}</span>
                        <span className="text-slate-500 text-sm ml-auto">({count})</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Fuel Type Filter */}
                <div className="mb-8 pb-8 border-b border-slate-800">
                  <h3 className="text-lg font-semibold mb-4 text-white">Fuel Type</h3>
                  <div className="space-y-2">
                    {['Petrol', 'Diesel', 'CNG', 'Hybrid', 'Electric'].map(fuel => (
                      <label key={fuel} className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={filters.fuelType === fuel}
                          onChange={(e) => setFilters({ ...filters, fuelType: e.target.checked ? fuel : '' })}
                          className="w-4 h-4 rounded bg-slate-700 border-slate-600 text-cyan-500 cursor-pointer"
                        />
                        <span className="text-slate-300 group-hover:text-slate-200 text-sm">{fuel}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Condition Filter */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-4 text-white">Condition</h3>
                  <div className="space-y-2">
                    {['Excellent', 'Good', 'Average', 'Fair'].map(cond => (
                      <label key={cond} className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={filters.condition === cond}
                          onChange={(e) => setFilters({ ...filters, condition: e.target.checked ? cond : '' })}
                          className="w-4 h-4 rounded bg-slate-700 border-slate-600 text-cyan-500 cursor-pointer"
                        />
                        <span className="text-slate-300 group-hover:text-slate-200 text-sm">{cond}</span>
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
                  className="w-full mt-6 px-4 py-2 bg-slate-800/50 border border-slate-700 hover:border-cyan-400/50 rounded-lg font-semibold transition text-sm text-slate-300"
                >
                  Reset Filters
                </button>
              </div>
            </div>

            {/* Right Section - Results & Grid */}
            <div className="flex-1">
              {/* Sort & Results Info */}
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-800">
                <div className="text-slate-400">
                  Showing <span className="text-cyan-400 font-semibold">{sortedVehicles.length}</span> vehicles
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-slate-400 text-sm">❤️ Wishlist: <span className="text-cyan-400 font-semibold">{wishlist.length}</span></span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg focus:outline-none focus:border-cyan-400 text-white text-sm"
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {sortedVehicles.map(vehicle => (
                  <div
                    key={vehicle._id}
                    className="bg-slate-900/50 border border-slate-800 hover:border-cyan-400/50 rounded-xl overflow-hidden transition hover:shadow-lg hover:shadow-cyan-400/10 group cursor-pointer"
                    onClick={() => setSelectedVehicle(vehicle)}
                  >
                    {/* Image Container */}
                    <div className="relative overflow-hidden h-48 bg-slate-800">
                      <img
                        src={vehicle.image}
                        alt={`${vehicle.brand} ${vehicle.model}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                      {/* Badge & Wishlist */}
                      <div className="absolute top-3 right-3 flex gap-2">
                        <div className="bg-cyan-500 text-slate-950 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          {priceDiscount(vehicle)}% off
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist(vehicle._id);
                          }}
                          className="bg-slate-950/70 hover:bg-slate-950 p-2 rounded-full transition"
                        >
                          <Heart
                            className="w-5 h-5"
                            fill={wishlist.includes(vehicle._id) ? 'currentColor' : 'none'}
                            color={wishlist.includes(vehicle._id) ? '#ef4444' : '#e2e8f0'}
                          />
                        </button>
                      </div>

                      {/* Badge/Certification */}
                      <div className="absolute top-3 left-3 bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
                        ✓ AI Verified
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      {/* Title */}
                      <h3 className="text-lg font-bold mb-1">{vehicle.year} {vehicle.brand} {vehicle.model}</h3>

                      {/* Key Stats - 4 Column Grid */}
                      <div className="grid grid-cols-3 gap-2 mb-4 pb-4 border-b border-slate-800">
                        <div className="flex items-center gap-1 text-sm">
                          <Gauge className="w-4 h-4 text-cyan-400" />
                          <span className="text-slate-400">{vehicle.mileage.toLocaleString()} </span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Fuel className="w-4 h-4 text-cyan-400" />
                          <span className="text-slate-400">{vehicle.fuelType}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <span className="text-slate-400">| {vehicle.transmission} |</span>
                        </div>
                      </div>

                      {/* Price & EMI Section */}
                      <div className="mb-4">
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className="text-2xl font-bold text-cyan-400">₹{(vehicle.askingPrice / 100000).toFixed(2)}L</span>
                          {/* <span className="text-sm text-slate-400 line-through">₹{(vehicle.marketValue / 100000).toFixed(2)}L</span> */}
                        </div>
                        <p className="text-xs text-slate-500">EMI starts ₹{Math.round(vehicle.askingPrice / 60).toLocaleString()}/month</p>
                      </div>

                      {/* Location */}
                      <div className="flex items-center gap-1 text-slate-400 text-sm mb-3">
                        <MapPin className="w-4 h-4" />
                        {vehicle.seller?.city}, {vehicle.seller?.state}
                      </div>

                      {/* Health Score Bar */}
                      {/* <div className="mb-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-semibold text-slate-300">Health Score</span>
                          <span className={`text-xs font-bold ${vehicle.healthScore >= 90 ? 'text-green-400' : vehicle.healthScore >= 80 ? 'text-yellow-400' : 'text-orange-400'}`}>
                            {vehicle.healthScore}%
                          </span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full ${vehicle.healthScore >= 90 ? 'bg-green-400' : vehicle.healthScore >= 80 ? 'bg-yellow-400' : 'bg-orange-400'}`}
                            style={{ width: `${vehicle.healthScore}%` }}
                          ></div>
                        </div>
                      </div> */}

                      {/* Features (2 visible + more indicator) */}
                      {/* <div className="flex flex-wrap gap-1 mb-3">
                        {vehicle.features?.slice(0, 2).map((feature, idx) => (
                          <span key={idx} className="text-xs bg-slate-800/50 text-slate-300 px-2 py-1 rounded">
                            {feature}
                          </span>
                        ))}
                        {vehicle.features?.length > 2 && (
                          <span className="text-xs bg-slate-800/50 text-cyan-400 px-2 py-1 rounded">
                            +{vehicle.features.length - 2} more
                          </span>
                        )}
                      </div> */}

                      {/* View Details Button */}
                      <button className="w-full py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-400/50 transition text-sm">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Empty State */}
              {sortedVehicles.length === 0 && (
                <div className="text-center py-16">
                  <AlertCircle className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <p className="text-xl text-slate-400 mb-4">No vehicles found matching your criteria</p>
                  <button
                    onClick={() => {
                      setFilters({ priceMin: 100000, priceMax: 5000000, brand: '', fuelType: '', condition: '' });
                      setSortBy('relevance');
                    }}
                    className="px-6 py-3 bg-cyan-400/10 border border-cyan-400/50 text-cyan-400 rounded-lg hover:bg-cyan-400/20 transition font-medium"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-5xl w-full max-h-[85vh] overflow-y-auto">
            <div className="sticky top-0 flex items-center justify-between bg-slate-900/95 border-b border-slate-800 p-6">
              <h2 className="text-2xl font-bold">{selectedVehicle.brand} {selectedVehicle.model}</h2>
              <button
                onClick={() => setSelectedVehicle(null)}
                className="p-2 hover:bg-slate-800 rounded-lg transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <img
                src={selectedVehicle.image}
                alt={`${selectedVehicle.brand} ${selectedVehicle.model}`}
                className="w-full h-64 object-cover rounded-xl"
              />

              {/* Price Section */}
              <div className="grid md:grid-cols-2 gap-6 pb-6 border-b border-slate-800">
                <div>
                  <p className="text-slate-400 text-sm mb-1">Asking Price</p>
                  <p className="text-3xl font-bold text-cyan-400">₹{(selectedVehicle.askingPrice / 100000).toFixed(2)}L</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm mb-1">Market Value</p>
                  <p className="text-3xl font-bold text-green-400">₹{(selectedVehicle.marketValue / 100000).toFixed(2)}L</p>
                </div>
              </div>

              {/* Key Details */}
              <div>
                <h4 className="text-lg font-semibold mb-4 text-slate-200">Vehicle Specifications</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-slate-800/30 p-4 rounded-xl">
                    <p className="text-slate-400 text-sm mb-1">Year</p>
                    <p className="text-lg font-semibold">{selectedVehicle.year}</p>
                  </div>
                  <div className="bg-slate-800/30 p-4 rounded-xl">
                    <p className="text-slate-400 text-sm mb-1">Mileage</p>
                    <p className="text-lg font-semibold">{selectedVehicle.mileage} km</p>
                  </div>
                  <div className="bg-slate-800/30 p-4 rounded-xl">
                    <p className="text-slate-400 text-sm mb-1">Fuel Type</p>
                    <p className="text-lg font-semibold">{selectedVehicle.fuelType}</p>
                  </div>
                  <div className="bg-slate-800/30 p-4 rounded-xl">
                    <p className="text-slate-400 text-sm mb-1">Transmission</p>
                    <p className="text-lg font-semibold">{selectedVehicle.transmission}</p>
                  </div>
                  <div className="bg-slate-800/30 p-4 rounded-xl">
                    <p className="text-slate-400 text-sm mb-1">Engine CC</p>
                    <p className="text-lg font-semibold">{selectedVehicle.engineCC}</p>
                  </div>
                  <div className="bg-slate-800/30 p-4 rounded-xl">
                    <p className="text-slate-400 text-sm mb-1">Ownership</p>
                    <p className="text-lg font-semibold">{selectedVehicle.ownershipType}</p>
                  </div>
                </div>
              </div>

              {/* Health Score */}
              <div className="bg-slate-800/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-slate-300">Overall Health Score</span>
                  <span className={`text-2xl font-bold ${selectedVehicle.healthScore >= 90 ? 'text-green-400' : selectedVehicle.healthScore >= 80 ? 'text-yellow-400' : 'text-orange-400'}`}>
                    {selectedVehicle.healthScore}%
                  </span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition ${selectedVehicle.healthScore >= 90 ? 'bg-green-400' : selectedVehicle.healthScore >= 80 ? 'bg-yellow-400' : 'bg-orange-400'}`}
                    style={{ width: `${selectedVehicle.healthScore}%` }}
                  ></div>
                </div>
              </div>

              {/* Additional Info */}
              <div>
                <h4 className="text-lg font-semibold mb-4 text-slate-200">Additional Information</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-start bg-slate-800/20 p-3 rounded-lg">
                    <span className="text-slate-400">Registration Number</span>
                    <span className="font-semibold text-slate-200">{selectedVehicle.registrationNumber}</span>
                  </div>
                  <div className="flex justify-between items-start bg-slate-800/20 p-3 rounded-lg">
                    <span className="text-slate-400">Insurance Validity</span>
                    <span className="font-semibold text-slate-200">{selectedVehicle.insuranceValidity}</span>
                  </div>
                  <div className="flex justify-between items-start bg-slate-800/20 p-3 rounded-lg">
                    <span className="text-slate-400">Service History</span>
                    <span className="font-semibold text-slate-200">{selectedVehicle.serviceHistory}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-lg font-semibold mb-3 text-slate-200">Description</h4>
                <p className="text-slate-300 leading-relaxed">{selectedVehicle.description}</p>
              </div>

              {/* Features */}
              <div>
                <h4 className="text-lg font-semibold mb-4 text-slate-200">Features & Amenities</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedVehicle.features?.map((feature, idx) => (
                    <span key={idx} className="bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 px-3 py-2 rounded-lg text-sm font-medium">
                      ✓ {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Rating & Reviews */}
              <div className="bg-slate-800/30 rounded-lg p-4">
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="text-xl font-bold">{selectedVehicle.rating}</span>
                  </div>
                  <p className="text-slate-300">Based on {selectedVehicle.reviews} verified reviews</p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => toggleWishlist(selectedVehicle._id)}
                  className={`flex-1 py-3 rounded-xl font-semibold transition ${
                    wishlist.includes(selectedVehicle._id)
                      ? 'bg-red-500/20 border border-red-500/50 text-red-300 hover:bg-red-500/30'
                      : 'bg-slate-800/50 border border-slate-700 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  {wishlist.includes(selectedVehicle._id) ? '❤️ Added to Wishlist' : '🤍 Save to Wishlist'}
                </button>
                <button className="flex-1 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-400/50 transition">
                  Contact Seller
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}