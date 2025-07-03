import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { paymentService } from '@/services/api/paymentService'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const Payment = () => {
  const [paymentMethods, setPaymentMethods] = useState([])
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('methods')

  useEffect(() => {
    loadPaymentData()
  }, [])

  const loadPaymentData = async () => {
    try {
      setLoading(true)
      setError('')
      
      await new Promise(resolve => setTimeout(resolve, 1000))
      const [methods, history] = await Promise.all([
        paymentService.getPaymentMethods(),
        paymentService.getTransactionHistory()
      ])
      
      setPaymentMethods(methods)
      setTransactions(history)
    } catch (err) {
      setError('Failed to load payment data')
    } finally {
      setLoading(false)
    }
  }

  const getCardIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'visa':
        return 'CreditCard'
      case 'mastercard':
        return 'CreditCard'
      case 'amex':
        return 'CreditCard'
      default:
        return 'CreditCard'
    }
  }

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'ride':
        return 'Car'
      case 'refund':
        return 'RefreshCw'
      case 'tip':
        return 'DollarSign'
      default:
        return 'DollarSign'
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
        <Error message={error} onRetry={loadPaymentData} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary mb-2">
          Payment
        </h1>
        <p className="text-text-secondary">
          Manage your payment methods and view transaction history
        </p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 mb-6">
        {[
          { key: 'methods', label: 'Payment Methods' },
          { key: 'history', label: 'Transaction History' }
        ].map(tab => (
          <motion.button
            key={tab.key}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-150 ${
              activeTab === tab.key
                ? 'bg-secondary text-black'
                : 'bg-surface text-text-secondary hover:text-text-primary'
            }`}
          >
            {tab.label}
          </motion.button>
        ))}
      </div>

      {/* Payment Methods */}
      {activeTab === 'methods' && (
        <div className="space-y-4">
          {paymentMethods.length === 0 ? (
            <Empty
              title="No payment methods"
              description="Add a payment method to start booking rides"
              icon="CreditCard"
              action={{
                text: "Add Payment Method",
                icon: "Plus",
                onClick: () => console.log('Add payment method')
              }}
            />
          ) : (
            <>
              {paymentMethods.map((method) => (
                <motion.div
                  key={method.Id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -2 }}
                >
                  <Card className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-lg flex items-center justify-center">
                          <ApperIcon name={getCardIcon(method.type)} className="w-6 h-6 text-secondary" />
                        </div>
                        <div>
                          <div className="font-semibold text-text-primary">
                            {method.type} •••• {method.lastFour}
                          </div>
                          <div className="text-sm text-text-secondary">
                            Expires {method.expiryMonth}/{method.expiryYear}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {method.isDefault && (
                          <span className="px-2 py-1 bg-success/20 text-success text-xs rounded-full">
                            Default
                          </span>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          icon="MoreVertical"
                        />
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
              
              <Button
                variant="secondary"
                icon="Plus"
                className="w-full"
              >
                Add New Payment Method
              </Button>
            </>
          )}
        </div>
      )}

      {/* Transaction History */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          {transactions.length === 0 ? (
            <Empty
              title="No transactions"
              description="Your transaction history will appear here"
              icon="Receipt"
            />
          ) : (
            transactions.map((transaction) => (
              <motion.div
                key={transaction.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -2 }}
              >
                <Card className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-surface rounded-lg flex items-center justify-center">
                        <ApperIcon 
                          name={getTransactionIcon(transaction.type)} 
                          className="w-5 h-5 text-accent" 
                        />
                      </div>
                      <div>
                        <div className="font-medium text-text-primary">
                          {transaction.description}
                        </div>
                        <div className="text-sm text-text-secondary">
                          {new Date(transaction.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className={`font-semibold ${
                        transaction.amount > 0 ? 'text-success' : 'text-text-primary'
                      }`}>
                        {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                      </div>
                      <div className="text-sm text-text-secondary capitalize">
                        {transaction.status}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default Payment