'use client'

import React, { useState } from 'react'
import { vpnApi } from '@/lib/api'
import toast from 'react-hot-toast'

const VpnForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  })
  const [loading, setLoading] = useState(false)
  const [configGenerated, setConfigGenerated] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email) {
      toast.error('Please fill in all fields')
      return
    }

    setLoading(true)

    try {
      const response = await vpnApi.generateConfig(formData)
      
      // Create and download the config file
      const blob = new Blob([response.configContent], { type: 'text/plain' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'sachinvpn.conf'
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      
      setConfigGenerated(true)
      toast.success('Configuration generated! Check your email and downloads.')
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({ name: '', email: '' })
        setConfigGenerated(false)
      }, 3000)
      
    } catch (error) {
      console.error('Error generating config:', error)
      
      if (error.response?.data?.message) {
        toast.error(error.response.data.message)
      } else if (error.response?.status === 400) {
        toast.error('Email already registered or invalid data')
      } else if (error.code === 'ECONNABORTED') {
        toast.error('Request timeout. Please try again.')
      } else if (error.code === 'ERR_NETWORK') {
        toast.error('Cannot connect to server. Please check if backend is running.')
      } else {
        toast.error('Failed to generate configuration. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Get Your VPN Config
          </h2>
          <p className="text-gray-600">
            Enter your details to receive your configuration
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="John Doe"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="john@example.com"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading || configGenerated}
            className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 ${
              loading || configGenerated
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </span>
            ) : configGenerated ? (
              'Configuration Sent!'
            ) : (
              'Generate Configuration'
            )}
          </button>
        </form>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-xs text-gray-600 text-center">
            🔒 Your configuration will be sent to your email and downloaded automatically.
            One email can only be used once.
          </p>
        </div>
      </div>
    </div>
  )
}

export default VpnForm
