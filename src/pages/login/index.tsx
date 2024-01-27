import Link from 'next/link';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import AuthInput from '@/components/common/Input/AuthInput';
import { VALIDATE_RULES } from '@/constants/validation';
import AuthButton from '@/components/common/Buttons/AuthButton';
import Taskify from '@/../../Public/assets/Taskify.svg';
import TaskifyImg from '@/../../Public/assets/TaskifyImage.svg';
import axios from 'axios';
import { postAuthLogin } from '@/lib/api';
import { useRouter } from 'next/router';

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

	const router = useRouter();

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
		router.push('/mydashboard');
	};

	return (
		<div className='grid translate-y-[17rem] place-items-center'>
			<Link href='/'>
				<div className='flex h-[22rem] w-[12.5rem] shrink-0 flex-col items-center justify-center gap-2  pl-[0.01rem]'>
					<Image alt='Taskify 로고 이미지' src={TaskifyImg} className='h-[15rem] w-[13rem] shrink-0' />
					<Image alt='Taskify 로고' src={Taskify} className='h-[3.4rem] w-[13rem] shrink-0' />
				</div>
			</Link>
			<p className='text-center text-12-500 text-black-3'>오늘도 만나서 반가워요 !</p>
			<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center gap-[6rem]'>
				<AuthInput
					type='email'
					required={!!VALIDATE_RULES.email?.required}
					label={INPUT_SETTING.label.email}
					placeholder={INPUT_SETTING.placeholder.email}
					errorMessage={errors?.email?.message}
					{...register('email', VALIDATE_RULES.email)}
					className='h-[4.81rem] w-[52rem] gap-2  sm:px-[8.2rem]'
				/>

				<AuthInput
					type='password'
					required={!!VALIDATE_RULES.passwordInLogin?.required}
					label={INPUT_SETTING.label.password}
					placeholder={INPUT_SETTING.placeholder.password}
					errorMessage={errors?.password?.message}
					{...register('password', VALIDATE_RULES.passwordInLogin)}
					className='h-[4.81rem] w-[52rem] gap-2 sm:px-[8.2rem]'
				/>
				<AuthButton disabled={false} type='submit'>
					로그인
				</AuthButton>
			</form>
			<p className='py-5 text-12-400 text-black-3'>
				회원이 아니신가요?
				<Link href='/signup' className='underline'>
					회원가입하기
				</Link>
			</p>
		</div>
	);
}
