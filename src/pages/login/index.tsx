import Link from 'next/link';
import Image from 'next/image';
import { useForm, FieldErrors } from 'react-hook-form';
import AuthInput from '@/components/common/Input/AuthInput';
import { VALIDATE_RULES } from '@/constants/validation';
import AuthButton from '@/components/common/Buttons/AuthButton';
import Taskify from '@/../../Public/assets/Taskify.svg';
import TaskifyImg from '@/../../Public/assets/TaskifyImage.svg';
import { postAuthLogin } from '@/lib/api';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/modal/Layout';
import Button from '@/components/common/Buttons/Button';
import { AxiosError } from 'axios';

const isNoError = (obj: FieldErrors<LoginFormData>) => Object.keys(obj).length === 0;

type LoginFormData = {
	email: string;
	password: string;
	message: string;
};

export default function Login() {
	const {
		register,
		handleSubmit,
		// setError,
		formState: { errors },
	} = useForm<LoginFormData>({
		mode: 'onBlur',
		defaultValues: {
			email: '',
			password: '',
		},
	});
	const [loginError, setLoginError] = useState<boolean>(false);
	const [loginErrorMessageState, setLoginErrorMessage] = useState<string | null>(null);
	const router = useRouter();

	const handleLogin = async (data: LoginFormData) => {
		try {
			const { ...response } = await postAuthLogin(data as LoginFormData);
			localStorage.setItem('accessToken', response.accessToken);
			router.push('/mydashboard');
		} catch (error) {
			if (error instanceof AxiosError) {
				const loginErrorMessage = error.response?.data.message;
				setLoginErrorMessage(loginErrorMessage);
			}
			setLoginError(true);
		}
	};

	useEffect(() => {
		const accessToken = localStorage.getItem('accessToken');
		if (accessToken) {
			router.push('/mydashboard');
		}
	}, [loginError]);

	const onSubmit = (data: LoginFormData) => {
		handleLogin(data);
	};

	const handleKeyPress = (e: { type: string; code: string }) => {
		// 엔터로 로그인하는 함수
		if (e.type === 'keypress' && e.code === 'Enter') {
			handleSubmit(onSubmit)();
		}
	};

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

	return (
		<>
			<div className='flex h-[68rem] w-[100%] flex-col items-center justify-center gap-[0.1rem] bg-gray-F'>
				<Link href='/'>
					<div className='flex h-[27.9rem] w-[20rem] flex-col items-end justify-center gap-[3.071rem] pb-[0.03947rem] pl-[0.114rem] pr-[0rem] pt-[0rem] '>
						<Image alt='Taskify 로고 이미지' src={TaskifyImg} className='h-[18.9rem] w-[16.4rem]' />
						<Image alt='Taskify 로고' src={Taskify} className='h-[5.5rem] w-[19.8rem]' />
					</div>
				</Link>
				<p className='pb-[2rem] text-center text-[2rem] text-black-3'>오늘도 만나서 반가워요 !</p>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='flex w-[100%] max-w-[52rem] flex-col gap-[0.8rem] px-[1.2rem] pt-0'
				>
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
						onKeyDown={handleKeyPress}
					/>
					<div className='pb-[1.2rem] pt-[1rem]'>
						<AuthButton disabled={!isNoError(errors)} type='submit' onClick={() => setLoginError(false)}>
							로그인
						</AuthButton>
					</div>
					<div className='flex flex-row items-center justify-center gap-[0.8rem]'>
						<p className='text-center text-16-400 text-black-3'>회원이 아니신가요?</p>
						<Link href='/signup' className='text-center text-16-400 text-violet-5 underline'>
							<span>회원가입하기</span>
						</Link>
					</div>
				</form>
			</div>
			<Layout $modalType='Modal' isOpen={loginError} setOpen={setLoginError}>
				<div className='flex flex-col gap-[4.5rem]'>
					<p className='text-center text-18-500'>{loginErrorMessageState}</p>
					<div className='flex flex-row justify-end gap-[1.2rem]'>
						<Button
							onClick={() => {
								setLoginError(false);
							}}
							color='violet'
							disabled={false}
							variant='modal'
						>
							확인
						</Button>
					</div>
				</div>
			</Layout>
		</>
	);
}
