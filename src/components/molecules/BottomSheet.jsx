import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef } from 'react'
import ApperIcon from '@/components/ApperIcon'

const BottomSheet = ({ 
  isOpen, 
  onClose, 
  title,
  children,
  height = 'auto',
  backdrop = true
}) => {
  const sheetRef = useRef(null)

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose?.()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {backdrop && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />
          )}
          
          <motion.div
            ref={sheetRef}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 bg-surface border-t border-gray-700 rounded-t-xl z-50"
            style={{ height }}
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-1 bg-gray-600 rounded-full mx-auto" />
                {onClose && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="absolute right-4 top-4 w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
                  >
                    <ApperIcon name="X" className="w-4 h-4" />
                  </motion.button>
                )}
              </div>
              
              {title && (
                <h3 className="text-lg font-semibold text-text-primary mb-4">
                  {title}
                </h3>
              )}
              
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default BottomSheet