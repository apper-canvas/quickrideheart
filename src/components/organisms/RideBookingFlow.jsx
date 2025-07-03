import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import BottomSheet from "@/components/molecules/BottomSheet";
import LocationSearch from "@/components/molecules/LocationSearch";
import VehicleCard from "@/components/molecules/VehicleCard";

const RideBookingFlow = ({ 
  onBookingComplete,
  pickupLocation,
  onPickupLocationChange,
  destination,
  onDestinationChange
}) => {
  const [step, setStep] = useState(1)
  const [selectedVehicle, setSelectedVehicle] = useState(null)
  const [showBookingSheet, setShowBookingSheet] = useState(false)

  const vehicles = [
    {
      id: 1,
      name: "QuickRide",
      type: "economy",
      capacity: 4,
      estimatedTime: "3 min",
      estimatedFare: "$8.50",
      description: "Affordable rides for everyday travel"
    },
    {
      id: 2,
      name: "Comfort",
      type: "comfort",
      capacity: 4,
      estimatedTime: "5 min",
      estimatedFare: "$12.50",
      description: "Extra legroom and newer vehicles"
    },
    {
      id: 3,
      name: "Premium",
      type: "premium",
      capacity: 4,
      estimatedTime: "7 min",
      estimatedFare: "$18.00",
      description: "Luxury vehicles with premium service"
    },
    {
      id: 4,
      name: "QuickXL",
      type: "suv",
      capacity: 6,
      estimatedTime: "6 min",
      estimatedFare: "$15.00",
      description: "Extra space for groups and luggage"
    }
  ]

  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle)
    setShowBookingSheet(true)
  }

  const handleBookRide = () => {
    if (!pickupLocation || !destination || !selectedVehicle) {
      toast.error("Please select pickup location, destination, and vehicle type")
      return
    }

    const rideData = {
      id: Date.now().toString(),
      pickupLocation,
      destination,
      vehicleType: selectedVehicle.type,
      fare: parseFloat(selectedVehicle.estimatedFare.replace('$', '')),
      estimatedTime: selectedVehicle.estimatedTime,
      status: 'searching',
      createdAt: new Date().toISOString()
    }

    onBookingComplete?.(rideData)
    setShowBookingSheet(false)
    toast.success("Ride booked successfully! Finding your driver...")
  }

  const canShowVehicles = pickupLocation && destination

  return (
    <div className="space-y-4">
      {/* Location Selection */}
      <div className="space-y-3">
        <LocationSearch
          placeholder="Pickup location"
          value={pickupLocation?.name || ''}
          onLocationSelect={onPickupLocationChange}
          icon="MapPin"
        />
        
        <LocationSearch
          placeholder="Where to?"
          value={destination?.name || ''}
          onLocationSelect={onDestinationChange}
          icon="Navigation"
        />
      </div>

      {/* Vehicle Selection */}
      <AnimatePresence>
        {canShowVehicles && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3"
          >
<div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-text-primary">
                Choose your ride
              </h3>
              <div className="text-sm text-text-secondary">
                {vehicles.length} option{vehicles.length !== 1 ? 's' : ''}
              </div>
            </div>
            
            <div className="space-y-2">
              {vehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  selected={selectedVehicle?.id === vehicle.id}
                  onSelect={handleVehicleSelect}
                  estimatedTime={vehicle.estimatedTime}
                  estimatedFare={vehicle.estimatedFare}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Booking Confirmation Sheet */}
      <BottomSheet
        isOpen={showBookingSheet}
        onClose={() => setShowBookingSheet(false)}
        title="Confirm your ride"
        height="60vh"
      >
        <div className="space-y-6">
          {/* Trip Summary */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                <ApperIcon name="MapPin" className="w-4 h-4 text-black" />
              </div>
              <div>
                <div className="text-sm text-text-secondary">Pickup</div>
                <div className="font-medium text-text-primary">
                  {pickupLocation?.name || 'Current location'}
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                <ApperIcon name="Navigation" className="w-4 h-4 text-black" />
              </div>
              <div>
                <div className="text-sm text-text-secondary">Destination</div>
                <div className="font-medium text-text-primary">
                  {destination?.name}
                </div>
              </div>
            </div>
          </div>

          {/* Vehicle Details */}
          {selectedVehicle && (
            <div className="bg-primary/50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                    <ApperIcon name="Car" className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <div className="font-semibold text-text-primary">
                      {selectedVehicle.name}
                    </div>
                    <div className="text-sm text-text-secondary">
                      {selectedVehicle.description}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-text-primary">
                    {selectedVehicle.estimatedFare}
                  </div>
                  <div className="text-sm text-text-secondary">
                    {selectedVehicle.estimatedTime}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Book Button */}
          <Button
            onClick={handleBookRide}
            className="w-full"
            size="lg"
          >
            Book {selectedVehicle?.name} for {selectedVehicle?.estimatedFare}
          </Button>
        </div>
      </BottomSheet>
    </div>
  )
}

export default RideBookingFlow