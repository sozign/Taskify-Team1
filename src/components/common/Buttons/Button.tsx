import React, { ReactNode } from 'react';

type Color = 'violet' | 'white' | 'modalWhite' | 'modalViolet';
type Variant = 'delete-lg' | 'delete-sm' | 'confirm' | 'commentInput' | 'modal';

interface ButtonProps {
	type?: 'submit' | undefined;
	color: Color;
	variant: Variant;
	className?: string;
	onClick?: () => void;
	children: ReactNode;
}

function Button({ type, color, className, onClick, children, variant }: ButtonProps) {
	let combinedClassName = '';

	switch (color) {
		case 'violet':
			combinedClassName += ' flex justify-center items-center rounded-md bg-violet-5 text-white ';
			break;
		case 'white':
			combinedClassName +=
				' border border-[gray-D] flex justify-center items-center rounded-md bg-white text-violet-5 ';
			break;

		case 'modalViolet':
			combinedClassName += ' flex justify-center items-center rounded-lg bg-violet-5 text-white ';
			break;

		case 'modalWhite':
			combinedClassName += ' border border-[gray-D] flex justify-center items-center rounded-lg bg-white text-gray-7 ';
			break;
	}
	switch (variant) {
		case 'delete-lg':
			combinedClassName += ' w-[8.4rem] h-[3.2rem] text-14-500 ';
			break;
		case 'delete-sm':
			combinedClassName += ' w-[5.2rem] h-[2.8rem] text-12-500 ';
			break;
		case 'confirm':
			combinedClassName +=
				' w-[8.4rem] h-[3.2rem] text-14-500 md:w-[7.2rem] md:h-[3rem] sm:w-[10.9rem] sm:h-[2.8rem] text-12-500  ';
			break;
		case 'commentInput':
			combinedClassName +=
				' w-[8.3rem] h-[3.2rem] text-14-500 md:w-[7.747rem] md:h-[3.2rem] sm:w-[8.4rem] sm:h-[2.8rem]  ';
			break;
		case 'modal':
			combinedClassName += ' w-[12rem] h-[4.8rem] text-16-500 sm: text-14-500 sm:w-[13.8rem] sm:h-[4.2rem] ';
			break;
	}

	return (
		<button type={type || 'button'} className={`${combinedClassName} ${className}`} onClick={onClick}>
			{children}
		</button>
	);
}

export default Button;
