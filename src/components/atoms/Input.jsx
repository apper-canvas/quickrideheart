import { forwardRef } from 'react'
import ApperIcon from '@/components/ApperIcon'

const Input = forwardRef(({ 
  label,
  error,
  icon,
  className = '',
  ...props 
}, ref) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-text-primary">
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <ApperIcon name={icon} className="w-5 h-5 text-text-muted" />
          </div>
        )}
        
        <input
          ref={ref}
          className={`input-field w-full ${icon ? 'pl-12' : ''} ${error ? 'border-error' : ''} ${className}`}
          {...props}
        />
      </div>
      
      {error && (
        <p className="text-sm text-error">
          {error}
        </p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input