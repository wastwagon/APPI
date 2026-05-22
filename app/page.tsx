import Image from 'next/image'
import Link from 'next/link'

export default function UnderConstructionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-appi-blue via-appi-teal to-appi-blue-light flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* APPI Logo */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center mb-6">
                  <Image
              src="/images/appi-logo.png" 
              alt="African Political Parties Initiative Logo" 
              width={200} 
                    height={80}
              className="h-20 w-auto"
              priority
                  />
                </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            African Political Parties Initiative
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8">
            Reshaping Africa's Political Parties for Democratic and Economic Transformation
          </p>
            </div>

        {/* Main Message */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 mb-8 border border-white/20">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            🔧 We'll Be Right Back 🔧
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
            We're upgrading our platform to provide African political parties with enhanced digital tools, 
            learning resources, and networking opportunities. Our new website is coming soon!
          </p>
          
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-white/80 mb-2">
              <span>Development Progress</span>
              <span>85%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-appi-green to-appi-amber h-3 rounded-full transition-all duration-1000 ease-out"
                style={{ width: '85%' }}
              ></div>
          </div>
        </div>

          {/* Features Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="text-2xl mb-2">🏛️</div>
              <h3 className="text-white font-semibold mb-2">Digital Transformation</h3>
              <p className="text-white/80 text-sm">Modern web presence and digital tools</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="text-2xl mb-2">📚</div>
              <h3 className="text-white font-semibold mb-2">Capacity Building</h3>
              <p className="text-white/80 text-sm">Learning resources and training programs</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="text-2xl mb-2">🤝</div>
              <h3 className="text-white font-semibold mb-2">Networking</h3>
              <p className="text-white/80 text-sm">Summit events and working groups</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-white/80 text-sm">
          <div className="flex justify-center space-x-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
          </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-appi-green/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-appi-amber/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-appi-blue/5 rounded-full blur-3xl"></div>
        </div>
    </div>
  )
}
