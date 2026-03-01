"use client";
// @ts-nocheck


import React from 'react'
import {  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell  } from 'recharts'
import PaywallModal from '@/components/PaywallModal'

const generateMockScans = (days = 30) => {
    return Array.from({ length: days }, (_, i) => ({
        date: new Date(Date.now() - (days - i) * 86400000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        scans: Math.floor(Math.random() * 80) + 10
    }))
}

const mockData = generateMockScans()

const mockDevices = [
    { name: 'Mobile', value: 68, color: '#7C6EFA' },
    { name: 'Desktop', value: 24, color: '#FF6B8A' },
    { name: 'Tablet', value: 8, color: '#4ADE80' }
]

const mockCountries = [
    { country: '🇮🇳 India', scans: 421 },
    { country: '🇺🇸 United States', scans: 238 },
    { country: '🇬🇧 United Kingdom', scans: 94 },
    { country: '🇦🇺 Australia', scans: 67 },
    { country: '🇨🇦 Canada', scans: 52 }
]



export default function Analytics({ hasPaid, setCurrentPage }) {
    if (!hasPaid) {
        return (
            <div className="min-h-screen pt-32 pb-20 px-4 flex items-center justify-center">
                <div className="text-center max-w-lg">
                    <div className="w-16 h-16 bg-dark-raised rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-glow">
                        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">Analytics Locked</h2>
                    <p className="text-textSecondary mb-8">Upgrade to Pro+ to see detailed scan analytics including device type, location, and time.</p>
                    <button onClick={() => setCurrentPage('home')} className="bg-primary text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-primary-dim transition-colors">
                        Go Back
                    </button>
                    {/* Note: In a real app, this would trigger the PaywallModal */}
                </div>
            </div>
        )
    }

    const totalScans = mockData.reduce((acc, curr) => acc + curr.scans, 0)
    const todayScans = mockData[mockData.length - 1].scans

    return (
        <div className="min-h-screen pt-24 pb-20 px-4 max-w-7xl mx-auto">
            {/* Demo Banner */}
            <div className="mb-8 bg-[#FBBF24]/10 border border-[#FBBF24]/20 rounded-xl p-4 flex items-start gap-3">
                <svg className="w-5 h-5 text-[#FBBF24] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <div className="text-sm text-[#FEDE34]/90">
                    <strong>Demo Mode:</strong> This is a preview using mock data. Real analytics will be available once dynamic QR codes are connected to a live backend.
                </div>
            </div>

            <div className="flex items-center justify-between mb-8">
                <h1 className="font-syne font-bold text-3xl text-white">Scan Analytics</h1>
                <div className="flex bg-dark-raised rounded-lg p-1 border border-border">
                    {['7D', '30D', '90D'].map(range => (
                        <button key={range} className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${range === '30D' ? 'bg-primary text-white' : 'text-textMuted hover:text-white'}`}>
                            {range}
                        </button>
                    ))}
                </div>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {[
                    { label: 'Total Scans', value: totalScans.toLocaleString() },
                    { label: 'Today', value: todayScans },
                    { label: 'This Week', value: '318' },
                    { label: 'Top Country', value: 'IN 🇮🇳' }
                ].map((stat, i) => (
                    <div key={i} className="bg-card border border-border rounded-xl p-6 shadow-sm">
                        <p className="text-textMuted text-xs font-bold uppercase tracking-wider mb-2">{stat.label}</p>
                        <p className="text-3xl font-syne font-bold text-white">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Main Chart */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm mb-8">
                <h3 className="text-white font-bold mb-6">Scans Over Time</h3>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={mockData}>
                            <defs>
                                <linearGradient id="colorScans" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#7C6EFA" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#7C6EFA" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                            <XAxis dataKey="date" stroke="#666680" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                            <YAxis stroke="#666680" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#0F0F1A', borderColor: '#1E1E35', borderRadius: '8px', color: '#fff' }}
                                itemStyle={{ color: '#7C6EFA' }}
                            />
                            <Area type="monotone" dataKey="scans" stroke="#7C6EFA" strokeWidth={3} fillOpacity={1} fill="url(#colorScans)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Secondary Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Device Breakdown */}
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                    <h3 className="text-white font-bold mb-6">Device Breakdown</h3>
                    <div className="h-[250px] w-full flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={mockDevices}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {mockDevices.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: '#0F0F1A', borderColor: '#1E1E35', borderRadius: '8px', color: '#fff' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center gap-6 mt-4">
                        {mockDevices.map(device => (
                            <div key={device.name} className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: device.color }} />
                                <span className="text-sm text-textSecondary">{device.name} ({device.value}%)</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Countries */}
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                    <h3 className="text-white font-bold mb-6">Top Countries</h3>
                    <div className="space-y-4">
                        {mockCountries.map((item, i) => (
                            <div key={i} className="flex items-center gap-4">
                                <div className="w-8 text-xl text-center">{item.country.split(' ')[0]}</div>
                                <div className="flex-1">
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-white">{item.country.split(' ').slice(1).join(' ')}</span>
                                        <span className="text-textMuted">{item.scans} scans</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-dark-raised rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary rounded-full"
                                            style={{ width: `${(item.scans / 500) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
