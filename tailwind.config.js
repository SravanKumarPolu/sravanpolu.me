/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    fontSize: {
      xs: ["12px", "16px"],
      sm: ["14px", "20px"],
      base: ["16px", "19.5px"],
      lg: ["18px", "21.94px"],
      xl: ["20px", "24.38px"],
      "2xl": ["24px", "29.26px"],
      "3xl": ["28px", "50px"],
      "4xl": ["48px", "58px"],
      "8xl": ["96px", "106px"],
      // ✅ Fluid Typography System
      'fluid-xs': 'clamp(0.75rem, 2vw, 0.875rem)',
      'fluid-sm': 'clamp(0.875rem, 2.5vw, 1rem)',
      'fluid-base': 'clamp(1rem, 3vw, 1.125rem)',
      'fluid-lg': 'clamp(1.125rem, 3.5vw, 1.25rem)',
      'fluid-xl': 'clamp(1.25rem, 4vw, 1.5rem)',
      'fluid-2xl': 'clamp(1.5rem, 5vw, 2rem)',
      'fluid-3xl': 'clamp(1.875rem, 6vw, 2.5rem)',
      'fluid-4xl': 'clamp(2.25rem, 7vw, 3rem)',
      'fluid-5xl': 'clamp(3rem, 8vw, 4rem)',
      'fluid-6xl': 'clamp(3.75rem, 10vw, 5rem)',
    },

    extend: {
      animation: {
        "spin-slow": "spin 20s linear infinite",
      },
      // ✅ Fonts
      fontFamily: {
        sans: ["Helvetica", "Arial", "sans-serif"],
        palanquin: ["Palanquin", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },

      // ✅ Unified Color System
      colors: {
        // Primary brand colors
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        // Secondary accent colors
        secondary: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7c3aed',
          800: '#6b21a8',
          900: '#581c87',
          950: '#3b0764',
        },
        // Accent colors
        accent: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },
        // Neutral colors
        neutral: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712',
        },
        // Legacy colors for compatibility
        customColor: "rgb(23, 30, 64)",
        "coral-red": "#FF6452",
        "slate-gray": "#6D6D6D",
        "pale-blue": "#F5F6FF",
        "white-400": "rgba(255, 255, 255, 0.80)",
        gold: "#FFD700",
      },

      // ✅ Backgrounds
      backgroundImage: {
        "multiple-gradients":
          "linear-gradient(to bottom, #f87171, #1e40af), linear-gradient(to right, #1e40af, #f87171)",
      },

      backgroundBlendMode: {
        multiply: "multiply",
      },

      // ✅ Shadows
      boxShadow: {
        "3xl": "0 10px 40px rgba(0, 0, 0, 0.1)",
      },

      // ✅ Animations
      animation: {
        gradient: "gradientBG 5s ease infinite",
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'slide-left': 'slideLeft 0.5s ease-out',
        'slide-right': 'slideRight 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'bounce-in': 'bounceIn 0.6s ease-out',
        'rotate-in': 'rotateIn 0.5s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
        'magnetic': 'magnetic 0.3s ease-out',
        'ripple': 'ripple 0.6s ease-out',
        'tilt': 'tilt 0.3s ease-out',
        'glass': 'glass 0.3s ease-out',
        'neon': 'neon 2s ease-in-out infinite alternate',
        'frosted': 'frosted 0.3s ease-out',
        'reveal-up': 'revealUp 0.6s ease-out',
        'reveal-down': 'revealDown 0.6s ease-out',
        'reveal-left': 'revealLeft 0.6s ease-out',
        'reveal-right': 'revealRight 0.6s ease-out',
        'stagger': 'stagger 0.6s ease-out',
        'parallax': 'parallax 0.3s ease-out',
        'spring': 'spring 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'elastic': 'elastic 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'bounce-soft': 'bounceSoft 0.6s ease-out',
        'fade-scale': 'fadeScale 0.4s ease-out',
        'slide-scale': 'slideScale 0.5s ease-out',
        'rotate-scale': 'rotateScale 0.6s ease-out',
        'flip': 'flip 0.6s ease-in-out',
        'zoom': 'zoom 0.3s ease-out',
        'blur': 'blur 0.3s ease-out',
        'slide-fade': 'slideFade 0.5s ease-out',
        'scale-fade': 'scaleFade 0.4s ease-out',
        'rotate-fade': 'rotateFade 0.5s ease-out',
        'bounce-fade': 'bounceFade 0.6s ease-out',
        'elastic-fade': 'elasticFade 0.8s ease-out',
        'spring-fade': 'springFade 0.6s ease-out',
        'magnetic-hover': 'magneticHover 0.3s ease-out',
        'ripple-effect': 'rippleEffect 0.6s ease-out',
        'tilt-hover': 'tiltHover 0.3s ease-out',
        'glass-hover': 'glassHover 0.3s ease-out',
        'neon-pulse': 'neonPulse 2s ease-in-out infinite',
        'frosted-hover': 'frostedHover 0.3s ease-out',
        'shimmer-effect': 'shimmerEffect 1.5s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite alternate',
        'magnetic-pulse': 'magneticPulse 0.3s ease-out',
        'ripple-pulse': 'ripplePulse 0.6s ease-out',
        'tilt-pulse': 'tiltPulse 0.3s ease-out',
        'glass-pulse': 'glassPulse 0.3s ease-out',
        'neon-glow': 'neonGlow 2s ease-in-out infinite alternate',
        'frosted-pulse': 'frostedPulse 0.3s ease-out',
      },

      keyframes: {
        gradientBG: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideLeft: {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideRight: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        bounceIn: {
          "0%": { opacity: "0", transform: "scale(0.3)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
          "70%": { transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        rotateIn: {
          "0%": { opacity: "0", transform: "rotate(-200deg)" },
          "100%": { opacity: "1", transform: "rotate(0deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 5px rgba(59, 130, 246, 0.5)" },
          "50%": { boxShadow: "0 0 20px rgba(59, 130, 246, 0.8)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        heartbeat: {
          "0%, 100%": { transform: "scale(1)" },
          "25%": { transform: "scale(1.1)" },
          "50%": { transform: "scale(1)" },
          "75%": { transform: "scale(1.05)" },
        },
        magnetic: {
          "0%": { transform: "translate(0, 0)" },
          "100%": { transform: "translate(0, 0)" },
        },
        ripple: {
          "0%": { transform: "scale(0)", opacity: "1" },
          "100%": { transform: "scale(4)", opacity: "0" },
        },
        tilt: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        glass: {
          "0%": { backdropFilter: "blur(0px)" },
          "100%": { backdropFilter: "blur(10px)" },
        },
        neon: {
          "0%, 100%": { textShadow: "0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor" },
          "50%": { textShadow: "0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor" },
        },
        frosted: {
          "0%": { backdropFilter: "blur(0px)", backgroundColor: "rgba(255, 255, 255, 0.1)" },
          "100%": { backdropFilter: "blur(10px)", backgroundColor: "rgba(255, 255, 255, 0.2)" },
        },
        revealUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        revealDown: {
          "0%": { opacity: "0", transform: "translateY(-30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        revealLeft: {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        revealRight: {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        stagger: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        parallax: {
          "0%": { transform: "translateY(0px)" },
          "100%": { transform: "translateY(-10px)" },
        },
        spring: {
          "0%": { transform: "scale(0.3)", opacity: "0" },
          "50%": { transform: "scale(1.05)" },
          "70%": { transform: "scale(0.9)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        elastic: {
          "0%": { transform: "scale(0)" },
          "50%": { transform: "scale(1.25)" },
          "75%": { transform: "scale(0.9)" },
          "100%": { transform: "scale(1)" },
        },
        bounceSoft: {
          "0%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
          "100%": { transform: "translateY(0)" },
        },
        fadeScale: {
          "0%": { opacity: "0", transform: "scale(0.8)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        slideScale: {
          "0%": { opacity: "0", transform: "translateY(20px) scale(0.9)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        rotateScale: {
          "0%": { opacity: "0", transform: "rotate(-10deg) scale(0.8)" },
          "100%": { opacity: "1", transform: "rotate(0deg) scale(1)" },
        },
        flip: {
          "0%": { transform: "perspective(400px) rotateY(0)" },
          "40%": { transform: "perspective(400px) rotateY(-90deg)" },
          "60%": { transform: "perspective(400px) rotateY(-90deg)" },
          "100%": { transform: "perspective(400px) rotateY(0)" },
        },
        zoom: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.1)" },
        },
        blur: {
          "0%": { filter: "blur(0px)" },
          "100%": { filter: "blur(5px)" },
        },
        slideFade: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleFade: {
          "0%": { opacity: "0", transform: "scale(0.8)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        rotateFade: {
          "0%": { opacity: "0", transform: "rotate(-10deg)" },
          "100%": { opacity: "1", transform: "rotate(0deg)" },
        },
        bounceFade: {
          "0%": { opacity: "0", transform: "scale(0.3)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
          "70%": { transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        elasticFade: {
          "0%": { opacity: "0", transform: "scale(0)" },
          "50%": { opacity: "1", transform: "scale(1.25)" },
          "75%": { transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        springFade: {
          "0%": { opacity: "0", transform: "scale(0.3)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
          "70%": { transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        magneticHover: {
          "0%": { transform: "translate(0, 0)" },
          "100%": { transform: "translate(0, 0)" },
        },
        rippleEffect: {
          "0%": { transform: "scale(0)", opacity: "1" },
          "100%": { transform: "scale(4)", opacity: "0" },
        },
        tiltHover: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        glassHover: {
          "0%": { backdropFilter: "blur(0px)" },
          "100%": { backdropFilter: "blur(10px)" },
        },
        neonPulse: {
          "0%, 100%": { textShadow: "0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor" },
          "50%": { textShadow: "0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor" },
        },
        frostedHover: {
          "0%": { backdropFilter: "blur(0px)", backgroundColor: "rgba(255, 255, 255, 0.1)" },
          "100%": { backdropFilter: "blur(10px)", backgroundColor: "rgba(255, 255, 255, 0.2)" },
        },
        shimmerEffect: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 5px rgba(59, 130, 246, 0.5)" },
          "50%": { boxShadow: "0 0 20px rgba(59, 130, 246, 0.8)" },
        },
        magneticPulse: {
          "0%": { transform: "translate(0, 0)" },
          "100%": { transform: "translate(0, 0)" },
        },
        ripplePulse: {
          "0%": { transform: "scale(0)", opacity: "1" },
          "100%": { transform: "scale(4)", opacity: "0" },
        },
        tiltPulse: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        glassPulse: {
          "0%": { backdropFilter: "blur(0px)" },
          "100%": { backdropFilter: "blur(10px)" },
        },
        neonGlow: {
          "0%, 100%": { textShadow: "0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor" },
          "50%": { textShadow: "0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor" },
        },
        frostedPulse: {
          "0%": { backdropFilter: "blur(0px)", backgroundColor: "rgba(255, 255, 255, 0.1)" },
          "100%": { backdropFilter: "blur(10px)", backgroundColor: "rgba(255, 255, 255, 0.2)" },
        },
      },

      // ✅ Consistent Spacing System
      spacing: {
        'xs': '0.5rem',    // 8px
        'sm': '1rem',      // 16px
        'md': '1.5rem',    // 24px
        'lg': '2rem',      // 32px
        'xl': '3rem',      // 48px
        '2xl': '4rem',     // 64px
        '3xl': '6rem',     // 96px
        '4xl': '8rem',     // 128px
        // Golden ratio spacing
        'golden-xs': '0.618rem',    // 10px
        'golden-sm': '1rem',        // 16px
        'golden-md': '1.618rem',    // 26px
        'golden-lg': '2.618rem',    // 42px
        'golden-xl': '4.236rem',    // 68px
        'golden-2xl': '6.854rem',   // 110px
      },

      // ✅ Custom Breakpoints
      screens: {
        xs: "400px",
        wide: "2880px",
      },
      
      // ✅ Advanced Transform Utilities
      transform: {
        'gpu': 'translateZ(0)',
      },
    },
  },

  // ✅ DaisyUI Config
  daisyui: {
    themes: ["night", "business", "dark", "cmyk"], // sleek built-in themes
    base: true,
    styled: true,
    utils: true,
    logs: false,
    rtl: false,
    prefix: "",
    darkTheme: "business",
  },

  plugins: [
    require("daisyui"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/container-queries")
  ],
};

export default config;
