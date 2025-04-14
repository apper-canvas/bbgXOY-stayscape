import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Users, MapPin, Search, X, Check, AlertCircle } from 'lucide-react'

// Mock data for locations
const POPULAR_LOCATIONS = [
  { id: 1, name: "New York", country: "United States", image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" },
  { id: 2, name: "Paris", country: "France", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1746&q=80" },
  { id: 3, name: "Tokyo", country: "Japan", image: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1736&q=80" },
  { id: 4, name: "Bali", country: "Indonesia", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1738&q=80" },
  { id: 5, name: "Barcelona", country: "Spain", image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" },
  { id: 6, name: "Sydney", country: "Australia", image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" }
];

function MainFeature() {
  const [searchStep, setSearchStep] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [checkInDate, setCheckInDate] = useState("")
  const [checkOutDate, setCheckOutDate] = useState("")
  const [guestCount, setGuestCount] = useState(1)
  const [showResults, setShowResults] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  
  // Filter locations based on search query
  const filteredLocations = searchQuery.trim() === "" 
    ? POPULAR_LOCATIONS 
    : POPULAR_LOCATIONS.filter(location => 
        location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        location.country.toLowerCase().includes(searchQuery.toLowerCase())
      );
  
  // Handle location selection
  const handleLocationSelect = (location) => {
    setSelectedLocation(location)
    setSearchStep(2)
    setErrors({})
  }
  
  // Handle date selection
  const handleDateSelection = () => {
    // Validate dates
    const errors = {}
    
    if (!checkInDate) {
      errors.checkIn = "Please select a check-in date"
    }
    
    if (!checkOutDate) {
      errors.checkOut = "Please select a check-out date"
    }
    
    if (checkInDate && checkOutDate && new Date(checkInDate) >= new Date(checkOutDate)) {
      errors.dates = "Check-out date must be after check-in date"
    }
    
    if (Object.keys(errors).length > 0) {
      setErrors(errors)
      return
    }
    
    setSearchStep(3)
    setErrors({})
  }
  
  // Handle guest selection
  const handleGuestSelection = () => {
    setSearchStep(4)
  }
  
  // Handle search submission
  const handleSearch = () => {
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      // Mock search results based on selected location
      setSearchResults([
        {
          id: 101,
          title: `Luxury Apartment in ${selectedLocation.name}`,
          location: selectedLocation.name,
          price: Math.floor(Math.random() * 200) + 100,
          rating: (4 + Math.random()).toFixed(2),
          image: selectedLocation.image
        },
        {
          id: 102,
          title: `Cozy Studio in Downtown ${selectedLocation.name}`,
          location: selectedLocation.name,
          price: Math.floor(Math.random() * 150) + 80,
          rating: (4 + Math.random()).toFixed(2),
          image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
        },
        {
          id: 103,
          title: `Modern Loft with ${selectedLocation.name} Views`,
          location: selectedLocation.name,
          price: Math.floor(Math.random() * 250) + 120,
          rating: (4 + Math.random()).toFixed(2),
          image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1980&q=80"
        }
      ])
      
      setIsLoading(false)
      setShowResults(true)
    }, 1500)
  }
  
  // Reset search
  const resetSearch = () => {
    setSearchStep(1)
    setSelectedLocation(null)
    setCheckInDate("")
    setCheckOutDate("")
    setGuestCount(1)
    setShowResults(false)
    setErrors({})
  }
  
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <section className="py-16 bg-surface-50 dark:bg-surface-800/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Find your perfect stay</h2>
          <p className="text-surface-600 dark:text-surface-400 max-w-2xl mx-auto">
            Search through thousands of unique properties around the world and book your next adventure with ease.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {/* Multi-step Search Interface */}
          <div className="bg-white dark:bg-surface-800 rounded-2xl shadow-soft overflow-hidden">
            {/* Progress Steps */}
            <div className="flex border-b border-surface-200 dark:border-surface-700">
              {[1, 2, 3, 4].map((step) => (
                <div 
                  key={step}
                  className={`flex-1 py-4 text-center relative ${
                    searchStep === step 
                      ? 'text-primary font-medium' 
                      : searchStep > step 
                        ? 'text-secondary font-medium' 
                        : 'text-surface-400'
                  }`}
                >
                  <div className="flex items-center justify-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      searchStep === step 
                        ? 'bg-primary/10 text-primary' 
                        : searchStep > step 
                          ? 'bg-secondary/10 text-secondary' 
                          : 'bg-surface-100 dark:bg-surface-700 text-surface-400'
                    }`}>
                      {searchStep > step ? (
                        <Check size={16} />
                      ) : (
                        step
                      )}
                    </div>
                    <span className="ml-2 hidden sm:inline">
                      {step === 1 ? 'Location' : step === 2 ? 'Dates' : step === 3 ? 'Guests' : 'Review'}
                    </span>
                  </div>
                  
                  {step < 4 && (
                    <div className="absolute top-1/2 right-0 w-full h-0.5 bg-surface-200 dark:bg-surface-700 -z-10"></div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Step Content */}
            <div className="p-6">
              <AnimatePresence mode="wait">
                {/* Step 1: Location */}
                {searchStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold mb-2">Where are you going?</h3>
                      <p className="text-surface-600 dark:text-surface-400 text-sm">
                        Search for a city or specific neighborhood
                      </p>
                    </div>
                    
                    <div className="relative mb-6">
                      <div className="relative">
                        <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
                        <input
                          type="text"
                          placeholder="Search destinations"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="input pl-10"
                        />
                        {searchQuery && (
                          <button 
                            onClick={() => setSearchQuery("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-600 dark:hover:text-surface-300"
                          >
                            <X size={18} />
                          </button>
                        )}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-medium mb-3">Popular destinations</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {filteredLocations.map(location => (
                          <div
                            key={location.id}
                            onClick={() => handleLocationSelect(location)}
                            className="cursor-pointer group"
                          >
                            <div className="relative rounded-lg overflow-hidden aspect-[4/3]">
                              <img 
                                src={location.image} 
                                alt={location.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                              <div className="absolute bottom-0 left-0 p-3 text-white">
                                <div className="font-medium">{location.name}</div>
                                <div className="text-sm text-white/80">{location.country}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {/* Step 2: Dates */}
                {searchStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-1">When will you be there?</h3>
                        <p className="text-surface-600 dark:text-surface-400 text-sm">
                          Select your check-in and check-out dates
                        </p>
                      </div>
                      <button 
                        onClick={() => setSearchStep(1)}
                        className="text-primary hover:underline text-sm font-medium"
                      >
                        Change location
                      </button>
                    </div>
                    
                    <div className="bg-surface-50 dark:bg-surface-700/30 rounded-lg p-4 mb-6">
                      <div className="flex items-center">
                        <MapPin size={18} className="text-primary mr-2" />
                        <div>
                          <div className="font-medium">{selectedLocation.name}</div>
                          <div className="text-sm text-surface-600 dark:text-surface-400">{selectedLocation.country}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="checkIn" className="label">Check-in date</label>
                        <div className="relative">
                          <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
                          <input
                            id="checkIn"
                            type="date"
                            value={checkInDate}
                            onChange={(e) => setCheckInDate(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                            className={`input pl-10 ${errors.checkIn || errors.dates ? 'border-red-500 dark:border-red-500' : ''}`}
                          />
                        </div>
                        {errors.checkIn && (
                          <p className="mt-1 text-sm text-red-500 flex items-center">
                            <AlertCircle size={14} className="mr-1" />
                            {errors.checkIn}
                          </p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="checkOut" className="label">Check-out date</label>
                        <div className="relative">
                          <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
                          <input
                            id="checkOut"
                            type="date"
                            value={checkOutDate}
                            onChange={(e) => setCheckOutDate(e.target.value)}
                            min={checkInDate || new Date().toISOString().split('T')[0]}
                            className={`input pl-10 ${errors.checkOut || errors.dates ? 'border-red-500 dark:border-red-500' : ''}`}
                          />
                        </div>
                        {errors.checkOut && (
                          <p className="mt-1 text-sm text-red-500 flex items-center">
                            <AlertCircle size={14} className="mr-1" />
                            {errors.checkOut}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    {errors.dates && (
                      <div className="mb-6 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-600 dark:text-red-400 flex items-center">
                        <AlertCircle size={16} className="mr-2 flex-shrink-0" />
                        {errors.dates}
                      </div>
                    )}
                    
                    <div className="flex justify-end">
                      <button 
                        onClick={handleDateSelection}
                        className="btn btn-primary"
                      >
                        Continue to guests
                      </button>
                    </div>
                  </motion.div>
                )}
                
                {/* Step 3: Guests */}
                {searchStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-1">How many guests?</h3>
                        <p className="text-surface-600 dark:text-surface-400 text-sm">
                          Select the number of guests for your stay
                        </p>
                      </div>
                      <button 
                        onClick={() => setSearchStep(2)}
                        className="text-primary hover:underline text-sm font-medium"
                      >
                        Change dates
                      </button>
                    </div>
                    
                    <div className="bg-surface-50 dark:bg-surface-700/30 rounded-lg p-4 mb-6 space-y-3">
                      <div className="flex items-center">
                        <MapPin size={18} className="text-primary mr-2" />
                        <div>
                          <div className="font-medium">{selectedLocation.name}</div>
                          <div className="text-sm text-surface-600 dark:text-surface-400">{selectedLocation.country}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Calendar size={18} className="text-secondary mr-2" />
                        <div>
                          <div className="font-medium">{formatDate(checkInDate)} - {formatDate(checkOutDate)}</div>
                          <div className="text-sm text-surface-600 dark:text-surface-400">
                            {(() => {
                              if (!checkInDate || !checkOutDate) return "";
                              const start = new Date(checkInDate);
                              const end = new Date(checkOutDate);
                              const diffTime = Math.abs(end - start);
                              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                              return `${diffDays} ${diffDays === 1 ? 'night' : 'nights'}`;
                            })()}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="guests" className="label">Number of guests</label>
                      <div className="flex items-center">
                        <button 
                          onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                          className="p-2 rounded-l-lg border border-surface-300 dark:border-surface-600 bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
                          disabled={guestCount <= 1}
                        >
                          <span className="text-xl font-medium">−</span>
                        </button>
                        
                        <div className="px-6 py-2 border-t border-b border-surface-300 dark:border-surface-600 flex items-center justify-center min-w-[80px]">
                          <span className="font-medium">{guestCount}</span>
                        </div>
                        
                        <button 
                          onClick={() => setGuestCount(Math.min(16, guestCount + 1))}
                          className="p-2 rounded-r-lg border border-surface-300 dark:border-surface-600 bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
                          disabled={guestCount >= 16}
                        >
                          <span className="text-xl font-medium">+</span>
                        </button>
                        
                        <div className="ml-3 flex items-center text-surface-600 dark:text-surface-400">
                          <Users size={18} className="mr-2" />
                          <span>{guestCount} {guestCount === 1 ? 'guest' : 'guests'}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <button 
                        onClick={handleGuestSelection}
                        className="btn btn-primary"
                      >
                        Continue to review
                      </button>
                    </div>
                  </motion.div>
                )}
                
                {/* Step 4: Review & Search */}
                {searchStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold mb-1">Review your trip details</h3>
                      <p className="text-surface-600 dark:text-surface-400 text-sm">
                        Make sure everything looks right before searching
                      </p>
                    </div>
                    
                    <div className="bg-surface-50 dark:bg-surface-700/30 rounded-lg p-5 mb-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <div className="text-sm text-surface-600 dark:text-surface-400">Location</div>
                          <div className="flex items-start">
                            <MapPin size={18} className="text-primary mr-2 mt-0.5" />
                            <div>
                              <div className="font-medium">{selectedLocation.name}</div>
                              <div className="text-sm text-surface-600 dark:text-surface-400">{selectedLocation.country}</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="text-sm text-surface-600 dark:text-surface-400">Dates</div>
                          <div className="flex items-start">
                            <Calendar size={18} className="text-secondary mr-2 mt-0.5" />
                            <div>
                              <div className="font-medium">{formatDate(checkInDate)} - {formatDate(checkOutDate)}</div>
                              <div className="text-sm text-surface-600 dark:text-surface-400">
                                {(() => {
                                  if (!checkInDate || !checkOutDate) return "";
                                  const start = new Date(checkInDate);
                                  const end = new Date(checkOutDate);
                                  const diffTime = Math.abs(end - start);
                                  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                                  return `${diffDays} ${diffDays === 1 ? 'night' : 'nights'}`;
                                })()}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="text-sm text-surface-600 dark:text-surface-400">Guests</div>
                          <div className="flex items-start">
                            <Users size={18} className="text-accent mr-2 mt-0.5" />
                            <div>
                              <div className="font-medium">{guestCount} {guestCount === 1 ? 'guest' : 'guests'}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row justify-between items-center">
                      <button 
                        onClick={resetSearch}
                        className="mb-4 sm:mb-0 text-surface-600 dark:text-surface-400 hover:text-surface-800 dark:hover:text-surface-200 transition-colors"
                      >
                        Start over
                      </button>
                      
                      <button 
                        onClick={handleSearch}
                        className="btn btn-primary w-full sm:w-auto"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            Searching...
                          </>
                        ) : (
                          <>
                            <Search size={18} className="mr-2" />
                            Search properties
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          {/* Search Results */}
          <AnimatePresence>
            {showResults && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-12"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">
                    {searchResults.length} properties found in {selectedLocation.name}
                  </h3>
                  <button 
                    onClick={resetSearch}
                    className="text-primary hover:underline text-sm font-medium"
                  >
                    New search
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {searchResults.map(result => (
                    <motion.div
                      key={result.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="card group hover:shadow-lg"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img 
                          src={result.image} 
                          alt={result.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold line-clamp-1">{result.title}</h4>
                          <div className="flex items-center bg-primary/10 text-primary px-2 py-0.5 rounded-full text-sm">
                            <Star size={14} className="mr-1 fill-primary" />
                            {result.rating}
                          </div>
                        </div>
                        
                        <div className="flex items-center text-surface-600 dark:text-surface-400 text-sm mb-3">
                          <MapPin size={14} className="mr-1" />
                          <span>{result.location}</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-semibold">${result.price}</span>
                            <span className="text-surface-600 dark:text-surface-400"> / night</span>
                          </div>
                          
                          <button className="btn btn-primary text-sm">
                            View details
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default MainFeature