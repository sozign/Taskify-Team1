import Link from 'next/link';
import Image from 'next/image';
import { useForm, FieldErrors } from 'react-hook-form';
import AuthInput from '@/components/common/Input/AuthInput';
import { VALIDATE_RULES } from '@/constants/validation';
import AuthButton from '@/components/common/Buttons/AuthButton';
import Taskify from '@/../../public/assets/Taskify.svg';
import TaskifyImg from '@/../../public/assets/TaskifyImage.svg';
import { useState } from 'react';
import { postUsers } from '@/lib/api';
import { useRouter } from 'next/router';
import Layout from '@/components/modal/Layout';
import Button from '@/components/common/Buttons/Button';
import { AxiosError } from 'axios';

const isNoError = (obj: FieldErrors<SignupFormData>) => Object.keys(obj).length === 0;

type SignupFormData = {
	email: string;
	nickname: string;
	password: string;
	validPassword: string;
	checkbox: boolean;
};

export default function Signup() {
	const [signupErrorState, setSignupErrorState] = useState<boolean>(false);
	const [signupAlertState, setSignupAlertState] = useState<string | null>(null);
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

	const handleSignup = async (data: SignupFormData) => {
		try {
			await postUsers(data as SignupFormData);
			setSignupAlertState('가입이 완료되었습니다!');
		} catch (error) {
			if (error instanceof AxiosError) {
				const loginErrorMessage: string = error.response?.data.message;
				setSignupAlertState(loginErrorMessage);
			}
			setSignupErrorState(true);
		}
	};

	const onSubmit = (data: SignupFormData) => {
		handleSignup(data);
	};

	const handleKeyPress = (e: { type: string; code: string }) => {
		if (e.type === 'keypress' && e.code === 'Enter') {
			e.type = 'click';
		}
	};

	return (
		<>
			<div className='flex h-full min-h-[100vh] w-[100%] flex-col items-center justify-center gap-[0.1rem] bg-gray-F '>
				<Link href='/'>
					<div className='flex h-[27.9rem] w-[20rem] flex-col items-end justify-center gap-[3.071rem] pb-[0.03947rem] pl-[0.114rem] pr-[0rem] pt-[0rem] '>
						<Image alt='Taskify 로고 이미지' src={TaskifyImg} className='h-[18.9rem] w-[16.4rem]' />
						<Image alt='Taskify 로고' src={Taskify} className='h-[5.5rem] w-[19.8rem]' />
					</div>
				</Link>
				<p className='text-center text-[2rem] text-black-3'>첫 방문을 환영합니다 !</p>
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
						type='text'
						required={!!VALIDATE_RULES.nickname?.required}
						label={INPUT_SETTING.label.nickname}
						placeholder={INPUT_SETTING.placeholder.nickname}
						errorMessage={errors?.nickname?.message}
						{...register('nickname', VALIDATE_RULES.nickname)}
					/>
					<AuthInput
						type='password'
						required={!!VALIDATE_RULES.passwordInLogin?.required}
						label={INPUT_SETTING.label.password}
						placeholder={INPUT_SETTING.placeholder.password}
						errorMessage={errors?.password?.message}
						{...register('password', VALIDATE_RULES.passwordInLogin)}
					/>
					<AuthInput
						type='password'
						required={!!VALIDATE_RULES.passwordInLogin?.required}
						label={INPUT_SETTING.label.validPassword}
						placeholder={INPUT_SETTING.placeholder.validPassword}
						errorMessage={errors?.validPassword?.message}
						onKeyDown={handleKeyPress}
						{...register('validPassword', {
							...VALIDATE_RULES.passwordInSignup.pattern,
							validate: (value) => value === watch('password') || '비밀번호가 일치하지 않습니다.',
						})}
					/>
					<div className='flex items-center gap-[0.8rem] py-[1.2rem]'>
						<input
							type='checkbox'
							required={!!VALIDATE_RULES.checkboxSignup?.required}
							{...register('checkbox', VALIDATE_RULES.checkboxSignup)}
							className='h-[2rem] w-[2rem] rounded-[0.4rem] border-gray-D bg-white'
						/>
						<label className='items-center text-center text-16-400 text-black-3'>이용약관에 동의합니다.</label>
					</div>
					<div className='text-14-400 text-red'>{errors?.checkbox?.message}</div>
					<div className='pb-[1.2rem] pt-[1rem]'>
						<AuthButton disabled={!isNoError(errors)} type='submit' onClick={() => setSignupErrorState(false || true)}>
							가입하기
						</AuthButton>
					</div>
					<div className='flex flex-row items-center justify-center gap-[0.8rem]'>
						<p className='text-center text-16-400 text-black-3'>이미 가입하셨나요?</p>
						<Link href='/login' className='text-center text-16-400 text-violet-5 underline'>
							<span>로그인하기</span>
						</Link>
					</div>
				</form>
			</div>
			<Layout $modalType='Modal' isOpen={signupErrorState} setOpen={setSignupErrorState}>
				<div className='flex flex-col gap-[4.5rem]'>
					<p className='text-center text-18-500'>{signupAlertState}</p>
					<div className='flex flex-row justify-end gap-[1.2rem]'>
						<Button
							onClick={() => {
								signupAlertState === '가입이 완료되었습니다!' ? router.push('/login') : setSignupErrorState(false);
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
