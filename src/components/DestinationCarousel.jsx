import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react'

// Reusing the same data from MainFeature component
const POPULAR_LOCATIONS = [
  { id: 1, name: "New York", country: "United States", image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" },
  { id: 2, name: "Paris", country: "France", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1746&q=80" },
  { id: 3, name: "Tokyo", country: "Japan", image: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1736&q=80" },
  { id: 4, name: "Bali", country: "Indonesia", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1738&q=80" },
  { id: 5, name: "Barcelona", country: "Spain", image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" },
  { id: 6, name: "Sydney", country: "Australia", image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" },
  { id: 7, name: "Santorini", country: "Greece", image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80" },
  { id: 8, name: "Rio de Janeiro", country: "Brazil", image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" },
  { id: 9, name: "Venice", country: "Italy", image: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" },
  { id: 10, name: "Cape Town", country: "South Africa", image: "https://images.unsplash.com/photo-1576485372337-1075d6e1bb64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80" }
];

function DestinationCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleItems, setVisibleItems] = useState(3)
  const [itemWidth, setItemWidth] = useState(100 / 3)
  const [slideGap, setSlideGap] = useState(24) // 6 * 4 = 24px for space-x-6
  const carouselRef = useRef(null)
  const containerRef = useRef(null)

  // Update visible items and item width based on window width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleItems(1)
        setItemWidth(100)
        setSlideGap(12) // 3 * 4 = 12px for space-x-3
      } else if (window.innerWidth < 1024) {
        setVisibleItems(2)
        setItemWidth(50)
        setSlideGap(16) // 4 * 4 = 16px for space-x-4
      } else {
        setVisibleItems(3)
        setItemWidth(33.333)
        setSlideGap(24) // 6 * 4 = 24px for space-x-6
      }
    }
    
    // Initial call
    handleResize()
    
    // Add resize listener
    window.addEventListener('resize', handleResize)
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Calculate slide position based on current index, item width and gap
  const getSlideX = () => {
    // Calculate the sliding distance including the gap
    const containerWidth = containerRef.current?.clientWidth || 0
    const slideWidthWithGap = (containerWidth / visibleItems)
    return -currentIndex * slideWidthWithGap
  }

  // Navigation functions
  const nextSlide = () => {
    setCurrentIndex(prevIndex => 
      prevIndex + visibleItems >= POPULAR_LOCATIONS.length 
        ? 0 
        : prevIndex + 1
    )
  }
  
  const prevSlide = () => {
    setCurrentIndex(prevIndex => 
      prevIndex <= 0 
        ? POPULAR_LOCATIONS.length - visibleItems 
        : prevIndex - 1
    )
  }

  // Auto-advance the carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)
    
    return () => clearInterval(interval)
  }, [currentIndex, visibleItems])

  return (
    <section className="py-8 sm:py-12 bg-white dark:bg-surface-900">
      <div className="container mx-auto px-4" ref={containerRef}>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
          <div className="mb-4 sm:mb-0">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Popular Destinations</h2>
            <p className="text-surface-600 dark:text-surface-400 text-sm sm:text-base">Explore the world's most stunning places</p>
          </div>
          
          <div className="flex space-x-2 self-end sm:self-auto">
            <button 
              onClick={prevSlide}
              className="p-2 rounded-full bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
              aria-label="Previous destination"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={nextSlide}
              className="p-2 rounded-full bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
              aria-label="Next destination"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
        
        <div className="relative overflow-hidden" ref={carouselRef}>
          <motion.div 
            className="flex space-x-3 sm:space-x-4 md:space-x-6"
            animate={{ x: getSlideX() }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {POPULAR_LOCATIONS.map((location, index) => (
              <motion.div
                key={location.id}
                className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 px-0 cursor-pointer group"
                style={{ width: `calc(${itemWidth}% - ${(slideGap * (visibleItems - 1)) / visibleItems}px)` }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ y: -5 }}
              >
                <div className="overflow-hidden rounded-xl sm:rounded-2xl shadow-card h-full">
                  <div className="relative aspect-[3/4] sm:aspect-[4/3]">
                    <img 
                      src={location.image} 
                      alt={`${location.name}, ${location.country}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                    
                    <div className="absolute bottom-0 left-0 p-4 sm:p-6 text-white">
                      <h3 className="text-xl sm:text-2xl font-bold mb-1">{location.name}</h3>
                      <div className="flex items-center">
                        <MapPin size={14} className="mr-1 text-primary" />
                        <span className="text-sm sm:text-base">{location.country}</span>
                      </div>
                    </div>
                    
                    <div className="absolute top-3 right-3 bg-white/90 dark:bg-surface-800/90 text-surface-900 dark:text-white py-1 px-2 rounded-full text-xs sm:text-sm font-medium backdrop-blur-sm">
                      Popular
                    </div>
                  </div>
                  
                  <div className="p-3 sm:p-4 bg-white dark:bg-surface-800">
                    <div className="flex items-center justify-between">
                      <div className="text-xs sm:text-sm text-surface-600 dark:text-surface-400">
                        Explore amazing places
                      </div>
                      <button className="text-primary text-xs sm:text-sm font-medium hover:underline">
                        View details
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        {/* Indicators */}
        <div className="flex justify-center mt-6 sm:mt-8 space-x-1 sm:space-x-2">
          {Array.from({ length: Math.ceil(POPULAR_LOCATIONS.length / visibleItems) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index * visibleItems)}
              className={`w-2 h-2 rounded-full transition-all ${
                Math.floor(currentIndex / visibleItems) === index
                  ? 'w-4 sm:w-6 bg-primary'
                  : 'bg-surface-300 dark:bg-surface-600'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default DestinationCarousel