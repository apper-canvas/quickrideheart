import { motion } from 'framer-motion'

const Card = ({ 
  children, 
  className = '',
  hover = true,
  gradient = false,
  ...props 
}) => {
  const baseClasses = "bg-surface rounded-xl border border-gray-800 transition-all duration-150"
  const hoverClasses = hover ? "hover:border-secondary hover:scale-[1.02]" : ""
  const gradientClasses = gradient ? "bg-gradient-to-br from-surface to-primary" : ""
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${baseClasses} ${hoverClasses} ${gradientClasses} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default Card