import { ForwardedRef, HTMLProps, forwardRef } from 'react';
import ErrorMessage from './ErrorMessage';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

interface InputProps extends HTMLProps<HTMLInputElement | HTMLTextAreaElement> {
	required: boolean;
	errorMessage?: string | undefined;
}

const FormInput = forwardRef<HTMLElement, InputProps>(({ label, errorMessage, required, className, ...props }, ref) => {
	const isTextArea = label === '설명';

	const commonStyle =
		'container mb-[0.8rem] mt-[1rem] h-[5rem] rounded-[0.8rem] border border-gray-D bg-white px-[1.5rem] py-[1.2rem] align-top text-16-400 placeholder:mt-0 placeholder:text-gray-D';
	const borderColor = errorMessage?.length ? 'focus:outline-red' : 'focus:outline-violet-5';

	return (
		<div className={className}>
			<p className='text-18-500'>
				{label}
				{required && <span className='text-violet-5'> *</span>}
			</p>

			{isTextArea ? (
				<textarea
					className={twMerge(borderColor, commonStyle, 'h-[9.6rem]')}
					{...props}
					ref={ref as ForwardedRef<HTMLTextAreaElement>}
				/>
			) : (
				<input className={twMerge(borderColor, commonStyle)} {...props} ref={ref as ForwardedRef<HTMLInputElement>} />
			)}
			<ErrorMessage errorMessage={errorMessage} />
		</div>
	);
});

FormInput.displayName = 'Input';
export default FormInput;
