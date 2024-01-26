import { ReactNode } from 'react';

type Color = 'violet' | 'gray';

interface SquareChipProps {
	color: Color;
	className?: string;
	onClick?: () => void;
	children: ReactNode;
}

function SquareChip({ color, className, children }: SquareChipProps) {
	let combinedClassName = '';

	switch (color) {
		case 'gray':
			combinedClassName +=
				' flex justify-center items-center w-[2rem] h-[2rem] rounded-[0.4rem] text-12-600 text-gray-7 py-[0.3rem] bg-gray-E ';
			break;
		case 'violet':
			combinedClassName +=
				' flex justify-center items-center w-[2.2rem] h-[2.2rem] rounded-[0.4rem] px-[0.3rem] py-[0.3rem] bg-violet-F ';
			break;
	}

	return <div className={`${combinedClassName} ${className}`}>{children}</div>;
}

export default SquareChip;
