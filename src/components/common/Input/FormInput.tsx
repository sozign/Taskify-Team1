import { FieldValues, UseControllerProps, useController } from 'react-hook-form';
import ErrorMessage from './ErrorMessage';
import { twMerge } from 'tailwind-merge';

interface FormInputProps<T extends FieldValues> extends UseControllerProps<T> {
	label: string;
	className?: string;
	required: boolean;
}

export default function FormInput<T extends FieldValues>({
	label,
	className,
	name,
	required,
	control,
	rules,
}: FormInputProps<T>) {
	const {
		fieldState: { error },
		field,
	} = useController({ name, control, shouldUnregister: true, rules: { required, ...rules } });

	const hasError = !!(error ?? '');
	const commonStyle =
		'container mt-[1rem] h-[5rem] rounded-[0.8rem] border border-gray-D bg-white px-[1.5rem] py-[1.2rem] align-top text-16-400 placeholder:mt-0 placeholder:text-gray-D';
	const borderColor = error ?? '' ? 'focus:outline-red' : 'focus:outline-violet-5';

	let inputComponent;
	switch (label) {
		case '설명':
			inputComponent = <textarea className={twMerge(borderColor, commonStyle, 'h-[9.6rem]')} {...field} />;
			break;
		default:
			inputComponent = <input className={twMerge(borderColor, commonStyle)} {...field} />;
			break;
	}

	return (
		<div className={className}>
			<p className='text-18-500 leading-[2.1rem] sm:leading-[1.9rem]'>
				{label}
				{required && <span className='text-violet-5'> *</span>}
			</p>
			{inputComponent}
			{hasError && <ErrorMessage errorMessage={error?.message} />}
		</div>
	);
}
