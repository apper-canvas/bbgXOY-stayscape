import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Moon, Sun, Menu, X, Search, User } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode')
    return savedMode ? JSON.parse(savedMode) : window.matchMedia('(prefers-color-scheme: dark)').matches
  })
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode])

  const toggleDarkMode = () => setDarkMode(!darkMode)
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen)

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-surface-800/80 backdrop-blur-md border-b border-surface-200 dark:border-surface-700">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <motion.div 
              className="text-primary font-bold text-2xl"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              StayScape
            </motion.div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative flex items-center bg-white dark:bg-surface-800 rounded-lg px-4 py-2 shadow-sm">
                <Search size={18} className="text-surface-400" />
                <input 
                  type="text" 
                  placeholder="Search destinations..." 
                  className="ml-2 bg-transparent border-none outline-none text-sm w-64"
                />
              </div>
            </div>
            
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <div className="flex items-center space-x-1 px-3 py-2 rounded-full border border-surface-200 dark:border-surface-700 hover:shadow-soft transition-all duration-300">
              <Menu size={18} className="text-surface-600 dark:text-surface-300" />
              <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                <User size={14} className="text-white" />
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-3">
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <button 
              onClick={toggleMobileMenu}
              className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              className="md:hidden bg-white dark:bg-surface-800 border-t border-surface-200 dark:border-surface-700"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="container mx-auto px-4 py-4 space-y-4">
                <div className="relative">
                  <div className="flex items-center bg-surface-100 dark:bg-surface-700 rounded-lg px-4 py-2">
                    <Search size={18} className="text-surface-400" />
                    <input 
                      type="text" 
                      placeholder="Search destinations..." 
                      className="ml-2 bg-transparent border-none outline-none text-sm w-full"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <a href="#" className="block px-4 py-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700">
                    Sign Up
                  </a>
                  <a href="#" className="block px-4 py-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700">
                    Log In
                  </a>
                  <a href="#" className="block px-4 py-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700">
                    Host your home
                  </a>
                  <a href="#" className="block px-4 py-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700">
                    Help
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-surface-800 border-t border-surface-200 dark:border-surface-700 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-surface-600 dark:text-surface-400">
                <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Safety Information</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Cancellation Options</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">COVID-19 Resources</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <ul className="space-y-2 text-sm text-surface-600 dark:text-surface-400">
                <li><a href="#" className="hover:text-primary transition-colors">Disaster Relief</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Support Refugees</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Combating Discrimination</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Hosting</h3>
              <ul className="space-y-2 text-sm text-surface-600 dark:text-surface-400">
                <li><a href="#" className="hover:text-primary transition-colors">Try Hosting</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Protection for Hosts</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Explore Hosting Resources</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Visit Community Forum</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">About</h3>
              <ul className="space-y-2 text-sm text-surface-600 dark:text-surface-400">
                <li><a href="#" className="hover:text-primary transition-colors">Newsroom</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Investors</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Gift Cards</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-surface-200 dark:border-surface-700 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-surface-600 dark:text-surface-400 mb-4 md:mb-0">
              © 2023 StayScape, Inc. All rights reserved.
            </div>
            
            <div className="flex space-x-6 text-sm text-surface-600 dark:text-surface-400">
              <a href="#" className="hover:text-primary transition-colors">Privacy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms</a>
              <a href="#" className="hover:text-primary transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App