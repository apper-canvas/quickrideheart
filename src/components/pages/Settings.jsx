import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import ApperIcon from '@/components/ApperIcon'

const Settings = () => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567'
  })
  
  const [preferences, setPreferences] = useState({
    notifications: true,
    locationSharing: true,
    rideReminders: true,
    promotions: false
  })

  const handleProfileUpdate = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }))
  }

  const handlePreferenceToggle = (key) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleSaveProfile = () => {
    toast.success('Profile updated successfully!')
  }

  const settingsSections = [
    {
      title: 'Account',
      items: [
        { icon: 'User', label: 'Profile', action: () => {} },
        { icon: 'CreditCard', label: 'Payment Methods', action: () => {} },
        { icon: 'MapPin', label: 'Saved Places', action: () => {} },
        { icon: 'Users', label: 'Emergency Contacts', action: () => {} }
      ]
    },
    {
      title: 'App Settings',
      items: [
        { icon: 'Bell', label: 'Notifications', toggle: true, key: 'notifications' },
        { icon: 'Navigation', label: 'Location Sharing', toggle: true, key: 'locationSharing' },
        { icon: 'Clock', label: 'Ride Reminders', toggle: true, key: 'rideReminders' },
        { icon: 'Tag', label: 'Promotions', toggle: true, key: 'promotions' }
      ]
    },
    {
      title: 'Support',
      items: [
        { icon: 'HelpCircle', label: 'Help Center', action: () => {} },
        { icon: 'MessageCircle', label: 'Contact Support', action: () => {} },
        { icon: 'FileText', label: 'Terms of Service', action: () => {} },
        { icon: 'Shield', label: 'Privacy Policy', action: () => {} }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary mb-2">
          Settings
        </h1>
        <p className="text-text-secondary">
          Manage your account and app preferences
        </p>
      </div>

      {/* Profile Section */}
      <Card className="p-4 mb-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center">
            <ApperIcon name="User" className="w-8 h-8 text-black" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">
              {profile.name}
            </h3>
            <p className="text-text-secondary">{profile.email}</p>
          </div>
        </div>

        <div className="space-y-4">
          <Input
            label="Full Name"
            value={profile.name}
            onChange={(e) => handleProfileUpdate('name', e.target.value)}
            icon="User"
          />
          
          <Input
            label="Email"
            type="email"
            value={profile.email}
            onChange={(e) => handleProfileUpdate('email', e.target.value)}
            icon="Mail"
          />
          
          <Input
            label="Phone"
            type="tel"
            value={profile.phone}
            onChange={(e) => handleProfileUpdate('phone', e.target.value)}
            icon="Phone"
          />
          
          <Button
            onClick={handleSaveProfile}
            className="w-full"
          >
            Save Profile
          </Button>
        </div>
      </Card>

      {/* Settings Sections */}
      <div className="space-y-6">
        {settingsSections.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <h3 className="text-lg font-semibold text-text-primary mb-3">
              {section.title}
            </h3>
            
            <Card className="p-0">
              {section.items.map((item, itemIndex) => (
                <motion.div
                  key={item.label}
                  whileHover={{ backgroundColor: '#2A2A2A' }}
                  className={`p-4 flex items-center justify-between cursor-pointer transition-colors ${
                    itemIndex < section.items.length - 1 ? 'border-b border-gray-800' : ''
                  }`}
                  onClick={item.toggle ? () => handlePreferenceToggle(item.key) : item.action}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-surface rounded-lg flex items-center justify-center">
                      <ApperIcon name={item.icon} className="w-5 h-5 text-accent" />
                    </div>
                    <span className="font-medium text-text-primary">
                      {item.label}
                    </span>
                  </div>
                  
                  {item.toggle ? (
                    <div className={`w-12 h-6 rounded-full transition-colors ${
                      preferences[item.key] ? 'bg-secondary' : 'bg-gray-600'
                    }`}>
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-200 transform ${
                        preferences[item.key] ? 'translate-x-6' : 'translate-x-0.5'
                      } translate-y-0.5`} />
                    </div>
                  ) : (
                    <ApperIcon name="ChevronRight" className="w-5 h-5 text-text-muted" />
                  )}
                </motion.div>
              ))}
            </Card>
          </motion.div>
        ))}
      </div>

      {/* App Version */}
      <div className="mt-8 text-center text-text-muted">
        <p className="text-sm">QuickRide v1.0.0</p>
      </div>
    </div>
  )
}

export default Settings