'use client'
import { useState, useEffect } from 'react'
import { Shield, Lock, Download, CheckCircle, AlertCircle } from 'lucide-react'

export default function VPNForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [particles, setParticles] = useState([])

  useEffect(() => {
    // Generate particles only on client side to avoid hydration mismatch
    setParticles(
      [...Array(20)].map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 3 + Math.random() * 4
      }))
    )

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setError('')
    setSuccess(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://35.180.61.251:8080';
      console.log(JSON.stringify(formData))
      const response = await fetch(`${apiUrl}/api/vpn/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to generate VPN configuration')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'client.conf'
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      setSuccess(true)
      setFormData({ name: '', email: '' })

    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center p-4">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-purple-950 to-black pointer-events-none"></div>
      
      {/* Animated mesh gradient */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)] pointer-events-none"></div>

      {/* Floating orbs */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl animate-float pointer-events-none"></div>
      <div className="absolute bottom-32 right-32 w-40 h-40 bg-purple-500/20 rounded-full blur-2xl animate-float-delayed pointer-events-none"></div>
      <div className="absolute top-1/2 left-10 w-24 h-24 bg-cyan-500/20 rounded-full blur-xl animate-float-slow pointer-events-none"></div>

      {/* Scanlines effect */}
      <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(59,130,246,0.03)_50%)] bg-[length:100%_4px] pointer-events-none"></div>

      {/* Mouse follower glow */}
      <div 
        className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none transition-all duration-300 z-0"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      ></div>

      {/* Particles - only render after client mount */}
      {particles.map((particle, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-blue-400 rounded-full animate-particle"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`
          }}
        ></div>
      ))}

      {/* Vertical light beams */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-500/30 to-transparent animate-beam pointer-events-none z-0"></div>
      <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-purple-500/30 to-transparent animate-beam pointer-events-none z-0" style={{animationDelay: '1.5s'}}></div>
      <div className="absolute top-0 left-2/3 w-px h-full bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent animate-beam pointer-events-none z-0" style={{animationDelay: '3s'}}></div>

      {/* Consolidated styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(20px) translateX(-10px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-30px) translateX(15px); }
        }
        @keyframes particle {
          0% { opacity: 0; transform: translateY(0) scale(0); }
          50% { opacity: 1; }
          100% { opacity: 0; transform: translateY(-100vh) scale(1); }
        }
        @keyframes beam {
          0% { opacity: 0.2; }
          50% { opacity: 0.5; }
          100% { opacity: 0.2; }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 7s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-particle {
          animation: particle linear infinite;
        }
        .animate-beam {
          animation: beam 3s ease-in-out infinite;
        }
      `}</style>
      
      <div className="relative w-full max-w-md z-50">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full animate-pulse pointer-events-none"></div>
        
        {/* Main card */}
        <div className="relative bg-slate-900/40 backdrop-blur-2xl border border-blue-500/30 rounded-2xl shadow-2xl overflow-hidden z-10">
          {/* Shimmer effect on border */}
          <div className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
               style={{
                 background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.3), transparent)',
                 backgroundSize: '200% 100%',
                 animation: 'shimmer 2s infinite'
               }}>
          </div>

          {/* Header */}
          <div className="relative bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border-b border-blue-500/30 p-6">
            <div className="flex items-center justify-center space-x-3 mb-2">
              <div className="relative">
                <Shield className="w-8 h-8 text-blue-400 animate-pulse" />
                <div className="absolute inset-0 bg-blue-400/50 blur-xl animate-pulse"></div>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                VPN Configuration
              </h1>
            </div>
            <p className="text-center text-slate-400 text-sm">Secure tunnel generation portal</p>
          </div>

          {/* Form */}
          <div className="p-6 space-y-5 relative z-20">
            <div className="space-y-2">
              <label htmlFor="name" className="flex items-center space-x-2 text-sm font-medium text-slate-300">
                <Lock className="w-4 h-4 text-blue-400" />
                <span>Identity</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-slate-800/50 border border-blue-500/30 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 focus:bg-slate-800/70 transition-all"
                placeholder="Enter your name"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="flex items-center space-x-2 text-sm font-medium text-slate-300">
                <Lock className="w-4 h-4 text-cyan-400" />
                <span>Contact</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 focus:bg-slate-800/70 transition-all"
                placeholder="Enter your email"
              />
            </div>

            {error && (
              <div className="flex items-start space-x-3 bg-red-950/50 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg animate-pulse">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            {success && (
              <div className="flex items-start space-x-3 bg-emerald-950/50 border border-emerald-500/50 text-emerald-400 px-4 py-3 rounded-lg">
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-semibold">Configuration generated successfully!</p>
                  <p className="text-emerald-500 mt-1">Import the file in WireGuard to connect.</p>
                </div>
              </div>
            )}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="relative w-full group overflow-hidden rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg transition-transform group-hover:scale-105"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>
              <div className="relative flex items-center justify-center space-x-2 py-3 px-6 text-white font-semibold">
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    <span>Generate Configuration</span>
                  </>
                )}
              </div>
            </button>

          </div>

          {/* Footer accent */}
          <div className="h-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 animate-pulse"></div>
        </div>

        {/* Corner accents */}
        <div className="absolute -top-2 -left-2 w-20 h-20 border-t-2 border-l-2 border-blue-400/50 rounded-tl-2xl pointer-events-none"></div>
        <div className="absolute -bottom-2 -right-2 w-20 h-20 border-b-2 border-r-2 border-cyan-400/50 rounded-br-2xl pointer-events-none"></div>
      </div>
    </div>
  )
}