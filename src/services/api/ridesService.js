import ridesData from '@/services/mockData/rides.json'

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const ridesService = {
  async getAll() {
    await delay(300)
    return [...ridesData]
  },

  async getById(id) {
    await delay(200)
    const ride = ridesData.find(r => r.Id === parseInt(id))
    if (!ride) throw new Error('Ride not found')
    return { ...ride }
  },

  async create(rideData) {
    await delay(400)
    const newRide = {
      ...rideData,
      Id: Math.max(...ridesData.map(r => r.Id)) + 1,
      createdAt: new Date().toISOString()
    }
    ridesData.push(newRide)
    return { ...newRide }
  },

  async update(id, updateData) {
    await delay(300)
    const index = ridesData.findIndex(r => r.Id === parseInt(id))
    if (index === -1) throw new Error('Ride not found')
    
    ridesData[index] = { ...ridesData[index], ...updateData }
    return { ...ridesData[index] }
  },

  async delete(id) {
    await delay(200)
    const index = ridesData.findIndex(r => r.Id === parseInt(id))
    if (index === -1) throw new Error('Ride not found')
    
ridesData.splice(index, 1)
    return { success: true }
  },

  async searchRides(searchParams) {
    await delay(500)
    
    const { fromLocation, destination, date, cabType, memberCount } = searchParams
    
    // Mock available vehicles based on search criteria
    const availableVehicles = [
      { id: 1, name: "QuickRide", type: "economy", capacity: 4, estimatedTime: "3 min", estimatedFare: "$8.50" },
      { id: 2, name: "Comfort", type: "comfort", capacity: 4, estimatedTime: "5 min", estimatedFare: "$12.50" },
      { id: 3, name: "Premium", type: "premium", capacity: 4, estimatedTime: "7 min", estimatedFare: "$18.00" },
      { id: 4, name: "QuickXL", type: "suv", capacity: 6, estimatedTime: "6 min", estimatedFare: "$15.00" }
    ]
    
    // Filter based on search criteria
    const filteredVehicles = availableVehicles.filter(vehicle => {
      if (cabType && vehicle.type !== cabType) return false
      if (memberCount > vehicle.capacity) return false
      return true
    })
    
    return {
      vehicles: filteredVehicles,
      searchParams,
      totalResults: filteredVehicles.length
    }
  }
}