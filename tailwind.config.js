/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                legacy: {
                    teal: '#26AAAF',
                    yellow: '#FEF598',
                    blue: '#aedbdd',       // Global Background
                    text: '#2c3e50',       // Standard Text
                    'teal-dark': '#2b7781', // For gradients
                    'teal-light': '#3da3a8', // For gradients/dividers
                }
            },
            fontFamily: {
                sans: ['Avenir', 'Helvetica', 'Arial', 'sans-serif'], // Legacy font stack
            }
        },
    },
    plugins: [],
}
