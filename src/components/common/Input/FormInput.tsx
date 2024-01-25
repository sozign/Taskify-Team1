import { HTMLProps, forwardRef } from 'react';
import ErrorMessage from './ErrorMessage';

interface InputProps extends HTMLProps<HTMLInputElement> {
	required: boolean;
	errorMessage?: string | undefined;
}

const FormInput = forwardRef<HTMLInputElement, InputProps>(({ label, errorMessage, required, ...props }, ref) => {
	return (
		<>
			<p className='text-18-500'>
				{label}
				{required && <span className='text-violet-5'> *</span>}
			</p>
			<input
				className='container mt-[1rem] h-[5rem] rounded-[0.8rem] border border-gray-D bg-white px-[1.5rem] py-[1.2rem] placeholder:text-16-400 placeholder:text-gray-D'
				ref={ref}
				{...props}
			/>
			<ErrorMessage errorMessage={errorMessage} />
		</>
	);
});

FormInput.displayName = 'Input';
export default FormInput;
