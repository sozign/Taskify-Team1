import { ReactNode } from 'react';

interface ButtonProps {
	type?: 'submit' | undefined;
	onClick?: () => void;
	children: ReactNode;
	disabled?: boolean;
}

function AuthButton({ type, onClick, children, disabled = true }: ButtonProps) {
	const authButton = `flex justify-center items-center w-[100%] h-[5rem] rounded-lg ${disabled ? 'bg-gray-D' : 'bg-violet-5'} text-center text-18-500 text-white`;

	return (
		<button disabled={disabled} type={type || 'button'} className={authButton} onClick={onClick}>
			{children}
		</button>
	);
}

export default AuthButton;
