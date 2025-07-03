import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import InteractiveMap from '@/components/organisms/InteractiveMap'
import RideBookingFlow from '@/components/organisms/RideBookingFlow'
import ApperIcon from '@/components/ApperIcon'

const Home = () => {
  const [pickupLocation, setPickupLocation] = useState(null)
  const [destination, setDestination] = useState(null)
  const [currentLocation, setCurrentLocation] = useState({
    lat: 40.7580,
    lng: -73.9855,
    name: 'Times Square, New York'
  })
  const navigate = useNavigate()

  const handleLocationSelect = (location) => {
    if (!pickupLocation) {
      setPickupLocation(location)
    } else if (!destination) {
      setDestination(location)
    }
  }

  const handleBookingComplete = (rideData) => {
    // Navigate to active ride page
    navigate(`/ride/${rideData.id}`, { state: { ride: rideData } })
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="bg-surface/90 backdrop-blur-sm border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center">
              <ApperIcon name="Car" className="w-6 h-6 text-black" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-text-primary">QuickRide</h1>
              <div className="text-sm text-text-secondary">
                {currentLocation.name}
              </div>
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 bg-surface rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
          >
            <ApperIcon name="User" className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* Map */}
      <div className="flex-1 p-4">
        <InteractiveMap
          onLocationSelect={handleLocationSelect}
          pickupLocation={pickupLocation}
          destination={destination}
          showRoute={pickupLocation && destination}
        />
      </div>

      {/* Booking Panel */}
      <div className="bg-surface/95 backdrop-blur-sm border-t border-gray-700 p-4">
        <RideBookingFlow
          onBookingComplete={handleBookingComplete}
          pickupLocation={pickupLocation}
          onPickupLocationChange={setPickupLocation}
          destination={destination}
          onDestinationChange={setDestination}
        />
      </div>
    </div>
  )
}

export default Home