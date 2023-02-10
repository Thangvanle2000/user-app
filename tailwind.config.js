/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                green1: "#198754",
                tablebg: "#d1e7dd",
            },
            fontFamily: {
                fontPoppins: "fontFamily:'Poppins'",
                fontPoppins: ['poppins'],

            },
        },
    },
    plugins: [],
}