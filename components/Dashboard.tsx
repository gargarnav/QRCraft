// @ts-nocheck
"use client";

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'

export default function Dashboard() {
    const { user, isLoaded: isUserLoaded } = useUser()
    const [profile, setProfile] = useState<any>(null)
    const [isProfileLoading, setIsProfileLoading] = useState(true)
    const [qrCodes, setQrCodes] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const [editingCode, setEditingCode] = useState(null)
    const [newDest, setNewDest] = useState('')
    const [newName, setNewName] = useState('')

    const [copiedId, setCopiedId] = useState<string | null>(null)

    useEffect(() => {
        const fetchQRCodes = async () => {
            try {
                const response = await fetch('/api/qr/list')
                if (!response.ok) throw new Error('Failed to fetch')
                const data = await response.json()
                setQrCodes(data)
            } catch (err: any) {
                setError('Failed to load QR codes')
                console.error(err)
            } finally {
                setIsLoading(false)
            }
        }

        const fetchProfile = async () => {
            try {
                const response = await fetch('/api/profile')
                if (response.ok) {
                    const data = await response.json()
                    setProfile(data)
                }
            } catch (err) {
                console.error("Failed to load profile", err)
            } finally {
                setIsProfileLoading(false)
            }
        }

        fetchQRCodes()
        fetchProfile()
    }, [])

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this QR Code? This action cannot be undone.')) {
            // Optimistic update
            const prev = [...qrCodes]
            setQrCodes(qrCodes.filter(c => c.id !== id))
            try {
                const res = await fetch(`/api/qr/${id}`, { method: 'DELETE' })
                if (!res.ok) throw new Error("Delete failed")
            } catch (err) {
                alert('Failed to delete QR code.')
                setQrCodes(prev) // revert
            }
        }
    }

    const startEdit = (code: any) => {
        setEditingCode(code.id)
        setNewDest(code.destinationUrl || '')
        setNewName(code.name || '')
    }

    const saveEdit = async (id: string, type: string) => {
        const prev = [...qrCodes]
        setQrCodes(qrCodes.map(c => c.id === id ? { ...c, name: newName, destinationUrl: type === 'dynamic' ? newDest : c.destinationUrl } : c))
        setEditingCode(null)

        try {
            const res = await fetch(`/api/qr/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: newName,
                    destinationUrl: type === 'dynamic' ? newDest : undefined
                })
            })
            if (!res.ok) throw new Error('Failed to update')
        } catch (err) {
            alert('Updated failed!')
            setQrCodes(prev) // revert
        }
    }

    const handleCopy = (shortCode: string) => {
        const baseUrl = typeof window !== 'undefined' ? window.location.origin : (process.env.NEXT_PUBLIC_APP_URL || '')
        const url = `${baseUrl}/r/${shortCode}`
        navigator.clipboard.writeText(url)
        setCopiedId(shortCode)
        setTimeout(() => setCopiedId(null), 2000)
    }

    const getPlanBadge = (plan: string) => {
        switch (plan) {
            case 'maker': return <span className="bg-blue-500/20 text-blue-400 border border-blue-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Maker ✦</span>
            case 'pro': return <span className="bg-purple-500/20 text-purple-400 border border-purple-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Pro ✦</span>
            case 'enterprise': return <span className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Enterprise ✦</span>
            default: return <span className="bg-gray-500/20 text-gray-400 border border-gray-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Free Plan</span>
        }
    }

    const getUsageStats = (plan: string, count: number) => {
        switch (plan) {
            case 'maker': return `${count} / 25 QR Codes used`
            case 'pro':
            case 'enterprise': return `${count} QR Codes created`
            default: return `${count} / 3 QR Codes used`
        }
    }

    return (
        <div className="min-h-screen pt-12 pb-20 px-4 max-w-7xl mx-auto">

            {/* PROFILE SECTION */}
            <div className="mb-12">

                {isUserLoaded && !isProfileLoading ? (
                    <div className="bg-card border border-border rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
                        <div className="flex items-center gap-5 w-full md:w-auto">
                            <img src={user?.imageUrl} alt="Profile" className="w-16 h-16 rounded-full border-2 border-primary/30" />
                            <div className="flex-1">
                                <h2 className="text-xl font-bold text-white">{user?.fullName || 'User'}</h2>
                                <p className="text-textSecondary text-sm">{user?.primaryEmailAddress?.emailAddress}</p>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row flex-wrap items-center gap-6 w-full md:w-auto">
                            <div className="text-center md:text-right w-full md:w-auto">
                                <div className="mb-2">
                                    {getPlanBadge(profile?.plan || 'free')}
                                </div>
                                <p className="text-textMuted text-sm font-medium">
                                    {getUsageStats(profile?.plan || 'free', profile?.qrCodesCount || 0)}
                                </p>
                            </div>

                            {(profile?.plan === 'free' || profile?.plan === 'maker' || !profile?.plan) ? (
                                <Link href="/pricing" className="btn-primary py-2.5 px-6 text-sm w-full md:w-auto whitespace-nowrap text-center">
                                    Upgrade Plan
                                </Link>
                            ) : (
                                <Link href="/pricing" className="btn-secondary py-2.5 px-6 text-sm w-full md:w-auto whitespace-nowrap text-center">
                                    Manage Subscription
                                </Link>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="bg-card border border-border rounded-3xl p-8 flex items-center gap-6 shadow-xl animate-pulse">
                        <div className="w-16 h-16 rounded-full bg-white/5"></div>
                        <div className="space-y-3 flex-1">
                            <div className="h-5 bg-white/5 rounded w-48"></div>
                            <div className="h-4 bg-white/5 rounded w-32"></div>
                        </div>
                        <div className="hidden md:flex flex-col items-end gap-3">
                            <div className="h-6 bg-white/5 rounded-full w-24"></div>
                            <div className="h-4 bg-white/5 rounded w-36"></div>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="font-syne font-bold text-2xl text-white mb-2">My QR Codes</h2>
                    <p className="text-textSecondary">Manage your redirects and view performance.</p>
                </div>
                <Link href="/generate" className="bg-primary hover:bg-primary-dim text-white px-6 py-2.5 rounded-full font-bold transition-all shadow-glow hover:shadow-glow-strong inline-block">
                    + Create New
                </Link>
            </div>

            {isLoading ? (
                <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-xl p-8 space-y-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="animate-pulse bg-white/5 h-16 rounded-xl w-full"></div>
                    ))}
                </div>
            ) : error ? (
                <div className="bg-card border border-red-500/20 bg-red-500/5 rounded-2xl p-8 text-center">
                    <p className="text-red-400 mb-4">{error}</p>
                    <button onClick={() => window.location.reload()} className="text-white bg-red-500/20 px-4 py-2 rounded-lg hover:bg-red-500/30">Retry</button>
                </div>
            ) : qrCodes.length === 0 ? (
                <div className="bg-card border border-dashed border-border rounded-2xl p-12 text-center">
                    <div className="w-16 h-16 bg-dark rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-textMuted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2">No QR Codes yet</h3>
                    <p className="text-textMuted mb-6">Create your first QR code to see it here</p>
                    <Link href="/generate" className="text-primary hover:text-white font-medium transition-colors block mt-2">
                        Go to Generator &rarr;
                    </Link>
                </div>
            ) : (
                <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-xl">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-border bg-dark/50">
                                    <th className="px-6 py-4 text-left text-xs font-bold text-textMuted uppercase tracking-wider">Type</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-textMuted uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-textMuted uppercase tracking-wider">Destination</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-textMuted uppercase tracking-wider">Short URL</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-textMuted uppercase tracking-wider">Scans</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-textMuted uppercase tracking-wider">Created</th>
                                    <th className="px-6 py-4 text-right text-xs font-bold text-textMuted uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {qrCodes.map((code: any) => (
                                    <tr key={code.id} className="hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-2">
                                                <span className="inline-block px-2.5 py-1 bg-white/10 text-white text-xs rounded uppercase font-bold text-center w-16">{code.qrType}</span>
                                                <span className={`inline-block px-2.5 py-1 text-xs rounded uppercase font-bold text-center w-16 ${code.type === 'dynamic' ? 'bg-primary/20 text-primary-light' : 'bg-gray-500/20 text-gray-400'}`}>{code.type}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-white font-medium max-w-[120px] truncate">
                                            {editingCode === code.id ? (
                                                <input
                                                    type="text"
                                                    value={newName}
                                                    onChange={(e) => setNewName(e.target.value)}
                                                    className="bg-dark border border-primary rounded px-2 py-1 text-white text-sm w-full outline-none"
                                                />
                                            ) : (
                                                <div className="truncate" title={code.name}>{code.name || 'Untitled QR'}</div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-textSecondary max-w-[200px] truncate">
                                            {editingCode === code.id && code.type === 'dynamic' ? (
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        type="text"
                                                        value={newDest}
                                                        onChange={(e) => setNewDest(e.target.value)}
                                                        className="bg-dark border border-primary rounded px-2 py-1 text-white text-sm w-full outline-none"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="truncate" title={code.destinationUrl || code.data}>
                                                    {code.destinationUrl || code.data || '—'}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-textMuted font-mono text-xs">
                                            {code.type === 'dynamic' && code.shortCode ? (
                                                <div className="flex items-center gap-2">
                                                    <a href={`/r/${code.shortCode}`} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors hover:underline">
                                                        /r/{code.shortCode}
                                                    </a>
                                                    <button onClick={() => handleCopy(code.shortCode)} className="p-1 hover:bg-white/10 rounded transition-colors relative group" title="Copy to clipboard">
                                                        {copiedId === code.shortCode ? (
                                                            <svg className="w-3.5 h-3.5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                                        ) : (
                                                            <svg className="w-3.5 h-3.5 text-textMuted group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                                                        )}
                                                    </button>
                                                </div>
                                            ) : (
                                                '—'
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-white font-mono text-sm">
                                            {code.type === 'dynamic' ? code.scans : '—'}
                                        </td>
                                        <td className="px-6 py-4 text-textMuted text-sm">
                                            {new Date(code.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-3 whitespace-nowrap">
                                            {editingCode === code.id ? (
                                                <>
                                                    <button onClick={() => saveEdit(code.id, code.type)} className="text-green-400 hover:text-green-300 text-sm font-medium transition-colors">Save</button>
                                                    <button onClick={() => setEditingCode(null)} className="text-textMuted hover:text-white text-sm transition-colors">Cancel</button>
                                                </>
                                            ) : (
                                                <>
                                                    <button onClick={() => startEdit(code)} className="text-textMuted hover:text-white text-sm transition-colors">Edit</button>
                                                    <button onClick={() => handleDelete(code.id)} className="text-red-500 hover:text-red-400 text-sm transition-colors">Delete</button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    )
}
