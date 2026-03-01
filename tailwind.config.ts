import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#7C6EFA', // --purple-core
                'primary-light': '#A89EFC',
                'primary-dim': '#4A4490',
                accent: '#FF6B8A', // --pink
                dark: '#080810', // --dark-base
                card: '#0F0F1A', // --dark-surface
                'dark-raised': '#161625',
                border: '#1E1E35', // --dark-border
                muted: '#2A2A45',
                textLight: '#FFFFFF', // --text-primary
                textSecondary: '#B0B0CC',
                textMuted: '#666680',
                success: '#4ADE80',
                error: '#FF4D6A',
                warning: '#FBBF24',
            },
            fontFamily: {
                syne: ['Syne', 'sans-serif'],
                sans: ['DM Sans', 'sans-serif'], // Replaces Inter as default sans
                mono: ['JetBrains Mono', 'monospace'],
                inter: ['Inter', 'sans-serif'], // Keep as backup or specific use if needed
            },
            borderRadius: {
                'xl': '16px',
                '2xl': '24px',
                '3xl': '32px',
            },
            boxShadow: {
                'glow': '0 0 20px rgba(124, 110, 250, 0.3)',
                'glow-strong': '0 0 32px rgba(124, 110, 250, 0.5)',
                'card-glow': '0 0 0 1px rgba(124,110,250,0.2), 0 0 40px rgba(124,110,250,0.1), 0 16px 48px rgba(0,0,0,0.5)',
            },
            animation: {
                'gradient': 'gradient 5s ease infinite',
                'text-shimmer': 'textShimmer 4s linear infinite',
                'border-pulse': 'borderPulse 3s ease-in-out infinite',
                'slide-up': 'slideUp 500ms cubic-bezier(0.16, 1, 0.3, 1) both',
                'fade-in': 'fadeIn 400ms ease-out both',
                'spring': 'spring 350ms cubic-bezier(0.34, 1.56, 0.64, 1) both',
            },
            keyframes: {
                gradient: {
                    '0%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                    '100%': { backgroundPosition: '0% 50%' },
                },
                textShimmer: {
                    '0%': { backgroundPosition: '0% center' },
                    '100%': { backgroundPosition: '200% center' },
                },
                borderPulse: {
                    '0%, 100%': { boxShadow: '0 0 0 1px rgba(124,110,250,0.3), 0 0 20px rgba(124,110,250,0.1)' },
                    '50%': { boxShadow: '0 0 0 1px rgba(255,107,138,0.4), 0 0 30px rgba(255,107,138,0.15)' },
                },
                slideUp: {
                    'from': { opacity: '0', transform: 'translateY(20px)' },
                    'to': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeIn: {
                    'from': { opacity: '0' },
                    'to': { opacity: '1' },
                },
                spring: {
                    'from': { transform: 'scale(0.96)', opacity: '0' },
                    'to': { transform: 'scale(1)', opacity: '1' },
                }
            },
            transitionProperty: {
                'height': 'height',
                'spacing': 'margin, padding',
            }
        },
    },
    plugins: [],
};
export default config;
