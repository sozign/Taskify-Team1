import { HTMLProps, forwardRef, useState } from 'react';
import Image from 'next/image';
import ErrorMessage from './ErrorMessage';

interface InputProps extends HTMLProps<HTMLInputElement> {
	required: boolean;
	errorMessage?: string | undefined;
	type: 'password' | 'text' | 'email';
}

const AuthInput = forwardRef<HTMLInputElement, InputProps>(
	({ label, errorMessage, type, className, ...props }, ref) => {
		const [inputType, setInputType] = useState<'password' | 'text' | 'email'>(type);

		const handleClickToggle = () => {
			if (inputType === 'text') setInputType('password');
			if (inputType === 'password') setInputType('text');
		};

		const IMG_PATH = {
			password: '/assets/eye_off.svg',
			text: '/assets/eye_on.svg',
			email: '',
		};

		let hasToBeToggled = false;
		if (type === 'password') hasToBeToggled = true;

		let borderColor = 'focus:outline-violet-5';
		if (errorMessage?.length) borderColor = 'focus:outline-red';

		return (
			<div className={className}>
				<p className='text-18-500'>{label}</p>
				<div className='relative'>
					<input
						className={`${borderColor} container mt-[1rem] h-[5rem] rounded-[0.8rem] border-[0.1rem] border-gray-D bg-white px-[1.5rem] py-[1.2rem] text-16-400 placeholder:text-gray-D`}
						type={inputType}
						ref={ref}
						{...props}
					/>
					{hasToBeToggled && (
						<button type='button' onClick={handleClickToggle}>
							<Image
								className='absolute bottom-[1.3rem] right-[1.6rem]'
								width={22}
								height={22}
								src={IMG_PATH[inputType]}
								alt='비밀번호 토글 버튼 아이콘'
							/>
						</button>
					)}
				</div>
				<ErrorMessage errorMessage={errorMessage} />
			</div>
		);
	},
);

AuthInput.displayName = 'AuthInput';

export default AuthInput;
