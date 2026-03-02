// @ts-nocheck
"use client";

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const pathname = usePathname()

    return (
        <header className="sticky top-0 z-50 bg-[#080810CC] backdrop-blur-xl border-b border-[#1E1E35CC] h-16 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                <div className="flex items-center justify-between h-full">
                    {/* Logo */}
                    <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 cursor-pointer group">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-shadow duration-300">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                <path d="M3 3h6v6H3V3zm2 2v2h2V5H5zm8-2h6v6h-6V3zm2 2v2h2V5h-2zM3 13h6v6H3v-6zm2 2v2h2v-2H5zm13-2h3v2h-3v-2zm-3 0h2v2h-2v-2zm3 3h3v3h-3v-3zm-3 3h2v-2h-2v2zm-3-3h2v2h-2v-2z" />
                            </svg>
                        </div>
                        <span className="font-syne font-bold text-xl tracking-tight text-white group-hover:text-white/90 transition-colors">qrcraft.fun</span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        <Link href="/" className={`text-sm font-medium transition-colors hover:text-white ${pathname === '/' ? 'text-white' : 'text-textMuted'}`}>
                            Home
                        </Link>
                        <Link href="/about" className={`text-sm font-medium transition-colors hover:text-white ${pathname === '/about' ? 'text-white' : 'text-textMuted'}`}>
                            About
                        </Link>
                        <Link href="/pricing" className={`text-sm font-medium transition-colors hover:text-white ${pathname === '/pricing' ? 'text-white' : 'text-textMuted'}`}>
                            Pricing
                        </Link>

                        <SignedIn>
                            <Link href="/dashboard" className={`text-sm font-medium transition-colors hover:text-white ${pathname === '/dashboard' ? 'text-white' : 'text-textMuted'}`}>
                                Dashboard
                            </Link>
                        </SignedIn>

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
                    <Link href="/" onClick={() => setMobileMenuOpen(false)} className={`block w-full text-left font-medium py-3 px-2 rounded-md hover:bg-white/5 transition-colors border-b border-white/5 ${pathname === '/' ? 'text-white' : 'text-textSecondary hover:text-white'}`}>Home</Link>
                    <Link href="/about" onClick={() => setMobileMenuOpen(false)} className={`block w-full text-left font-medium py-3 px-2 rounded-md hover:bg-white/5 transition-colors border-b border-white/5 ${pathname === '/about' ? 'text-white' : 'text-textSecondary hover:text-white'}`}>About</Link>
                    <Link href="/pricing" onClick={() => setMobileMenuOpen(false)} className={`block w-full text-left font-medium py-3 px-2 rounded-md hover:bg-white/5 transition-colors border-b border-white/5 ${pathname === '/pricing' ? 'text-white' : 'text-textSecondary hover:text-white'}`}>Pricing</Link>
                    <SignedIn>
                        <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className={`block w-full text-left font-medium py-3 px-2 rounded-md hover:bg-white/5 transition-colors border-b border-white/5 ${pathname === '/dashboard' ? 'text-white' : 'text-textSecondary hover:text-white'}`}>Dashboard</Link>
                    </SignedIn>
                    <Link href="/generate" onClick={() => setMobileMenuOpen(false)} className="block w-full bg-primary text-white px-5 py-3 rounded-lg font-bold text-center mt-4 shadow-lg shadow-primary/20">
                        Get Started
                    </Link>
                </div>
            )}
        </header>
    )
}
