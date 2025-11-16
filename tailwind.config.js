/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/templates/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
  	extend: {
  		maxWidth: {
  			none: 'none',
  			xs: '20rem',
  			sm: '24rem',
  			md: '28rem',
  			lg: '32rem',
  			xl: '36rem',
  			'2xl': '42rem',
  			'3xl': '48rem',
  			'4xl': '56rem',
  			full: '100%',
  			wrapper: 'var(--maxWidth-wrapper)'
  		},
  		spacing: {
  			'0': '0',
  			'1': '0.25rem',
  			'2': '0.5rem',
  			'3': '0.75rem',
  			'4': '1rem',
  			'5': '1.25rem',
  			'6': '1.5rem',
  			'8': '2rem',
  			'10': '2.5rem',
  			'12': '3rem',
  			'16': '4rem',
  			'20': '5rem',
  			'24': '6rem',
  			'32': '8rem',
  			px: '1px'
  		},
  		fontFamily: {
  			sans: [
  				'MontserratVariable',
  				'system-ui',
  				'-apple-system',
  				'BlinkMacSystemFont',
  				'Segoe UI',
  				'Roboto',
  				'Helvetica Neue',
  				'Arial',
  				'Noto Sans',
  				'sans-serif',
  				'Apple Color Emoji',
  				'Segoe UI Emoji',
  				'Segoe UI Symbol',
  				'Noto Color Emoji'
  			],
  			serif: [
  				'Merriweather',
  				'Georgia',
  				'Cambria',
  				'Times New Roman',
  				'Times',
  				'serif'
  			],
  			body: [
  				'var(--font-body)'
  			],
  			heading: [
  				'var(--font-heading)'
  			],
  			pretendard: [
  				'Pretendard',
  				'sans-serif'
  			],
  			paperozi: [
  				'Paperozi',
  				'sans-serif'
  			]
  		},
  		fontWeight: {
  			normal: '400',
  			bold: '700',
  			black: '900'
  		},
  		fontSize: {
  			'0': '0.833rem',
  			'1': '1rem',
  			'2': '1.2rem',
  			'3': '1.44rem',
  			'4': '1.728rem',
  			'5': '2.074rem',
  			'6': '2.488rem',
  			'7': '2.986rem'
  		},
  		lineHeight: {
  			none: '1',
  			tight: '1.1',
  			normal: '1.5',
  			relaxed: '1.625'
  		},
  		colors: {
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			text: 'var(--color-text)',
  			textLight: 'var(--color-text-light)',
  			heading: 'var(--color-heading)',
  			headingBlack: 'var(--color-heading-black)',
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			darkMain: 'var(--color-dark-main)',
  			lightDark: 'var(--color-lightdark)',
  			yellow: 'var(--color-yellow)',
  			background: 'hsl(var(--background))',
  			darkBackground: 'var(--color-dark-background)',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
  darkMode: ["selector", "class"],
}
