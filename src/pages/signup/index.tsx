import Link from 'next/link';
import Image from 'next/image';
import { useForm, FieldErrors } from 'react-hook-form';
import AuthInput from '@/components/common/Input/AuthInput';
import { VALIDATE_RULES } from '@/constants/validation';
import AuthButton from '@/components/common/Buttons/AuthButton';
import Taskify from '@/../../Public/assets/Taskify.svg';
import TaskifyImg from '@/../../Public/assets/TaskifyImage.svg';
import { useState } from 'react';
import { postUsers } from '@/lib/api';
import { useRouter } from 'next/router';

const isNoError = (obj: FieldErrors<SignupFormData>) => Object.keys(obj).length === 0;

type SignupFormData = {
	email: string;
	nickname: string;
	password: string;
	validPassword: string;
	checkbox: boolean;
};

export default function Signup() {
	const [loginError, setLoginError] = useState<string | null>(null);
	const router = useRouter();

	const {
		register,
		handleSubmit,
		//setError,
		formState: { errors },
		watch,
	} = useForm<SignupFormData>({
		mode: 'onBlur',
		defaultValues: {
			email: '',
			nickname: '',
			password: '',
			validPassword: '',
			checkbox: false,
		},
	});

	const INPUT_SETTING = {
		label: {
			email: '이메일',
			nickname: '닉네임',
			password: '비밀번호',
			validPassword: '비밀번호 확인',
			checkbox: '이용약관에 동의합니다.',
		},
		placeholder: {
			email: '이메일을 입력해 주세요.',
			nickname: '닉네임을 입력해 주세요.',
			password: '비밀번호를 입력해 주세요.',
			validPassword: '비밀번호를 한번 더 입력해 주세요.',
		},
	};

	const handleLogin = async (data: SignupFormData) => {
		try {
			const response = await postUsers(data as SignupFormData);
			console.log('회원가입 성공:', response);
			router.push('/login');
		} catch (error) {
			console.error('회원가입 실패:', error);
			setLoginError('회원가입 실패했습니다.');
			return loginError;
		}
	};

	const onSubmit = (data: SignupFormData) => {
		console.log(data);
		handleLogin(data);
	};

	return (
		<div className='grid translate-y-[10rem] place-items-center'>
			<Link href='/'>
				<div className='flex h-[22rem] w-[12.5rem] shrink-0 flex-col items-center justify-center gap-2  pl-[0.01rem]'>
					<Image alt='Taskify 로고 이미지' src={TaskifyImg} className='h-[15rem] w-[13rem] shrink-0' />
					<Image alt='Taskify 로고' src={Taskify} className='h-[3.4rem] w-[13rem] shrink-0' />
				</div>
			</Link>
			<p className='text-center text-12-500 text-black-3'>첫 방문을 환영합니다!</p>
			<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center gap-[6rem]'>
				<AuthInput
					type='email'
					required={!!VALIDATE_RULES.email?.required}
					label={INPUT_SETTING.label.email}
					placeholder={INPUT_SETTING.placeholder.email}
					errorMessage={errors?.email?.message}
					{...register('email', VALIDATE_RULES.email)}
					className='h-[4.81rem] w-[52rem] gap-2 sm:px-[8.2rem]'
				/>
				<AuthInput
					type='text'
					required={!!VALIDATE_RULES.nickname?.required}
					label={INPUT_SETTING.label.nickname}
					placeholder={INPUT_SETTING.placeholder.nickname}
					errorMessage={errors?.nickname?.message}
					{...register('nickname', VALIDATE_RULES.nickname)}
					className='h-[4.81rem] w-[52rem] gap-2 sm:px-[8.2rem]'
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
				<AuthInput
					type='password'
					required={!!VALIDATE_RULES.passwordInLogin?.required}
					label={INPUT_SETTING.label.validPassword}
					placeholder={INPUT_SETTING.placeholder.validPassword}
					errorMessage={errors?.validPassword?.message}
					{...register('validPassword', {
						...VALIDATE_RULES.passwordInSignup.pattern,
						validate: (value) => value === watch('password') || '비밀번호가 일치하지 않습니다.',
					})}
					className='h-[4.81rem] w-[52rem] gap-2 sm:px-[8.2rem]'
				/>
				<div className='sm:px-[8.2rem]'>
					<div className='flex translate-y-[-2rem] items-center '>
						<AuthInput
							className=' flex flex-row-reverse items-center justify-center gap-1'
							type='checkbox'
							label={INPUT_SETTING.label.checkbox}
							required={!!VALIDATE_RULES.checkboxSignup?.required}
							{...register('checkbox', VALIDATE_RULES.checkboxSignup)}
						/>
					</div>
					<div className='translate-y-[-4rem] text-14-400 text-red'>{errors?.checkbox?.message}</div>
				</div>
				<div className='flex translate-y-[-8rem] flex-col items-center justify-center'>
					<AuthButton disabled={!isNoError(errors)} type='submit'>
						가입하기
					</AuthButton>
					<p className='py-5 text-12-400 text-black-3'>
						이미 가입하셨나요?
						<Link href='/login' className='text-blue underline'>
							로그인 하기
						</Link>
					</p>
				</div>
			</form>
		</div>
	);
}
