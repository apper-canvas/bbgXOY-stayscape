import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, ArrowLeft } from 'lucide-react'

function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <motion.div 
        className="max-w-md w-full text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <div className="relative mx-auto w-40 h-40">
            <div className="absolute inset-0 bg-primary/10 dark:bg-primary/20 rounded-full animate-ping-slow"></div>
            <div className="relative flex items-center justify-center w-full h-full bg-surface-100 dark:bg-surface-800 rounded-full border-4 border-dashed border-primary/50">
              <span className="text-6xl">404</span>
            </div>
          </div>
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
        
        <p className="text-surface-600 dark:text-surface-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/"
            className="btn btn-primary"
          >
            <Home size={18} className="mr-2" />
            Go Home
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="btn btn-outline"
          >
            <ArrowLeft size={18} className="mr-2" />
            Go Back
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default NotFound