import { ReactNode } from 'react';

type Color = 'violet' | 'gray';

interface SquareChipProps {
	color: Color;
	className?: string;
	onClick?: () => void;
	children: ReactNode;
}

function SquareChip({ color, className, children, onClick }: SquareChipProps) {
	let combinedClassName = '';

	switch (color) {
		case 'gray':
			combinedClassName +=
				' flex justify-center items-center w-[2rem] h-[2rem] rounded-[0.4rem] text-12-600 text-gray-7 py-[0.3rem] bg-gray-E ';
			break;
		case 'violet':
			combinedClassName +=
				' flex justify-center items-center w-[2.2rem] h-[2.2rem] rounded-[0.4rem] bg-violet-F sm:w-[2rem] sm:h-[2rem] relative';
			break;
	}

	return (
		<div onClick={onClick} className={`${combinedClassName} ${className}`}>
			{children}
		</div>
	);
}

export default SquareChip;
