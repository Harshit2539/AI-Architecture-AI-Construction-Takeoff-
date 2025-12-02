/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: 'var(--color-border)', // slate-200
        input: 'var(--color-input)', // white
        ring: 'var(--color-ring)', // blue-500
        background: 'var(--color-background)', // white
        foreground: 'var(--color-foreground)', // slate-800
        primary: {
          DEFAULT: 'var(--color-primary)', // slate-900
          foreground: 'var(--color-primary-foreground)' // white
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', // slate-600
          foreground: 'var(--color-secondary-foreground)' // white
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', // red-500
          foreground: 'var(--color-destructive-foreground)' // white
        },
        muted: {
          DEFAULT: 'var(--color-muted)', // slate-50
          foreground: 'var(--color-muted-foreground)' // slate-500
        },
        accent: {
          DEFAULT: 'var(--color-accent)', // blue-500
          foreground: 'var(--color-accent-foreground)' // white
        },
        popover: {
          DEFAULT: 'var(--color-popover)', // white
          foreground: 'var(--color-popover-foreground)' // slate-800
        },
        card: {
          DEFAULT: 'var(--color-card)', // white
          foreground: 'var(--color-card-foreground)' // slate-800
        },
        success: {
          DEFAULT: 'var(--color-success)', // emerald-500
          foreground: 'var(--color-success-foreground)' // white
        },
        warning: {
          DEFAULT: 'var(--color-warning)', // amber-500
          foreground: 'var(--color-warning-foreground)' // white
        },
        error: {
          DEFAULT: 'var(--color-error)', // red-500
          foreground: 'var(--color-error-foreground)' // white
        },
        conversion: {
          DEFAULT: 'var(--color-conversion)', // orange-500
          foreground: 'var(--color-conversion-foreground)' // white
        },
        'text-primary': 'var(--color-text-primary)', // slate-700
        'text-secondary': 'var(--color-text-secondary)', // gray-500
        'brand-primary': 'var(--color-primary)', // slate-900
        'brand-secondary': 'var(--color-secondary)' // slate-600
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        inter: ['Inter', 'sans-serif']
      },
      fontSize: {
        'responsive-xl': 'clamp(2rem, 4vw, 3.5rem)',
        'responsive-lg': 'clamp(1.5rem, 3vw, 2.5rem)',
        'responsive-md': 'clamp(1.125rem, 2vw, 1.5rem)'
      },
      spacing: {
        'baseline': 'var(--baseline-rhythm)',
        'baseline-2x': 'calc(var(--baseline-rhythm) * 2)',
        'baseline-4x': 'calc(var(--baseline-rhythm) * 4)'
      },
      boxShadow: {
        'professional': '0 4px 16px rgba(26, 35, 50, 0.1)',
        'professional-lg': '0 8px 32px rgba(26, 35, 50, 0.15)',
        'cta': '0 8px 24px rgba(255, 107, 53, 0.3)',
        'measurement': '0 8px 32px rgba(43, 123, 205, 0.3)'
      },
      animation: {
        'ai-detect': 'ai-detect 2.5s ease-out forwards',
        'pulse-detect': 'pulse-detect 2s ease-in-out infinite',
        'data-flow': 'data-flow 8s linear infinite',
        'blueprint-unfold': 'blueprint-unfold 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'float': 'float 3s ease-in-out infinite',
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
      },
      keyframes: {
        'ai-detect': {
          'to': {
            'stroke-dashoffset': '0'
          }
        },
        'pulse-detect': {
          '0%, 100%': {
            transform: 'scale(1)',
            opacity: '1'
          },
          '50%': {
            transform: 'scale(1.2)',
            opacity: '0.7'
          }
        },
        'data-flow': {
          '0%': {
            transform: 'translateX(-100%)'
          },
          '100%': {
            transform: 'translateX(100%)'
          }
        },
        'blueprint-unfold': {
          'to': {
            'clip-path': 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
          }
        },
        'float': {
          '0%, 100%': {
            transform: 'translateY(0px) rotate(-5deg)'
          },
          '50%': {
            transform: 'translateY(-10px) rotate(-5deg)'
          }
        },
        'fadeIn': {
          'from': {
            opacity: '0',
            transform: 'translateY(20px)'
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'slideUp': {
          'from': {
            opacity: '0',
            transform: 'translateY(40px)'
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        }
      },
      transitionTimingFunction: {
        'brand': 'cubic-bezier(0.4, 0, 0.2, 1)'
      },
      transitionDuration: {
        'fast': '200ms',
        'normal': '300ms',
        'slow': '400ms'
      },
      borderRadius: {
        'brand': '8px'
      },
      backdropBlur: {
        'brand': '8px'
      },
      zIndex: {
        'header': '50',
        'sidebar': '40',
        'modal': '60',
        'tooltip': '70'
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('tailwindcss-animate')
  ],
}