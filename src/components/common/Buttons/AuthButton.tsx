import React, { ReactNode } from 'react';

interface ButtonProps {
	type?: 'submit' | undefined;
	onClick?: () => void;
	children: ReactNode;
	isDisabled?: boolean;
}

function AuthButton({ type, onClick, children, isDisabled = true }: ButtonProps) {
	const authButton = `flex justify-center items-center w-[52rem] h-[5rem] rounded-lg ${isDisabled ? 'bg-gray-D' : 'bg-violet-5'} text-center text-18-500 text-white sm:w-[35.1rem] sm:h-[5rem]`;

	return (
		<button type={type || 'button'} className={authButton} onClick={onClick}>
			{children}
		</button>
	);
}

export default AuthButton;
