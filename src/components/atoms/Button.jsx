import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Button = ({ 
  variant = 'primary', 
  size = 'md',
  icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  children,
  className = '',
  ...props 
}) => {
  const baseClasses = "font-semibold rounded-lg transition-all duration-150 flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-background"
  
  const variants = {
    primary: "bg-secondary text-black hover:bg-opacity-90 hover:scale-105 hover:shadow-glow",
    secondary: "border border-secondary text-secondary bg-transparent hover:bg-secondary hover:text-black hover:scale-105",
    ghost: "text-text-primary hover:bg-surface hover:scale-105",
    danger: "bg-error text-white hover:bg-opacity-90 hover:scale-105"
  }
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  }
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`
  
  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <ApperIcon name="Loader2" className="w-4 h-4 animate-spin" />
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <ApperIcon name={icon} className="w-4 h-4" />
          )}
          {children && <span>{children}</span>}
          {icon && iconPosition === 'right' && (
            <ApperIcon name={icon} className="w-4 h-4" />
          )}
        </>
      )}
    </motion.button>
  )
}

export default Button