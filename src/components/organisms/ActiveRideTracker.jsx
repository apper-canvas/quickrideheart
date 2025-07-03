import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import InteractiveMap from '@/components/organisms/InteractiveMap'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const ActiveRideTracker = ({ ride, onRideComplete }) => {
  const [rideStatus, setRideStatus] = useState(ride?.status || 'searching')
  const [estimatedTime, setEstimatedTime] = useState(ride?.estimatedTime || '5 min')
  const [driverLocation, setDriverLocation] = useState(null)
  const [driver, setDriver] = useState(null)

  useEffect(() => {
    // Simulate ride progression
    const progressRide = () => {
      switch (rideStatus) {
        case 'searching':
          setTimeout(() => {
            setRideStatus('driver_assigned')
            setDriver({
              id: '1',
              name: 'John Smith',
              photo: '/api/placeholder/64/64',
              rating: 4.8,
              vehicle: {
                model: 'Toyota Camry',
                licensePlate: 'ABC-1234',
                color: 'Black'
              }
            })
            setDriverLocation({
              lat: ride?.pickupLocation.lat + 0.01,
              lng: ride?.pickupLocation.lng + 0.01
            })
            toast.success("Driver assigned! John is on the way")
          }, 3000)
          break
        case 'driver_assigned':
          setTimeout(() => {
            setRideStatus('driver_arriving')
            setEstimatedTime('2 min')
            toast.info("Driver is arriving soon")
          }, 5000)
          break
        case 'driver_arriving':
          setTimeout(() => {
            setRideStatus('driver_arrived')
            setEstimatedTime('0 min')
            toast.success("Driver has arrived!")
          }, 2000)
          break
        case 'driver_arrived':
          setTimeout(() => {
            setRideStatus('in_progress')
            setEstimatedTime('15 min')
            toast.info("Trip started")
          }, 10000)
          break
        case 'in_progress':
          setTimeout(() => {
            setRideStatus('completed')
            setEstimatedTime('0 min')
            onRideComplete?.()
            toast.success("Trip completed!")
          }, 15000)
          break
      }
    }

    progressRide()
  }, [rideStatus, ride, onRideComplete])

  const getStatusMessage = () => {
    switch (rideStatus) {
      case 'searching':
        return 'Looking for a driver near you...'
      case 'driver_assigned':
        return `${driver?.name} is on the way`
      case 'driver_arriving':
        return 'Driver is arriving soon'
      case 'driver_arrived':
        return 'Driver has arrived'
      case 'in_progress':
        return 'Enjoy your ride!'
      case 'completed':
        return 'Trip completed'
      default:
        return 'Processing...'
    }
  }

  const getStatusColor = () => {
    switch (rideStatus) {
      case 'searching':
        return 'text-warning'
      case 'driver_assigned':
      case 'driver_arriving':
        return 'text-info'
      case 'driver_arrived':
      case 'in_progress':
        return 'text-success'
      case 'completed':
        return 'text-secondary'
      default:
        return 'text-text-secondary'
    }
  }

  return (
    <div className="h-full flex flex-col">
      {/* Map */}
      <div className="flex-1 p-4">
        <InteractiveMap
          pickupLocation={ride?.pickupLocation}
          destination={ride?.destination}
          driverLocation={driverLocation}
          showRoute={true}
        />
      </div>

      {/* Status Panel */}
      <div className="bg-surface border-t border-gray-700 p-4 space-y-4">
        {/* Status */}
        <div className="text-center">
          <div className={`text-lg font-semibold ${getStatusColor()}`}>
            {getStatusMessage()}
          </div>
          {estimatedTime !== '0 min' && (
            <div className="text-sm text-text-secondary">
              ETA: {estimatedTime}
            </div>
          )}
        </div>

        {/* Driver Info */}
        {driver && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-primary/50 rounded-lg p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
                  <ApperIcon name="User" className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-semibold text-text-primary">
                    {driver.name}
                  </div>
                  <div className="text-sm text-text-secondary">
                    {driver.vehicle.model} • {driver.vehicle.licensePlate}
                  </div>
                  <div className="flex items-center space-x-1 text-sm">
                    <ApperIcon name="Star" className="w-4 h-4 text-secondary fill-current" />
                    <span className="text-text-secondary">{driver.rating}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button
                  variant="secondary"
                  size="sm"
                  icon="Phone"
                  onClick={() => toast.info("Calling driver...")}
                />
                <Button
                  variant="secondary"
                  size="sm"
                  icon="MessageCircle"
                  onClick={() => toast.info("Opening chat...")}
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Trip Details */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-primary/30 rounded-lg p-3">
            <div className="text-sm text-text-secondary">Fare</div>
            <div className="font-semibold text-text-primary">
              ${ride?.fare?.toFixed(2) || '0.00'}
            </div>
          </div>
          <div className="bg-primary/30 rounded-lg p-3">
            <div className="text-sm text-text-secondary">Distance</div>
            <div className="font-semibold text-text-primary">
              {Math.floor(Math.random() * 5 + 2)} miles
            </div>
          </div>
        </div>

        {/* Actions */}
        {rideStatus === 'searching' && (
          <Button
            variant="danger"
            className="w-full"
            onClick={() => {
              toast.info("Ride cancelled")
              onRideComplete?.()
            }}
          >
            Cancel Ride
          </Button>
        )}
      </div>
    </div>
  )
}

export default ActiveRideTracker