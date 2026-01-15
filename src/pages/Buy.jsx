import React, { useState } from 'react';
import { Zap, Search, Filter, Heart, MapPin, Gauge, Fuel, Users, Calendar, TrendingUp, Star, ChevronRight, X } from 'lucide-react';
import Navbar from './Navbar';

export default function BuyPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [filters, setFilters] = useState({
    priceMin: 0,
    priceMax: 5000000,
    brand: '',
    fuelType: '',
    condition: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mock vehicle data
  const vehicles = [
    {
      id: 1,
      brand: 'Maruti',
      model: 'Swift',
      year: 2021,
      price: 650000,
      marketValue: 680000,
      mileage: 45000,
      fuelType: 'Petrol',
      transmission: 'Manual',
      owner: 1,
      condition: 'Excellent',
      location: 'Mumbai, Maharashtra',
      image: 'https://images.unsplash.com/photo-1609405473622-461aa779418c?w=500&h=400&fit=crop',
      features: ['Power Steering', 'AC', 'Power Windows', 'ABS', 'Airbags', 'Sunroof'],
      rating: 4.8,
      reviews: 24,
      healthScore: 92
    },
    {
      id: 2,
      brand: 'Hyundai',
      model: 'i20',
      year: 2020,
      price: 750000,
      marketValue: 780000,
      mileage: 52000,
      fuelType: 'Petrol',
      transmission: 'Automatic',
      owner: 1,
      condition: 'Good',
      location: 'Delhi, Delhi',
      image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=500&h=400&fit=crop',
      features: ['Power Steering', 'AC', 'Power Windows', 'ABS', 'Airbags', 'Bluetooth'],
      rating: 4.6,
      reviews: 18,
      healthScore: 88
    },
    {
      id: 3,
      brand: 'Tata',
      model: 'Nexon',
      year: 2022,
      price: 950000,
      marketValue: 980000,
      mileage: 28000,
      fuelType: 'Diesel',
      transmission: 'Automatic',
      owner: 1,
      condition: 'Excellent',
      location: 'Bangalore, Karnataka',
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b83ad38?w=500&h=400&fit=crop',
      features: ['Power Steering', 'AC', 'Power Windows', 'ABS', 'Airbags', 'Sunroof', 'Touch Screen'],
      rating: 4.9,
      reviews: 32,
      healthScore: 95
    },
    {
      id: 4,
      brand: 'Honda',
      model: 'City',
      year: 2019,
      price: 820000,
      marketValue: 850000,
      mileage: 68000,
      fuelType: 'Petrol',
      transmission: 'Manual',
      owner: 2,
      condition: 'Good',
      location: 'Pune, Maharashtra',
      image: 'https://images.unsplash.com/photo-1619405399517-d4dc2500d312?w=500&h=400&fit=crop',
      features: ['Power Steering', 'AC', 'Power Windows', 'ABS', 'Airbags'],
      rating: 4.5,
      reviews: 15,
      healthScore: 85
    },
    {
      id: 5,
      brand: 'Mahindra',
      model: 'XUV500',
      year: 2021,
      price: 1200000,
      marketValue: 1250000,
      mileage: 35000,
      fuelType: 'Diesel',
      transmission: 'Automatic',
      owner: 1,
      condition: 'Excellent',
      location: 'Hyderabad, Telangana',
      image: 'https://images.unsplash.com/photo-1578584425555-a83d38bda8c0?w=500&h=400&fit=crop',
      features: ['Power Steering', 'AC', 'Power Windows', 'ABS', 'Airbags', 'Sunroof', 'Leather Seats'],
      rating: 4.7,
      reviews: 28,
      healthScore: 90
    },
    {
      id: 6,
      brand: 'Toyota',
      model: 'Fortuner',
      year: 2020,
      price: 1850000,
      marketValue: 1900000,
      mileage: 42000,
      fuelType: 'Diesel',
      transmission: 'Automatic',
      owner: 1,
      condition: 'Excellent',
      location: 'Chennai, Tamil Nadu',
      image: 'https://images.unsplash.com/photo-1605559424843-9e4c3ff86b90?w=500&h=400&fit=crop',
      features: ['Power Steering', 'AC', 'Power Windows', 'ABS', 'Airbags', 'Sunroof', 'Leather Seats', '4WD'],
      rating: 4.9,
      reviews: 41,
      healthScore: 94
    }
  ];

  const filteredVehicles = vehicles.filter(vehicle => {
    return (
      vehicle.price >= filters.priceMin &&
      vehicle.price <= filters.priceMax &&
      (filters.brand === '' || vehicle.brand.toLowerCase().includes(filters.brand.toLowerCase())) &&
      (filters.fuelType === '' || vehicle.fuelType === filters.fuelType) &&
      (filters.condition === '' || vehicle.condition === filters.condition)
    );
  });

  const toggleWishlist = (id) => {
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const priceDiscount = (vehicle) => {
    return Math.round(((vehicle.marketValue - vehicle.price) / vehicle.marketValue) * 100);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar/>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Find Your Perfect
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Used Vehicle
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Handpicked vehicles with AI-verified pricing and health scores. Buy with confidence.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="bg-gradient-to-r from-slate-900/50 to-slate-800/30 border border-slate-800 rounded-2xl p-6 mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-3 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by brand or model..."
                  value={filters.brand}
                  onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:border-cyan-400 transition text-white placeholder-slate-500"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-6 py-3 bg-slate-800/50 border border-slate-700 hover:border-cyan-400/50 rounded-xl font-semibold flex items-center justify-center gap-2 transition"
              >
                <Filter className="w-5 h-5" />
                Filters
              </button>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 mb-8 animate-fadeIn">
              <div className="grid md:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-3 text-slate-300">Price Range</label>
                  <div className="space-y-3">
                    <input
                      type="range"
                      min="0"
                      max="5000000"
                      value={filters.priceMax}
                      onChange={(e) => setFilters({ ...filters, priceMax: parseInt(e.target.value) })}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-slate-400">
                      <span>₹0</span>
                      <span>₹{(filters.priceMax / 100000).toFixed(1)}L</span>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-3 text-slate-300">Fuel Type</label>
                  <select
                    value={filters.fuelType}
                    onChange={(e) => setFilters({ ...filters, fuelType: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg focus:outline-none focus:border-cyan-400 text-white text-sm"
                  >
                    <option value="">All Types</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="CNG">CNG</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-3 text-slate-300">Condition</label>
                  <select
                    value={filters.condition}
                    onChange={(e) => setFilters({ ...filters, condition: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg focus:outline-none focus:border-cyan-400 text-white text-sm"
                  >
                    <option value="">All Conditions</option>
                    <option value="Excellent">Excellent</option>
                    <option value="Good">Good</option>
                    <option value="Average">Average</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    onClick={() => setFilters({ priceMin: 0, priceMax: 5000000, brand: '', fuelType: '', condition: '' })}
                    className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700 hover:border-cyan-400/50 rounded-lg font-semibold transition text-sm"
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Results Count */}
          <div className="mb-8">
            <p className="text-slate-400">
              Showing <span className="text-cyan-400 font-semibold">{filteredVehicles.length}</span> vehicles
            </p>
          </div>
        </div>
      </section>

      {/* Vehicles Grid */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVehicles.map(vehicle => (
              <div key={vehicle.id} className="group bg-slate-900/50 border border-slate-800 hover:border-cyan-400/50 rounded-2xl overflow-hidden transition hover:shadow-lg hover:shadow-cyan-400/10 cursor-pointer" onClick={() => setSelectedVehicle(vehicle)}>
                {/* Image Section */}
                <div className="relative overflow-hidden h-56">
                  <img
                    src={vehicle.image}
                    alt={`${vehicle.brand} ${vehicle.model}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                  />
                  
                  {/* Overlay Badges */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(vehicle.id);
                      }}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition ${
                        wishlist.includes(vehicle.id)
                          ? 'bg-red-500/80 text-white'
                          : 'bg-slate-950/50 text-slate-300 hover:bg-slate-950/80'
                      }`}
                    >
                      <Heart className="w-5 h-5" fill={wishlist.includes(vehicle.id) ? 'currentColor' : 'none'} />
                    </button>
                    <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-slate-950 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      {priceDiscount(vehicle)}% Off
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="absolute bottom-4 left-4 bg-slate-950/80 backdrop-blur-sm px-3 py-2 rounded-lg flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-semibold">{vehicle.rating}</span>
                    <span className="text-xs text-slate-400">({vehicle.reviews})</span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  {/* Title */}
                  <h3 className="text-xl font-bold mb-1">{vehicle.brand} {vehicle.model}</h3>
                  <div className="flex items-center gap-2 text-slate-400 text-sm mb-4">
                    <MapPin className="w-4 h-4" />
                    {vehicle.location}
                  </div>

                  {/* Price Section */}
                  <div className="mb-4 pb-4 border-b border-slate-800">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-2xl font-bold text-cyan-400">₹{(vehicle.price / 100000).toFixed(2)}L</span>
                      <span className="text-sm text-slate-400 line-through">₹{(vehicle.marketValue / 100000).toFixed(2)}L</span>
                    </div>
                    <p className="text-xs text-slate-500">Market Value: ₹{(vehicle.marketValue / 100000).toFixed(2)}L</p>
                  </div>

                  {/* Key Features */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-cyan-400" />
                      <span className="text-slate-300">{vehicle.year}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Gauge className="w-4 h-4 text-cyan-400" />
                      <span className="text-slate-300">{vehicle.mileage}km</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Fuel className="w-4 h-4 text-cyan-400" />
                      <span className="text-slate-300">{vehicle.fuelType}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-cyan-400" />
                      <span className="text-slate-300">{vehicle.owner} Owner</span>
                    </div>
                  </div>

                  {/* Health Score */}
                  <div className="bg-slate-800/30 rounded-lg p-3 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-slate-300">Health Score</span>
                      <span className={`text-lg font-bold ${vehicle.healthScore >= 90 ? 'text-green-400' : vehicle.healthScore >= 80 ? 'text-yellow-400' : 'text-orange-400'}`}>
                        {vehicle.healthScore}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition ${vehicle.healthScore >= 90 ? 'bg-green-400' : vehicle.healthScore >= 80 ? 'bg-yellow-400' : 'bg-orange-400'}`}
                        style={{ width: `${vehicle.healthScore}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Features Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {vehicle.features.slice(0, 3).map((feature, idx) => (
                      <span key={idx} className="text-xs bg-slate-800/50 text-slate-300 px-2 py-1 rounded">
                        {feature}
                      </span>
                    ))}
                    {vehicle.features.length > 3 && (
                      <span className="text-xs bg-slate-800/50 text-cyan-400 px-2 py-1 rounded">
                        +{vehicle.features.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* CTA Button */}
                  <button className="w-full py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-400/50 transition flex items-center justify-center gap-2 group/btn">
                    View Details
                    <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredVehicles.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-slate-400">No vehicles found matching your criteria</p>
              <button
                onClick={() => setFilters({ priceMin: 0, priceMax: 5000000, brand: '', fuelType: '', condition: '' })}
                className="mt-4 px-6 py-2 bg-cyan-400/10 border border-cyan-400/50 text-cyan-400 rounded-lg hover:bg-cyan-400/20 transition"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Vehicle Detail Modal */}
      {selectedVehicle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="sticky top-0 flex items-center justify-between bg-slate-900/95 border-b border-slate-800 p-6">
              <h2 className="text-2xl font-bold">{selectedVehicle.brand} {selectedVehicle.model}</h2>
              <button
                onClick={() => setSelectedVehicle(null)}
                className="p-2 hover:bg-slate-800 rounded-lg transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              <img
                src={selectedVehicle.image}
                alt={`${selectedVehicle.brand} ${selectedVehicle.model}`}
                className="w-full h-64 object-cover rounded-xl mb-6"
              />

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-slate-400 text-sm mb-1">Asking Price</p>
                  <p className="text-3xl font-bold text-cyan-400">₹{(selectedVehicle.price / 100000).toFixed(2)}L</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm mb-1">Market Value</p>
                  <p className="text-3xl font-bold text-green-400">₹{(selectedVehicle.marketValue / 100000).toFixed(2)}L</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
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
              </div>

              <div>
                <p className="font-semibold mb-3">Features</p>
                <div className="flex flex-wrap gap-2">
                  {selectedVehicle.features.map((feature, idx) => (
                    <span key={idx} className="bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 px-3 py-1 rounded-lg text-sm">
                      ✓ {feature}
                    </span>
                  ))}
                </div>
              </div>

              <button className="w-full mt-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-400/50 transition">
                Contact Seller
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}