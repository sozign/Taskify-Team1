import React, { ReactNode } from 'react';

function Button({ children }: { children: ReactNode }) {
	type Color = 'mint' | 'white' | 'gray';
	type Size = 'sm' | 'md' | 'lg';

	interface ButtonProps {
		type?: 'submit' | undefined; // type이 undefined인 경우에는 'button'으로 지정
		color: Color;
		size: Size;
		className?: string; // 추가로 적용하고 싶은 className이 있을 경우 사용
		onClick?: () => void;
		children: ReactNode; // children 속성에는 string 뿐만 아니라 <svg> 요소가 포함될 수도 있어서 ReactNode 타입을 사용했다.
	}

	function Button({ type, color, size, className, onClick, children }: ButtonProps) {
		let combinedClassName = ''; // 이 변수에 className을 중첩시킨다.

		switch (color) {
			case 'mint': {
				combinedClassName =
					'mr-2 rounded-lg border border-mint bg-mint font-semibold text-white hover:bg-hover-mint focus:ring-ring-mint';
				break;
			}
			case 'white': {
				combinedClassName =
					'mr-2 rounded-lg border border-mint bg-transparent font-semibold text-mint  hover:bg-gray-100 focus:ring-gray-300';
				break;
			}
			case 'gray': {
				combinedClassName =
					'inline-flex items-center rounded-lg border border-gray-300 bg-white text-center font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-gray-200';
				break;
			}
		}

		switch (size) {
			case 'sm': {
				combinedClassName += ' py-1.5 px-3 text-sm focus:ring-4';
				break;
			}
			case 'md': {
				combinedClassName += ' py-2 px-4 text-sm focus:ring-2';
				break;
			}
			case 'lg': {
				combinedClassName += ' py-2 px-4 text-base focus:ring-4';
				break;
			}
		}
	}

	return (
		<div className='flex justify-center items-center w-[52rem] h-[5rem] rounded-lg bg-[#5534da]'>
			<p className='text-18-500 text-center text-white'>{children}</p>
		</div>
	);
}

export default Button;
