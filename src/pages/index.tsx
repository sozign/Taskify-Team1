import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import FormInput from '@/components/common/Input/FormInput';

interface FormInput {
	firstName: string;
	lastName: string;
	age: number;
}

const RULES = {
	firstName: {
		required: '필수값 입니다.',
		maxLength: { value: 20, message: '최대 20자를 넘을 수 없습니다.' },
	},
	lastName: {
		pattern: { value: /^[A-Za-z]+$/i, message: '알파벳만 가능합니다.' },
	},
	age: {
		min: { value: 18, message: '18 미만의 값을 입력할 수 없습니다.' },
		max: { value: 99, message: '99 초과의 값을 입력할 수 없습니다.' },
	},
};

export default function App() {
	const { control, handleSubmit } = useForm<FormInput>();
	const onSubmit: SubmitHandler<FormInput> = (data) => console.log(data);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Controller
				defaultValue={''}
				name='firstName'
				control={control}
				rules={RULES.firstName}
				render={({ field: { ref, value, onChange }, fieldState: { error } }) => (
					<>
						<FormInput
							required={!!('required' in RULES.firstName)}
							placeholder='제목을 입력해주세요'
							label='라벨명'
							ref={ref}
							value={value}
							onChange={onChange}
							errorMessage={error?.message}
						/>
					</>
				)}
			/>
			<Controller
				defaultValue={''}
				name='lastName'
				control={control}
				rules={RULES.lastName}
				render={({ field: { ref, value, onChange }, fieldState: { error } }) => (
					<>
						<FormInput
							required={!!('required' in RULES.lastName)}
							placeholder='제목을 입력해주세요'
							label='라벨명'
							ref={ref}
							value={value}
							onChange={onChange}
							errorMessage={error?.message}
						/>
					</>
				)}
			/>

			<Controller
				defaultValue={0}
				name='age'
				control={control}
				rules={RULES.age}
				render={({ field: { ref, value, onChange }, fieldState: { error } }) => (
					<>
						<FormInput
							required={!!('required' in RULES.age)}
							placeholder='제목을 입력해주세요'
							label='라벨명'
							ref={ref}
							type='number'
							value={value}
							onChange={onChange}
							errorMessage={error?.message}
						/>
					</>
				)}
			/>
			<input type='submit' />
		</form>
	);
}
