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
				' w-[2rem] h-[2rem] flex justify-center items-center rounded bg-violet-5 text-white px-[0.6rem] py-[0.3rem] bg-gray-E ';
			break;
		case 'violet':
			combinedClassName +=
				' w-[2.2rem] w-[2.2rem] flex justify-center items-center px-[0.662rem] py-[0.563rem] rounded bg-violet-F ';
			break;
	}

	return <div className={`${combinedClassName} ${className}`}>{children}</div>;
}

export default SquareChip;
