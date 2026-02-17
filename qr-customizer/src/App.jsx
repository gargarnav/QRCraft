import { useEffect, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import QRTool from './components/QRTool'
import UseCases from './components/UseCases'
import Pricing from './components/Pricing'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import { useQRConfig } from './hooks/useQRConfig'

export default function App() {
  const { config, updateConfig } = useQRConfig()
  const [showScrollTop, setShowScrollTop] = useState(false)

  // Step 5: Stripe Integration
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('paid') === 'true') {
      updateConfig('hasPaid', true)
      // Clean the URL
      window.history.replaceState({}, '', '/')
    }
  }, [updateConfig])

  // Step 6: Scroll to top visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true)
      } else {
        setShowScrollTop(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="bg-dark text-textLight min-h-screen font-inter">
      <Header />

      <div id="how-it-works">
        <Hero />
      </div>

      <section id="tool" className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Create Your Custom QR Code</h2>
          <p className="text-gray-400">Design, customize, and download in seconds.</p>
        </div>
        <QRTool config={config} updateConfig={updateConfig} />
      </section>

      <UseCases />
      <Pricing />
      <FAQ />
      <Footer />

      {/* Floating Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 bg-primary text-white p-3 rounded-full shadow-xl transition-all duration-300 z-40 ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
          }`}
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  )
}
