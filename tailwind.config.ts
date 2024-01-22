import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		screens: {
			md: { max: '1200px' },
			// => @media (max-width: 767px) { ... }
			sm: { max: '676px' },
			// => @media (max-width: 639px) { ... }
		},
		fontSize: {
			// 폰트 굵기, 높이, 줄간격, 굵기 등을 묶어서 하나의 스타일로 저장 가능
			// <p class="text-2xl ...">The quick brown fox ...</p> 처럼 사용
			'2xl': [
				'1.5rem', // 폰트 크기
				{
					lineHeight: '2rem',
					letterSpacing: '-0.01em',
					fontWeight: '500',
				},
			],
			'3xl': [
				'1.875rem', // 폰트 크기
				{
					lineHeight: '2.25rem',
					letterSpacing: '-0.02em',
					fontWeight: '700',
				},
			],
		},
		extend: {
			backgroundImage: {
				// 자주 사용하는 그라데이션 속성,
				// 예시) <p className="bg-gradient-radial">
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			fontFamily: {
				// 예시) <p className="text-pretendard">
				pretendard: ['Pretendard-Regular'],
			},
			colors: {
				black: {
					DEFAULT: '#000000',
					1: '#171717',
					2: '#333236',
					3: '#4B4B4B',
				},
				gray: {
					DEFAULT: '#787486',
					1: '#9FA6B2',
					2: '#D9D9D9',
					3: '#EEEEEE',
					4: '#FAFAFA',
				},
				white: {
					DEFAULT: '#FFFFFF',
				},
				violet: {
					DEFAULT: '#5534DA',
					1: '#F1EFFD',
				},
				red: {
					DEFAULT: '#D6173A',
				},
				green: {
					DEFAULT: '#7AC555',
				},
				purple: {
					DEFAULT: '#760DDE',
				},
				orange: {
					DEFAULT: '#FFA500',
				},
				blue: {
					DEFAULT: '#76A5EA',
				},
				pink: {
					DEFAULT: '#E876EA',
				},
				// 컬러픽 작성
				// blue100: '#ECF6FF',
				// blue101: '#F2FBFE',
				// blue200: '#2D9CDB',
				// blue300: '#2F80ED',
			},
		},
	},
	plugins: [],
};
export default config;
