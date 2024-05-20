/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}', 'index.html', 'node_modules/flowbite-react/lib/esm/**/*.js'],
	theme: {
		extend: {
			cursor: {
				pencil: 'url(../src/assets/cursor/pencil.cur), pointer',
				highlight: 'url(../src/assets/cursor/highlight.cur), pointer',
				eraser: 'url(../src/assets/cursor/eraser.cur), pointer',
			}
		},
		fontFamily: {
			nanumSquareNeo: ['NanumSquareNeo'],
			snowTimes: ['SnowTimes'],
			flubber: ['Flubber'],
			nicolast: ['Nicolast'],
		},
		colors: {
			primary: {
				50: '#EDFAFA',
				100: '#D5F5F6',
				200: '#AFECEF',
				300: '#7EDCE2',
				400: '#16BDCA',
				500: '#0694A2',
				600: '#047481',
				700: '#036672',
				800: '#05505C',
				900: '#014451',
			},
			orange: {
				50: '#FFFAF0',
				100: '#FEEBC8',
				200: '#FBD38D',
				300: '#F6AD55',
				400: '#ED8936',
				500: '#DD6B20',
				600: '#C05621',
				700: '#9C4221',
				800: '#7B341E',
				900: '#652B19',
			},
			positive: {
				50: '#F0FFF4',
				100: '#C6F6D5',
				200: '#9AE6B4',
				300: '#68D391',
				400: '#48BB78',
				500: '#38A169',
				600: '#2F855A',
				700: '#276749',
				800: '#22543D',
				900: '#1C4532',
			},
			negative: {
				50: '#FFF5F5',
				100: '#FED7D7',
				200: '#FEB2B2',
				300: '#FC8181',
				400: '#F56565',
				500: '#E53E3E',
				600: '#C53030',
				700: '#9B2C2C',
				800: '#822727',
				900: '#63171B',
			},
			tag: {
				50: '#EDEBFE',
				100: '#6535BB',
			},
		},
	},
	plugins: [require('flowbite/plugin')],
};
