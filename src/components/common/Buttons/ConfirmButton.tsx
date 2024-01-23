import React, { ReactNode } from 'react';

type Color = 'violet' | 'white';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
	type?: 'submit' | undefined; // type이 undefined인 경우에는 'button'으로 지정
	color: Color;
	size: Size;
	className?: string; // 추가로 적용하고 싶은 className이 있을 경우 사용
	onClick?: () => void;
	children: ReactNode; // children 속성에는 string 뿐만 아니라 <svg> 요소가 포함될 수도 있어서 ReactNode 타입을 사용했다.
}

function ConfirmButton({ type, color, className, onClick, children }: ButtonProps) {
	let combinedClassName = '';

	switch (color) {
		case 'violet':
			combinedClassName = 'flex justify-center items-center rounded-lg bg-violet-5 text-white';
			break;
		case 'white':
			combinedClassName = 'flex justify-center items-center rounded-lg bg-white text-violet-5';
			break;
	}

	return (
		<button
			type={type || 'button'}
			className={`${combinedClassName} ${className} h-[3.2rem] w-[8.4rem] text-14-500 md:h-[3rem] md:w-[7.2rem] sm:h-[2.8rem] sm:w-[10.9rem] sm:text-12-500`}
			onClick={onClick}
		>
			{children}
		</button>
	);
}

export default ConfirmButton;
