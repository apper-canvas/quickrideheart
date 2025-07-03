import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const VehicleCard = ({ 
  vehicle,
  selected = false,
  onSelect,
  estimatedTime = "5 min",
  estimatedFare = "$12.50"
}) => {
  const vehicleIcons = {
    'economy': 'Car',
    'comfort': 'Car',
    'premium': 'Car',
    'suv': 'Truck'
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect?.(vehicle)}
      className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-150 ${
        selected 
          ? 'border-secondary bg-secondary/10 shadow-glow' 
          : 'border-gray-700 bg-surface hover:border-secondary/50'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            selected ? 'bg-secondary text-black' : 'bg-gray-700 text-text-primary'
          }`}>
            <ApperIcon name={vehicleIcons[vehicle.type] || 'Car'} className="w-5 h-5" />
          </div>
          
          <div>
            <div className="font-semibold text-text-primary">{vehicle.name}</div>
            <div className="text-sm text-text-secondary">{estimatedTime}</div>
          </div>
        </div>
        
        <div className="text-right">
          <div className="font-semibold text-text-primary">{estimatedFare}</div>
          <div className="text-sm text-text-secondary">{vehicle.capacity} seats</div>
        </div>
      </div>
    </motion.div>
  )
}

export default VehicleCard