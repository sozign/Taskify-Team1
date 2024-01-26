import clsx from 'clsx';
import { ReactNode } from 'react';

type Color = 'orange' | 'green' | 'pink' | 'blue' | 'gray';

const colorList = {
	orange: { bg: 'bg-amber-50', text: 'text-amber-400' },
	green: { bg: 'bg-emerald-50', text: 'text-emerald-400' },
	pink: { bg: 'bg-pink-50', text: 'text-pink-400' },
	blue: { bg: 'bg-blue-50', text: 'text-blue-400' },
	gray: { bg: 'bg-gray-E', text: 'text-gray-7' },
};

function TagChip({ color = 'gray', children }: { color: Color; children: ReactNode }) {
	return (
		<div className={clsx('w-fit rounded-[0.4rem] px-[0.6rem] py-[0.4rem]', colorList[color]?.bg)}>
			<p className={clsx('text-center text-18-500 sm:text-12-500', colorList[color]?.text)}>{children}</p>
		</div>
	);
}

export default TagChip;
