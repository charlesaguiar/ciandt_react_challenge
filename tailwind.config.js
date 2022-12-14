/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			height: {
				nav: 'var(--navbar-height)',
			},
			backgroundImage: {
				hero: "url('../public/img/bulb2.png')",
			},
		},
	},
	plugins: [],
};
