import React from 'react'

const Features = () => {
  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Lightning Fast',
      description: 'WireGuard protocol ensures blazing fast connection speeds with minimal overhead.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Secure & Private',
      description: 'State-of-the-art encryption keeps your data safe. No logs, no tracking, complete privacy.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Cross-Platform',
      description: 'Works on Windows, macOS, Linux, iOS, and Android with official WireGuard apps.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      title: 'Open Source',
      description: 'Fully transparent and open source. Audit the code, contribute, or self-host.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Completely Free',
      description: 'No subscriptions, no hidden fees. Free VPN service for everyone, forever.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Instant Setup',
      description: 'Get your configuration in seconds. Import it into WireGuard and connect immediately.',
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Why Choose SachinVPN?
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Built with modern technology stack for the best VPN experience
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-lg mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
        <h3 className="text-2xl font-bold mb-4">How to Use Your Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div>
            <div className="text-4xl font-bold mb-2">1</div>
            <h4 className="font-semibold mb-2">Download WireGuard</h4>
            <p className="text-blue-100">Install the official app from wireguard.com</p>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">2</div>
            <h4 className="font-semibold mb-2">Import Configuration</h4>
            <p className="text-blue-100">Add the downloaded .conf file to WireGuard</p>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">3</div>
            <h4 className="font-semibold mb-2">Connect & Enjoy</h4>
            <p className="text-blue-100">Toggle the connection and browse securely</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Features