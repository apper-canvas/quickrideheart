import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import RideBookingFlow from "@/components/organisms/RideBookingFlow";
import InteractiveMap from "@/components/organisms/InteractiveMap";
import CabSearchForm from "@/components/organisms/CabSearchForm";

const Home = () => {
  const [pickupLocation, setPickupLocation] = useState(null)
  const [destination, setDestination] = useState(null)
  const [currentLocation, setCurrentLocation] = useState({
    lat: 40.7580,
    lng: -73.9855,
    name: 'Times Square, New York'
  })
  const [showBookingFlow, setShowBookingFlow] = useState(false)
  const [searchData, setSearchData] = useState(null)
  const navigate = useNavigate()

  const handleLocationSelect = (location) => {
    if (!pickupLocation) {
      setPickupLocation(location)
    } else if (!destination) {
      setDestination(location)
    }
}

  const handleSearchComplete = (data) => {
    setSearchData(data)
    setPickupLocation(data.fromLocation)
    setDestination(data.destination)
    setShowBookingFlow(true)
  }

  const handleBackToSearch = () => {
    setShowBookingFlow(false)
    setSearchData(null)
    setPickupLocation(null)
    setDestination(null)
  }

  const handleBookingComplete = (rideData) => {
    // Navigate to active ride page
    navigate(`/ride/${rideData.id}`, { state: { ride: rideData } })
  }

return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-surface/90 backdrop-blur-sm border-b border-gray-700 p-4 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
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
          
          <div className="flex items-center space-x-3">
            {showBookingFlow && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBackToSearch}
                className="px-4 py-2 bg-surface rounded-lg flex items-center space-x-2 hover:bg-gray-600 transition-colors"
              >
                <ApperIcon name="ArrowLeft" className="w-4 h-4" />
                <span className="text-sm">Back to Search</span>
              </motion.button>
            )}
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 bg-surface rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
            >
              <ApperIcon name="User" className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <AnimatePresence mode="wait">
          {!showBookingFlow ? (
            <motion.div
              key="search"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-8"
            >
              <CabSearchForm onSearchComplete={handleSearchComplete} />
            </motion.div>
          ) : (
            <motion.div
              key="booking"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Search Summary */}
              <div className="bg-surface/50 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="text-sm text-text-secondary">Search Details</div>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="text-text-primary">
                        {searchData?.fromLocation?.name} → {searchData?.destination?.name}
                      </span>
                      <span className="text-text-secondary">•</span>
                      <span className="text-text-secondary">{searchData?.date}</span>
                      <span className="text-text-secondary">•</span>
                      <span className="text-text-secondary">{searchData?.memberCount} passenger{searchData?.memberCount !== 1 ? 's' : ''}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking Flow */}
              <div className="bg-surface/95 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                <RideBookingFlow
                  onBookingComplete={handleBookingComplete}
                  pickupLocation={pickupLocation}
                  onPickupLocationChange={setPickupLocation}
                  destination={destination}
                  onDestinationChange={setDestination}
                  cabType={searchData?.cabType}
                  memberCount={searchData?.memberCount}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Home