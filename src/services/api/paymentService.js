import paymentMethodsData from '@/services/mockData/paymentMethods.json'
import transactionsData from '@/services/mockData/transactions.json'

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const paymentService = {
  async getPaymentMethods() {
    await delay(300)
    return [...paymentMethodsData]
  },

  async getTransactionHistory() {
    await delay(400)
    return [...transactionsData].sort((a, b) => new Date(b.date) - new Date(a.date))
  },

  async addPaymentMethod(methodData) {
    await delay(500)
    const newMethod = {
      ...methodData,
      Id: Math.max(...paymentMethodsData.map(m => m.Id)) + 1,
      isDefault: paymentMethodsData.length === 0
    }
    paymentMethodsData.push(newMethod)
    return { ...newMethod }
  },

  async removePaymentMethod(id) {
    await delay(300)
    const index = paymentMethodsData.findIndex(m => m.Id === parseInt(id))
    if (index === -1) throw new Error('Payment method not found')
    
    paymentMethodsData.splice(index, 1)
    return { success: true }
  },

  async setDefaultPaymentMethod(id) {
    await delay(200)
    const method = paymentMethodsData.find(m => m.Id === parseInt(id))
    if (!method) throw new Error('Payment method not found')
    
    // Remove default from all methods
    paymentMethodsData.forEach(m => m.isDefault = false)
    // Set new default
    method.isDefault = true
    
    return { ...method }
  }
}