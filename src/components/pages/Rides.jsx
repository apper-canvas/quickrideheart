import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { ridesService } from '@/services/api/ridesService'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const Rides = () => {
  const [rides, setRides] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('all') // all, completed, cancelled

  useEffect(() => {
    loadRides()
  }, [])

  const loadRides = async () => {
    try {
      setLoading(true)
      setError('')
      
      await new Promise(resolve => setTimeout(resolve, 1000))
      const data = await ridesService.getAll()
      setRides(data)
    } catch (err) {
      setError('Failed to load rides')
    } finally {
      setLoading(false)
    }
  }

  const filteredRides = rides.filter(ride => {
    if (filter === 'all') return true
    return ride.status === filter
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success'
      case 'cancelled':
        return 'text-error'
      case 'in_progress':
        return 'text-info'
      default:
        return 'text-text-secondary'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return 'CheckCircle'
      case 'cancelled':
        return 'XCircle'
      case 'in_progress':
        return 'Clock'
      default:
        return 'Circle'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="mb-6">
          <div className="h-8 bg-surface rounded w-48 animate-pulse mb-2" />
          <div className="h-4 bg-surface rounded w-32 animate-pulse" />
        </div>
        <Loading type="list" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background p-4">
        <Error message={error} onRetry={loadRides} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary mb-2">
          Your Rides
        </h1>
        <p className="text-text-secondary">
          View and manage your ride history
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2 mb-6">
        {[
          { key: 'all', label: 'All Rides' },
          { key: 'completed', label: 'Completed' },
          { key: 'cancelled', label: 'Cancelled' }
        ].map(tab => (
          <motion.button
            key={tab.key}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setFilter(tab.key)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-150 ${
              filter === tab.key
                ? 'bg-secondary text-black'
                : 'bg-surface text-text-secondary hover:text-text-primary'
            }`}
          >
            {tab.label}
          </motion.button>
        ))}
      </div>

      {/* Rides List */}
      {filteredRides.length === 0 ? (
        <Empty
          title="No rides found"
          description="You haven't taken any rides yet. Book your first ride to get started!"
          icon="Car"
          action={{
            text: "Book a Ride",
            icon: "Plus",
            onClick: () => window.location.href = '/'
          }}
        />
      ) : (
        <div className="space-y-4">
          {filteredRides.map((ride) => (
            <motion.div
              key={ride.Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -2 }}
            >
              <Card className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <ApperIcon 
                        name={getStatusIcon(ride.status)} 
                        className={`w-5 h-5 ${getStatusColor(ride.status)}`} 
                      />
                      <span className={`font-medium capitalize ${getStatusColor(ride.status)}`}>
                        {ride.status.replace('_', ' ')}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-secondary rounded-full" />
                        <span className="text-text-primary font-medium">
                          {ride.pickupLocation.name}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-accent rounded-full" />
                        <span className="text-text-primary font-medium">
                          {ride.destination.name}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 mt-3 text-sm text-text-secondary">
                      <div className="flex items-center space-x-1">
                        <ApperIcon name="Calendar" className="w-4 h-4" />
                        <span>{format(new Date(ride.createdAt), 'MMM d, yyyy')}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <ApperIcon name="Car" className="w-4 h-4" />
                        <span className="capitalize">{ride.vehicleType}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-xl font-bold text-text-primary">
                      ${ride.fare.toFixed(2)}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      icon="RotateCcw"
                      className="mt-2"
                    >
                      Rebook
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Rides