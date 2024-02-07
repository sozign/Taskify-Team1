import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { putAuthPassword } from '@/lib/api';
import PasswordInput from '../common/Input/PasswordInput';
import MyPagePassWordModal from '../modal/MyPagePassWordModal';
import MyPageConfirmModal from '../modal/MyPageConfirmModal';

type passwordFormData = {
	password: string;
	newPassword: string;
	verifyPassword: string;
};

function PassWord() {
	const [open, setOpen] = useState<boolean>(false);
	const [confirm, setConfirm] = useState<boolean>(false);

	const {
		register,
		getValues,
		handleSubmit,
		watch,
		// setError,
		// clearErrors,
		reset,
		formState: { errors, isValid },
	} = useForm<passwordFormData>({
		mode: 'onChange',
		defaultValues: {
			password: '',
			newPassword: '',
			verifyPassword: '',
		},
	});

	//api 바뀐 비밀 번호 put
	const putPasswordSubmit = async () => {
		console.log('제출됨');
		try {
			const data = getValues();
			const { password, newPassword } = data;

			// async;
			const response = await putAuthPassword({ password, newPassword });

			// if (response === 200) {
			// 	await handleSubmit(async () => {
			// 		await putAuthPassword({ password, newPassword });
			// 		setConfirm(true);
			// 	})();
			// }

			if (response === 204) {
				setConfirm(true); // 비밀번호 변경 성공 시 확인 모달 열기
				reset(); // 폼 초기화
			}
		} catch (error) {
			console.error(error);
			setOpen(true);
		}
	};

	useEffect(() => {
		// if (watch('newPassword') !== watch('verifyPassword')) {
		// 	setError('newPassword', {
		// 		type: 'password-mismatch',
		// 		message: '비밀번호가 일치하지 않습니다',
		// 	});
		// } else {
		// 	// 비밀번호 일치시 오류 제거
		// 	clearErrors('newPassword');
		// }
	}, [watch('password'), watch('newPassword'), watch('verifyPassword')]);

	return (
		<>
			<div className=' mt-[1.2rem] h-[45.4rem] w-[62rem] rounded-lg bg-white md:w-[54.4rem] sm:w-[28.4rem]'>
				<p className='ml-[2.8rem] py-[3.2rem] text-[2.4rem] font-bold text-[#333236] sm:ml-[2rem] sm:pb-[2.8rem] sm:pt-[2.8rem] sm:text-20-700 sm:text-[2rem]'>
					비밀번호 변경
				</p>
				<form
					className='ml-[2.8rem] w-[56.4rem] md:w-[48.8rem] sm:ml-[2rem] sm:w-[24.4rem]'
					onSubmit={handleSubmit(putPasswordSubmit)}
				>
					<PasswordInput
						type='password'
						label='현재 비밀번호'
						placeholder='현재 비밀번호 입력'
						{...register('password', {
							required: '현재 비밀번호를 입력하세요.',
							pattern: {
								value: /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/,
								message: '비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요.',
							},
						})}
						errorMessage={errors.password && String(errors.password.message)}
					/>
					<div className='mt-[2rem]'>
						<PasswordInput
							type='password'
							label='새 비밀번호'
							placeholder='새 비밀번호 입력'
							{...register('newPassword', {
								required: '새 비밀번호를 입력하세요.',
								pattern: {
									value: /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/,
									message: '비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요.',
								},
								validate: (value: string) => {
									if (value === watch('password')) {
										return '현재와 다른 비밀번호를 입력하세요.';
									}
								},
							})}
							errorMessage={errors.newPassword && String(errors.newPassword.message)}
						/>
					</div>
					<div className='mt-[2rem]'>
						<PasswordInput
							type='password'
							label='새 비밀번호 확인'
							placeholder='새 비밀번호 입력'
							{...register('verifyPassword', {
								required: '새 비밀번호를 입력하세요.',
								pattern: {
									value: /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/,
									message: '비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요.',
								},
								validate: (value: string) => {
									if (value !== watch('newPassword')) {
										return '비밀번호가 일치하지 않습니다.';
									}
								},
							})}
							errorMessage={errors.verifyPassword && String(errors.verifyPassword.message)}
						/>
					</div>
					<button
						type='submit'
						disabled={!isValid}
						className={` float-right mb-[2.8rem] mt-[2.4rem] flex h-[3.2rem] w-[8.4rem] items-center  justify-center rounded-md text-14-500 text-white md:h-[3rem] md:w-[7.2rem] sm:h-[2.8rem]  sm:w-[10.9rem] sm:text-12-500 ${isValid ? 'bg-violet-5' : 'bg-gray-D'}`}
					>
						변경
					</button>
					{open && <MyPagePassWordModal isOpen={open} setOpen={setOpen} />}
					{confirm && <MyPageConfirmModal confirm={confirm} setConfirm={setConfirm} />}
				</form>
			</div>
		</>
	);
}

export default PassWord;
