import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const InteractiveMap = ({ 
  onLocationSelect,
  pickupLocation,
  destination,
  driverLocation,
  showRoute = false
}) => {
  const [mapCenter, setMapCenter] = useState({ lat: 40.7580, lng: -73.9855 })
  const [markers, setMarkers] = useState([])

  useEffect(() => {
    const newMarkers = []
    
    if (pickupLocation) {
      newMarkers.push({
        id: 'pickup',
        type: 'pickup',
        position: { lat: pickupLocation.lat, lng: pickupLocation.lng },
        label: 'Pickup'
      })
    }
    
    if (destination) {
      newMarkers.push({
        id: 'destination',
        type: 'destination',
        position: { lat: destination.lat, lng: destination.lng },
        label: 'Destination'
      })
    }
    
    if (driverLocation) {
      newMarkers.push({
        id: 'driver',
        type: 'driver',
        position: { lat: driverLocation.lat, lng: driverLocation.lng },
        label: 'Driver'
      })
    }
    
    setMarkers(newMarkers)
  }, [pickupLocation, destination, driverLocation])

  const handleMapClick = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    
    // Convert click position to lat/lng (simplified)
    const lat = mapCenter.lat + (y - rect.height / 2) * 0.0001
    const lng = mapCenter.lng + (x - rect.width / 2) * 0.0001
    
    onLocationSelect?.({ lat, lng, address: `${lat.toFixed(4)}, ${lng.toFixed(4)}` })
  }

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-primary via-surface to-accent/20 rounded-lg overflow-hidden">
      {/* Map Background */}
      <div 
        className="absolute inset-0 cursor-crosshair"
        onClick={handleMapClick}
      >
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #FFD700 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}
        />
        
        {/* Street Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-0 right-0 h-px bg-secondary" />
          <div className="absolute top-1/2 left-0 right-0 h-px bg-secondary" />
          <div className="absolute top-3/4 left-0 right-0 h-px bg-secondary" />
          <div className="absolute top-0 bottom-0 left-1/4 w-px bg-secondary" />
          <div className="absolute top-0 bottom-0 left-1/2 w-px bg-secondary" />
          <div className="absolute top-0 bottom-0 left-3/4 w-px bg-secondary" />
        </div>
      </div>

      {/* Markers */}
      {markers.map((marker) => (
        <motion.div
          key={marker.id}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${
            marker.type === 'pickup' ? 'map-marker' :
            marker.type === 'destination' ? 'map-marker bg-accent' :
            'driver-marker'
          }`}
          style={{
            left: `${((marker.position.lng - mapCenter.lng) * 1000) + 50}%`,
            top: `${((mapCenter.lat - marker.position.lat) * 1000) + 50}%`
          }}
        >
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
            {marker.label}
          </div>
        </motion.div>
      ))}

      {/* Route Line */}
      {showRoute && pickupLocation && destination && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1 }}
            d={`M ${((pickupLocation.lng - mapCenter.lng) * 1000) + 50}% ${((mapCenter.lat - pickupLocation.lat) * 1000) + 50}% L ${((destination.lng - mapCenter.lng) * 1000) + 50}% ${((mapCenter.lat - destination.lat) * 1000) + 50}%`}
            stroke="#00D4FF"
            strokeWidth="3"
            fill="none"
            strokeDasharray="5,5"
            className="animate-pulse"
          />
        </svg>
      )}

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-10 h-10 bg-surface/80 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-surface transition-colors"
        >
          <ApperIcon name="Plus" className="w-5 h-5" />
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-10 h-10 bg-surface/80 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-surface transition-colors"
        >
          <ApperIcon name="Minus" className="w-5 h-5" />
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-10 h-10 bg-surface/80 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-surface transition-colors"
        >
          <ApperIcon name="Navigation" className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Current Location Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="absolute bottom-4 right-4 w-12 h-12 bg-secondary rounded-full flex items-center justify-center shadow-glow hover:shadow-neon transition-all duration-300"
      >
        <ApperIcon name="MapPin" className="w-6 h-6 text-black" />
      </motion.button>
    </div>
  )
}

export default InteractiveMap