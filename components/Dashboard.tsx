"use client";
// @ts-nocheck// @ts-nocheck


import React, { useState } from 'react'


export default function Dashboard({ dynamicCodes, setDynamicCodes, setCurrentPage }: any) {
    const [editingCode, setEditingCode] = useState(null)
    const [newDest, setNewDest] = useState('')

    const handleDelete = (shortcode) => {
        if (confirm('Are you sure you want to delete this Dynamic QR Code? This action cannot be undone.')) {
            setDynamicCodes(prev => prev.filter(c => c.shortcode !== shortcode))
        }
    }

    const startEdit = (code) => {
        setEditingCode(code.shortcode)
        setNewDest(code.destination)
    }

    const saveEdit = (shortcode) => {
        setDynamicCodes(prev => prev.map(c =>
            c.shortcode === shortcode ? { ...c, destination: newDest } : c
        ))
        setEditingCode(null)
        alert('Updated! Note: redirect won\'t change until backend is connected.')
    }

    return (
        <div className="min-h-screen pt-24 pb-20 px-4 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="font-syne font-bold text-3xl text-white mb-2">My Dynamic QR Codes</h1>
                    <p className="text-textSecondary">Manage your redirects and view performance.</p>
                </div>
                <button onClick={() => setCurrentPage('home')} className="bg-primary hover:bg-primary-dim text-white px-6 py-2.5 rounded-full font-bold transition-all shadow-glow hover:shadow-glow-strong">
                    + Create New
                </button>
            </div>

            {dynamicCodes.length === 0 ? (
                <div className="bg-card border border-dashed border-border rounded-2xl p-12 text-center">
                    <div className="w-16 h-16 bg-dark rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-textMuted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2">No Dynamic QR Codes yet</h3>
                    <p className="text-textMuted mb-6">Create your first dynamic QR code to start tracking scans.</p>
                    <button onClick={() => setCurrentPage('home')} className="text-primary hover:text-white font-medium transition-colors">
                        Go to Generator &rarr;
                    </button>
                </div>
            ) : (
                <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-xl">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-border bg-dark/50">
                                    <th className="px-6 py-4 text-left text-xs font-bold text-textMuted uppercase tracking-wider">QR Code</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-textMuted uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-textMuted uppercase tracking-wider">Destination</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-textMuted uppercase tracking-wider">Short URL</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-textMuted uppercase tracking-wider">Created</th>
                                    <th className="px-6 py-4 text-right text-xs font-bold text-textMuted uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {dynamicCodes.map(code => (
                                    <tr key={code.shortcode} className="hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4">
                                            {/* Thumbnail Placeholder - in real app, render actual QR */}
                                            <div className="w-12 h-12 bg-white rounded flex items-center justify-center">
                                                <svg className="w-8 h-8 text-black" viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h6v6H3V3zm2 2v2h2V5H5zm8-2h6v6h-6V3zm2 2v2h2V5h-2zM3 13h6v6H3v-6zm2 2v2h2v-2H5zm13-2h3v2h-3v-2zm-3 0h2v2h-2v-2zm3 3h3v3h-3v-3zm-3 3h2v-2h-2v2zm-3-3h2v2h-2v-2z" /></svg>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-white font-medium">
                                            {code.name || 'Untitled QR'}
                                        </td>
                                        <td className="px-6 py-4 text-textSecondary max-w-xs truncate">
                                            {editingCode === code.shortcode ? (
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        type="text"
                                                        value={newDest}
                                                        onChange={(e) => setNewDest(e.target.value)}
                                                        className="bg-dark border border-primary rounded px-2 py-1 text-white text-sm w-full outline-none"
                                                    />
                                                    <button onClick={() => saveEdit(code.shortcode)} className="text-green-400 hover:text-green-300">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                                    </button>
                                                </div>
                                            ) : (
                                                <a href={code.destination} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                                                    {code.destination}
                                                </a>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-textMuted font-mono text-xs">
                                            qrcraft.fun/r/{code.shortcode}
                                        </td>
                                        <td className="px-6 py-4 text-textMuted text-sm">
                                            {new Date(code.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-3">
                                            <button
                                                onClick={() => setCurrentPage('analytics')}
                                                className="text-primary hover:text-white text-sm font-medium transition-colors"
                                            >
                                                Analytics
                                            </button>
                                            <button
                                                onClick={() => startEdit(code)}
                                                className="text-textMuted hover:text-white text-sm transition-colors"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(code.shortcode)}
                                                className="text-red-500 hover:text-red-400 text-sm transition-colors"
                                            >
                                                Delete
                                            </button>
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
