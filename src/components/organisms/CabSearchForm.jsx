import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import LocationSearch from '@/components/molecules/LocationSearch'
import Input from '@/components/atoms/Input'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'
import { formatDateInput, isValidDate } from '@/utils/dateUtils'

const CabSearchForm = ({ onSearchComplete }) => {
  const [fromLocation, setFromLocation] = useState(null)
  const [destination, setDestination] = useState(null)
  const [date, setDate] = useState(formatDateInput(new Date()))
  const [cabType, setCabType] = useState('')
  const [memberCount, setMemberCount] = useState(1)
  const [isSearching, setIsSearching] = useState(false)

  const cabTypes = [
    { value: '', label: 'Any Type' },
    { value: 'economy', label: 'Economy' },
    { value: 'comfort', label: 'Comfort' },
    { value: 'premium', label: 'Premium' },
    { value: 'suv', label: 'SUV/XL' }
  ]

  const memberOptions = Array.from({ length: 8 }, (_, i) => i + 1)

  const handleSearch = async () => {
    // Validation
    if (!fromLocation) {
      toast.error("Please select pickup location")
      return
    }

    if (!destination) {
      toast.error("Please select destination")
      return
    }

    if (!isValidDate(date)) {
      toast.error("Please select a valid future date")
      return
    }

    if (memberCount < 1 || memberCount > 8) {
      toast.error("Number of members must be between 1 and 8")
      return
    }

    setIsSearching(true)

    try {
      // Simulate search delay
      await new Promise(resolve => setTimeout(resolve, 1500))

      const searchData = {
        fromLocation,
        destination,
        date,
        cabType,
        memberCount,
        searchTime: new Date().toISOString()
      }

      onSearchComplete?.(searchData)
      toast.success("Search completed! Select your preferred ride.")
    } catch (error) {
      toast.error("Search failed. Please try again.")
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 bg-surface/95 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          Book Your Ride
        </h2>
        <p className="text-text-secondary">
          Find the perfect cab for your journey
        </p>
      </div>

      <div className="space-y-4">
        {/* From Location */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            From Location
          </label>
          <LocationSearch
            placeholder="Enter pickup location"
            onLocationSelect={setFromLocation}
            value={fromLocation?.name || ''}
            icon="MapPin"
          />
        </div>

        {/* Destination */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Destination
          </label>
          <LocationSearch
            placeholder="Enter destination"
            onLocationSelect={setDestination}
            value={destination?.name || ''}
            icon="Navigation"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Date */}
          <div>
            <Input
              label="Date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={formatDateInput(new Date())}
              icon="Calendar"
            />
          </div>

          {/* Cab Type */}
          <div>
            <Input
              label="Cab Type"
              type="select"
              value={cabType}
              onChange={(e) => setCabType(e.target.value)}
              icon="Car"
            >
              {cabTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </Input>
          </div>

          {/* Number of Members */}
          <div>
            <Input
              label="Members"
              type="select"
              value={memberCount}
              onChange={(e) => setMemberCount(parseInt(e.target.value))}
              icon="Users"
            >
              {memberOptions.map((count) => (
                <option key={count} value={count}>
                  {count} {count === 1 ? 'Person' : 'People'}
                </option>
              ))}
            </Input>
          </div>
        </div>

        {/* Search Button */}
        <Button
          onClick={handleSearch}
          disabled={isSearching}
          className="w-full"
          size="lg"
          icon={isSearching ? "Loader2" : "Search"}
        >
          {isSearching ? 'Searching...' : 'Search Cabs'}
        </Button>
      </div>

      {/* Quick Stats */}
      {fromLocation && destination && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-700"
        >
          <div className="text-center">
            <div className="text-lg font-semibold text-secondary">~12 km</div>
            <div className="text-sm text-text-secondary">Distance</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-accent">~18 min</div>
            <div className="text-sm text-text-secondary">Duration</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-success">$8-18</div>
            <div className="text-sm text-text-secondary">Est. Fare</div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default CabSearchForm