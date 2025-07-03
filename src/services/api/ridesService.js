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
  }
}