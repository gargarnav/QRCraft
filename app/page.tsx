// @ts-nocheck
"use client";
import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import UseCases from '@/components/UseCases'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'
import { useQRConfig } from '@/hooks/useQRConfig'

export default function Home() {
  const { config, updateConfig } = useQRConfig()
  const [showScrollTop, setShowScrollTop] = useState(false)

  // Stripe Integration parameters logic optionally kept
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)

      // Handle Payments
      if (params.get('paid') === 'true') {
        updateConfig('hasPaid', true)
        window.history.replaceState({}, '', '/')
      }
    }
  }, [updateConfig])

  // Scroll to top visibility
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

      <main>
        <div id="how-it-works">
          <Hero />
        </div>

        <UseCases />
        <FAQ />
      </main>

      <Footer />

      {/* Floating Back to Top Button */}
      <button
        onClick={() => {
          if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }
        }}
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
