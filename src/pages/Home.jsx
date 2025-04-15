import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, MapPin, Calendar, Users, Filter, Heart, Star } from 'lucide-react'
import MainFeature from '../components/MainFeature'

// Mock data for properties
const PROPERTIES = [
  {
    id: 1,
    title: "Luxury Beachfront Villa",
    location: "Malibu, California",
    price: 349,
    rating: 4.97,
    reviews: 128,
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    superhost: true,
    type: "Entire villa",
    beds: 4,
    baths: 3,
    amenities: ["Pool", "Ocean view", "Kitchen", "Wifi", "Free parking"]
  },
  {
    id: 2,
    title: "Modern Downtown Loft",
    location: "New York, New York",
    price: 189,
    rating: 4.85,
    reviews: 96,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1980&q=80",
    superhost: false,
    type: "Entire apartment",
    beds: 2,
    baths: 1,
    amenities: ["City view", "Kitchen", "Wifi", "Gym access"]
  },
  {
    id: 3,
    title: "Cozy Mountain Cabin",
    location: "Aspen, Colorado",
    price: 225,
    rating: 4.92,
    reviews: 74,
    image: "https://images.unsplash.com/photo-1518732714860-b62714ce0c59?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    superhost: true,
    type: "Entire cabin",
    beds: 3,
    baths: 2,
    amenities: ["Mountain view", "Fireplace", "Hot tub", "Wifi", "Free parking"]
  },
  {
    id: 4,
    title: "Tropical Paradise Villa",
    location: "Bali, Indonesia",
    price: 175,
    rating: 4.89,
    reviews: 112,
    image: "https://images.unsplash.com/photo-1505731110654-99d7f7f8e39c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1574&q=80",
    superhost: false,
    type: "Entire villa",
    beds: 2,
    baths: 2,
    amenities: ["Pool", "Garden view", "Kitchen", "Wifi", "Breakfast"]
  },
  {
    id: 5,
    title: "Historic City Apartment",
    location: "Paris, France",
    price: 210,
    rating: 4.81,
    reviews: 63,
    image: "https://images.unsplash.com/photo-1501876725168-00c445821c9e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    superhost: true,
    type: "Entire apartment",
    beds: 1,
    baths: 1,
    amenities: ["City view", "Kitchen", "Wifi", "Washer/Dryer"]
  },
  {
    id: 6,
    title: "Lakefront Cottage",
    location: "Lake Tahoe, California",
    price: 275,
    rating: 4.95,
    reviews: 87,
    image: "https://images.unsplash.com/photo-1475113548554-5a36f1f523d6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    superhost: false,
    type: "Entire cottage",
    beds: 3,
    baths: 2,
    amenities: ["Lake view", "Fireplace", "Kitchen", "Wifi", "Free parking"]
  }
];

// Property categories
const CATEGORIES = [
  { id: "all", name: "All", icon: "🏠" },
  { id: "beach", name: "Beach", icon: "🏖️" },
  { id: "mountain", name: "Mountain", icon: "⛰️" },
  { id: "city", name: "City", icon: "🏙️" },
  { id: "countryside", name: "Countryside", icon: "🌄" },
  { id: "lake", name: "Lake", icon: "🌊" },
  { id: "tropical", name: "Tropical", icon: "🌴" },
  { id: "skiing", name: "Skiing", icon: "⛷️" },
  { id: "desert", name: "Desert", icon: "🏜️" },
  { id: "historic", name: "Historic", icon: "🏛️" }
];

function Home() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [favorites, setFavorites] = useState([])
  const [searchParams, setSearchParams] = useState({
    location: "",
    checkIn: "",
    checkOut: "",
    guests: 1
  })
  
  const toggleFavorite = (propertyId) => {
    if (favorites.includes(propertyId)) {
      setFavorites(favorites.filter(id => id !== propertyId))
    } else {
      setFavorites([...favorites, propertyId])
    }
  }
  
  const handleSearchChange = (e) => {
    const { name, value } = e.target
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handleSearch = (e) => {
    e.preventDefault()
    // In a real app, this would trigger an API call with the search parameters
    console.log("Searching with params:", searchParams)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
            alt="Beautiful vacation destination" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20"></div>
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-shadow-lg">
              Find your perfect getaway
            </h1>
            <p className="text-xl text-white/90 mb-8 text-shadow">
              Discover unique stays around the world with HomeStay
            </p>
            
            {/* Search Form */}
            <form 
              onSubmit={handleSearch}
              className="bg-white dark:bg-surface-800 rounded-2xl shadow-lg p-4 grid grid-cols-1 md:grid-cols-4 gap-4"
            >
              <div className="relative">
                <label htmlFor="location" className="label">Where</label>
                <div className="relative">
                  <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
                  <input
                    id="location"
                    name="location"
                    type="text"
                    placeholder="Search destinations"
                    value={searchParams.location}
                    onChange={handleSearchChange}
                    className="input pl-10"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="checkIn" className="label">Check in</label>
                <div className="relative">
                  <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
                  <input
                    id="checkIn"
                    name="checkIn"
                    type="date"
                    value={searchParams.checkIn}
                    onChange={handleSearchChange}
                    className="input pl-10"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="checkOut" className="label">Check out</label>
                <div className="relative">
                  <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
                  <input
                    id="checkOut"
                    name="checkOut"
                    type="date"
                    value={searchParams.checkOut}
                    onChange={handleSearchChange}
                    className="input pl-10"
                  />
                </div>
              </div>
              
              <div className="flex flex-col">
                <label htmlFor="guests" className="label">Guests</label>
                <div className="relative flex-grow">
                  <Users size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
                  <select
                    id="guests"
                    name="guests"
                    value={searchParams.guests}
                    onChange={handleSearchChange}
                    className="input pl-10 appearance-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'guest' : 'guests'}</option>
                    ))}
                  </select>
                </div>
                
                <button 
                  type="submit"
                  className="mt-2 md:mt-auto btn btn-primary"
                >
                  <Search size={18} className="mr-2" />
                  Search
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
      
      {/* Categories */}
      <section className="py-8 border-b border-surface-200 dark:border-surface-700">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto scrollbar-hide pb-4 space-x-4">
            {CATEGORIES.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex flex-col items-center px-4 py-2 rounded-xl transition-all ${
                  selectedCategory === category.id 
                    ? 'bg-surface-800 dark:bg-surface-100 text-white dark:text-surface-900' 
                    : 'bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600'
                }`}
              >
                <span className="text-2xl mb-1">{category.icon}</span>
                <span className="text-sm font-medium whitespace-nowrap">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Main Feature */}
      <MainFeature />
      
      {/* Property Listings */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Featured places to stay</h2>
            <button className="btn btn-outline flex items-center">
              <Filter size={16} className="mr-2" />
              Filters
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROPERTIES.map(property => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="card group hover:shadow-lg"
              >
                {/* Property Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={property.image} 
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Favorite Button */}
                  <button
                    onClick={() => toggleFavorite(property.id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/80 dark:bg-surface-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-surface-800 transition-colors"
                    aria-label={favorites.includes(property.id) ? "Remove from favorites" : "Add to favorites"}
                  >
                    <Heart 
                      size={20} 
                      className={favorites.includes(property.id) 
                        ? "fill-primary text-primary" 
                        : "text-surface-600 dark:text-surface-300"} 
                    />
                  </button>
                  
                  {/* Superhost Badge */}
                  {property.superhost && (
                    <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-white/80 dark:bg-surface-800/80 backdrop-blur-sm text-xs font-semibold">
                      Superhost
                    </div>
                  )}
                </div>
                
                {/* Property Details */}
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg line-clamp-1">{property.title}</h3>
                    <div className="flex items-center">
                      <Star size={16} className="text-primary fill-primary mr-1" />
                      <span>{property.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-surface-600 dark:text-surface-400 text-sm mb-2">
                    <MapPin size={14} className="mr-1" />
                    <span>{property.location}</span>
                  </div>
                  
                  <div className="text-sm text-surface-600 dark:text-surface-400 mb-3">
                    {property.type} • {property.beds} beds • {property.baths} baths
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {property.amenities.slice(0, 3).map((amenity, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-surface-100 dark:bg-surface-700 rounded-full text-xs"
                      >
                        {amenity}
                      </span>
                    ))}
                    {property.amenities.length > 3 && (
                      <span className="px-2 py-1 bg-surface-100 dark:bg-surface-700 rounded-full text-xs">
                        +{property.amenities.length - 3} more
                      </span>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-semibold text-lg">${property.price}</span>
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
          
          <div className="mt-12 text-center">
            <button className="btn btn-outline">
              Load more properties
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home