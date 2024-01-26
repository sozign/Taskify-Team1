import { useForm } from 'react-hook-form';
import AuthInput from '@/components/common/Input/AuthInput';
import { VALIDATE_RULES } from '@/constants/validation';

type SigninFormData = {
	email: string;
	password: string;
};

export default function Login() {
	const {
		register,
		handleSubmit,
		// setError,
		formState: { errors },
	} = useForm<SigninFormData>({
		mode: 'onBlur',
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const INPUT_SETTING = {
		label: {
			email: '이메일',
			password: '비밀번호',
		},
		placeholder: {
			email: '이메일을 입력해 주세요.',
			password: '비밀번호를 입력해 주세요.',
		},
	};

	const onSubmit = (data: SigninFormData) => {
		console.log(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<AuthInput
				type='email'
				required={!!VALIDATE_RULES.email?.required}
				label={INPUT_SETTING.label.email}
				placeholder={INPUT_SETTING.placeholder.email}
				errorMessage={errors?.email?.message}
				{...register('email', VALIDATE_RULES.email)}
			/>

			<AuthInput
				type='password'
				required={!!VALIDATE_RULES.passwordInLogin?.required}
				label={INPUT_SETTING.label.password}
				placeholder={INPUT_SETTING.placeholder.password}
				errorMessage={errors?.password?.message}
				{...register('password', VALIDATE_RULES.passwordInLogin)}
			/>
			<button>로그인하기</button>
		</form>
	);
}
