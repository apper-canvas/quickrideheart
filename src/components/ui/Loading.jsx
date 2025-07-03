import { motion } from 'framer-motion'

const Loading = ({ type = 'default' }) => {
  if (type === 'map') {
    return (
      <div className="h-full w-full bg-surface rounded-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-surface to-accent opacity-20 animate-pulse" />
        <div className="absolute top-4 left-4 right-4">
          <div className="bg-gray-700 h-12 rounded-lg animate-pulse" />
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-gray-700 h-32 rounded-lg animate-pulse" />
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-6 h-6 bg-secondary rounded-full animate-bounce" />
        </div>
      </div>
    )
  }

  if (type === 'list') {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-surface rounded-xl p-4 animate-pulse"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-700 rounded-lg" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-700 rounded w-3/4" />
                <div className="h-3 bg-gray-700 rounded w-1/2" />
              </div>
              <div className="h-6 bg-gray-700 rounded w-16" />
            </div>
          </motion.div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center h-64">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-surface rounded-full animate-spin">
          <div className="absolute top-0 left-0 w-4 h-4 bg-secondary rounded-full animate-bounce" />
        </div>
        <div className="mt-4 text-center">
          <div className="h-4 bg-gray-700 rounded w-24 mx-auto animate-pulse" />
        </div>
      </div>
    </div>
  )
}

export default Loading