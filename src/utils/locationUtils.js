export const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 3959 // Radius of the Earth in miles
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return R * c
}

export const estimateFare = (distance, vehicleType = 'economy') => {
  const baseFares = {
    economy: 2.50,
    comfort: 3.50,
    premium: 5.00,
    suv: 4.00
  }
  
  const perMileRates = {
    economy: 1.25,
    comfort: 1.75,
    premium: 2.50,
    suv: 2.00
  }
  
  const baseFare = baseFares[vehicleType] || baseFares.economy
  const perMileRate = perMileRates[vehicleType] || perMileRates.economy
  
  return baseFare + (distance * perMileRate)
}

export const estimateTime = (distance) => {
  // Average speed in city: 20 mph
  const averageSpeed = 20
  const timeInHours = distance / averageSpeed
  const timeInMinutes = Math.round(timeInHours * 60)
  
  return timeInMinutes
}