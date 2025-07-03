import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Navigation = () => {
  const navItems = [
    { to: '/', icon: 'Home', label: 'Home' },
    { to: '/rides', icon: 'Car', label: 'Rides' },
    { to: '/payment', icon: 'CreditCard', label: 'Payment' },
    { to: '/settings', icon: 'Settings', label: 'Settings' }
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-surface/90 backdrop-blur-sm border-t border-gray-700 z-30">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-150 ${
                isActive 
                  ? 'text-secondary' 
                  : 'text-text-muted hover:text-text-primary'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-6 h-6 ${isActive ? 'animate-glow' : ''}`}
                >
                  <ApperIcon name={item.icon} className="w-6 h-6" />
                </motion.div>
                <span className="text-xs font-medium">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

export default Navigation