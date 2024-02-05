function BarsSpinner({ className, size }: { className?: string; size?: number }) {
	return (
		<div className={className} aria-label='Loading...' role='status'>
			<svg
				width={`${size}rem` || '2.4rem'}
				height={`${size}rem` || '2.4rem'}
				fill='none'
				stroke='currentColor'
				strokeWidth='1.5'
				viewBox='0 0 24 24'
				strokeLinecap='round'
				strokeLinejoin='round'
				xmlns='http://www.w3.org/2000/svg'
				className='animate-spin stroke-slate-500'
			>
				<path d='M12 3v3m6.366-.366-2.12 2.12M21 12h-3m.366 6.366-2.12-2.12M12 21v-3m-6.366.366 2.12-2.12M3 12h3m-.366-6.366 2.12 2.12'></path>
			</svg>
		</div>
	);
}

export default BarsSpinner;
