import { useState, useEffect } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import ActiveRideTracker from '@/components/organisms/ActiveRideTracker'
import ApperIcon from '@/components/ApperIcon'

const ActiveRide = () => {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [ride, setRide] = useState(location.state?.ride || null)

  useEffect(() => {
    if (!ride) {
      // If no ride data, redirect to home
      navigate('/')
    }
  }, [ride, navigate])

  const handleRideComplete = () => {
    navigate('/')
  }

  const handleGoBack = () => {
    navigate('/')
  }

  if (!ride) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <ApperIcon name="Car" className="w-16 h-16 text-secondary mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-text-primary mb-2">
            No Active Ride
          </h2>
          <p className="text-text-secondary">
            You don't have an active ride at the moment.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="bg-surface/90 backdrop-blur-sm border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGoBack}
            className="w-10 h-10 bg-surface rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
          >
            <ApperIcon name="ArrowLeft" className="w-5 h-5" />
          </motion.button>
          
          <div className="text-center">
            <h1 className="text-lg font-semibold text-text-primary">
              Your Trip
            </h1>
            <div className="text-sm text-text-secondary">
              Ride #{id}
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 bg-surface rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
          >
            <ApperIcon name="MoreVertical" className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* Active Ride Tracker */}
      <div className="flex-1">
        <ActiveRideTracker
          ride={ride}
          onRideComplete={handleRideComplete}
        />
      </div>
    </div>
  )
}

export default ActiveRide