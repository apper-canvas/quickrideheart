import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Input from '@/components/atoms/Input'

const LocationSearch = ({ 
  placeholder = "Where to?",
  onLocationSelect,
  value = '',
  icon = "MapPin"
}) => {
  const [searchTerm, setSearchTerm] = useState(value)
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  const mockSuggestions = [
    { id: 1, name: "Times Square, New York", address: "Times Square, NY 10036", lat: 40.7580, lng: -73.9855 },
    { id: 2, name: "Central Park", address: "Central Park, New York, NY", lat: 40.7831, lng: -73.9712 },
    { id: 3, name: "Empire State Building", address: "350 5th Ave, New York, NY 10118", lat: 40.7484, lng: -73.9857 },
    { id: 4, name: "Brooklyn Bridge", address: "Brooklyn Bridge, New York, NY", lat: 40.7061, lng: -73.9969 },
    { id: 5, name: "Grand Central Terminal", address: "89 E 42nd St, New York, NY 10017", lat: 40.7527, lng: -73.9772 }
  ]

  useEffect(() => {
    if (searchTerm.length > 0) {
      const filtered = mockSuggestions.filter(location =>
        location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        location.address.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setSuggestions(filtered)
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }, [searchTerm])

  const handleLocationSelect = (location) => {
    setSearchTerm(location.name)
    setShowSuggestions(false)
    onLocationSelect?.(location)
  }

  return (
    <div className="relative">
      <Input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
        icon={icon}
        className="bg-surface/90 backdrop-blur-sm"
      />
      
      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 bg-surface border border-gray-700 rounded-lg shadow-lg z-50 mt-1 max-h-60 overflow-y-auto"
          >
            {suggestions.map((location) => (
              <motion.div
                key={location.id}
                whileHover={{ backgroundColor: '#2A2A2A' }}
                onClick={() => handleLocationSelect(location)}
                className="p-3 cursor-pointer flex items-center space-x-3 hover:bg-surface/50 transition-colors duration-150"
              >
                <div className="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center">
                  <ApperIcon name="MapPin" className="w-4 h-4 text-secondary" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-text-primary">{location.name}</div>
                  <div className="text-sm text-text-secondary">{location.address}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default LocationSearch