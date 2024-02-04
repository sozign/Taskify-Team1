import clsx from 'clsx';
import { ReactNode } from 'react';

function StatusChip({ value, className }: { value: ReactNode; className?: string }) {
	return (
		<div
			className={clsx(
				className,
				'flex h-[2.2rem] w-fit  items-center justify-center gap-[0.4rem] rounded-[1.1rem] bg-violet-F px-[0.8rem] sm:h-[2rem]  sm:gap-[0.3rem]',
			)}
		>
			<div className='h-[0.6rem] w-[0.6rem] rounded-full bg-violet-5'></div>
			<div className='sm:text-10-500 text-12-500 text-violet-5'>{value}</div>
		</div>
	);
}

export default StatusChip;
