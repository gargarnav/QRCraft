"use client";
// @ts-nocheck


import { useState } from 'react'
import Link from 'next/link'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
export default function Header({ currentPage, setCurrentPage, hasDynamicCodes }: any) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const handleNav = (page: any, sectionId: any = null) => {
        setMobileMenuOpen(false)
        setCurrentPage(page)

        if (page === 'home' && sectionId) {
            setTimeout(() => {
                const element = document.getElementById(sectionId)
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' })
                }
            }, 100)
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }

    return (
        <header className="sticky top-0 z-50 bg-[#080810CC] backdrop-blur-xl border-b border-[#1E1E35CC] h-16 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                <div className="flex items-center justify-between h-full">
                    {/* Logo */}
                    <div className="flex items-center gap-2 cursor-pointer group" onClick={() => handleNav('home')}>
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-shadow duration-300">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                <path d="M3 3h6v6H3V3zm2 2v2h2V5H5zm8-2h6v6h-6V3zm2 2v2h2V5h-2zM3 13h6v6H3v-6zm2 2v2h2v-2H5zm13-2h3v2h-3v-2zm-3 0h2v2h-2v-2zm3 3h3v3h-3v-3zm-3 3h2v-2h-2v2zm-3-3h2v2h-2v-2z" />
                            </svg>
                        </div>
                        <span className="font-syne font-bold text-xl tracking-tight text-white group-hover:text-white/90 transition-colors">qrcraft.fun</span>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        <button onClick={() => handleNav('home')} className={`text-sm font-medium transition-colors hover:text-white ${currentPage === 'home' ? 'text-white' : 'text-textMuted'}`}>
                            Home
                        </button>
                        <button onClick={() => handleNav('about')} className={`text-sm font-medium transition-colors hover:text-white ${currentPage === 'about' ? 'text-white' : 'text-textMuted'}`}>
                            About
                        </button>

                        {hasDynamicCodes && (
                            <button onClick={() => handleNav('dashboard')} className={`text-sm font-medium transition-colors hover:text-white ${currentPage === 'dashboard' ? 'text-white' : 'text-textMuted'}`}>
                                Dashboard
                            </button>
                        )}

                        <button onClick={() => handleNav('home', 'pricing')} className="text-sm font-medium text-textMuted hover:text-white transition-colors">
                            Pricing
                        </button>

                        <SignedIn>
                            <UserButton afterSignOutUrl="/" />
                        </SignedIn>
                        <SignedOut>
                            <Link href="/auth/login" className="text-sm font-medium text-primary-light border border-primary/50 rounded-full px-4 py-1.5 hover:bg-primary/10 hover:border-primary transition-all duration-200">
                                Sign In
                            </Link>
                        </SignedOut>
                    </nav>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-textMuted hover:text-white transition-colors">
                            {mobileMenuOpen ? (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-card/95 backdrop-blur-xl border-b border-border p-4 space-y-4 shadow-2xl absolute w-full left-0 top-16 animate-slide-in-from-top duration-200">
                    <button onClick={() => handleNav('home')} className="block w-full text-left font-medium text-textSecondary hover:text-white py-3 px-2 rounded-md hover:bg-white/5 transition-colors border-b border-white/5">Home</button>
                    <button onClick={() => handleNav('about')} className="block w-full text-left font-medium text-textSecondary hover:text-white py-3 px-2 rounded-md hover:bg-white/5 transition-colors border-b border-white/5">About</button>
                    {hasDynamicCodes && (
                        <button onClick={() => handleNav('dashboard')} className="block w-full text-left font-medium text-textSecondary hover:text-white py-3 px-2 rounded-md hover:bg-white/5 transition-colors border-b border-white/5">Dashboard</button>
                    )}
                    <button onClick={() => handleNav('home', 'pricing')} className="block w-full text-left font-medium text-textSecondary hover:text-white py-3 px-2 rounded-md hover:bg-white/5 transition-colors border-b border-white/5">Pricing</button>
                    <button onClick={() => handleNav('home', 'tool')} className="block w-full bg-primary text-white px-5 py-3 rounded-lg font-bold text-center mt-4 shadow-lg shadow-primary/20">
                        Get Started
                    </button>
                </div>
            )}
        </header>
    )
}
