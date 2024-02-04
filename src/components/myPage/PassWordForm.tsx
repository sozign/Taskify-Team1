import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { VALIDATE_RULES } from '@/constants/validation';
import Button from '@/components/common/Buttons/Button';
import { putAuthPassword } from '@/lib/api';
import PasswordInput from '../common/Input/PasswordInput';
import MyPagePassWordModal from '../modal/MyPagePassWordModal';

type passwordFormData = {
	password: string;
	newPassword: string;
	verifyPassword: string;
};

function PassWord() {
	const [open, setOpen] = useState(false);
	const {
		register,
		getValues,
		handleSubmit,
		formState: { isSubmitting, errors },
	} = useForm<passwordFormData>({
		defaultValues: {
			password: '',
			newPassword: '',
			verifyPassword: '',
		},
	});

	//api 바뀐 비밀 번호 put
	const putPasswordSubmit = async () => {
		try {
			const data = getValues();
			const { password, newPassword } = data;

			const response = await putAuthPassword({ password, newPassword });
			console.log(response);
			console.log(data);

			if (response === 200) {
				await handleSubmit(async () => {
					await putAuthPassword({ password, newPassword });
				})();
			}
		} catch (error) {
			console.error(error);
			setOpen(true);
		}
	};

	const passwordRegister = register('password', {
		...VALIDATE_RULES.passwordInLogin,
		required: {
			value: true,
			message: '현재 비밀번호를 입력하세요.',
		},
	});

	const newPasswordRegister = register('newPassword', {
		...VALIDATE_RULES.passwordInLogin,
		required: {
			value: true,
			message: '새 비밀번호를 입력하세요.',
		},
		validate: (value, formValues) => {
			return value != formValues.password || '현재와 다른 비밀번호를 사용하세요.';
		},
	});

	const newPasswordCheckRegister = register('verifyPassword', {
		...VALIDATE_RULES.passwordInLogin,
		validate: (value, formValues) => {
			return value === formValues.newPassword || '비밀번호가 일치하지 않습니다.';
		},
	});

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
						{...passwordRegister}
						type='password'
						label='현재 비밀번호'
						placeholder='현재 비밀번호 입력'
						errorMessage={errors.password && String(errors.password.message)}
					/>
					<div className='mt-[2rem]'>
						<PasswordInput
							{...newPasswordRegister}
							type='password'
							label='새 비밀번호'
							placeholder='새 비밀번호 입력'
							errorMessage={errors.newPassword && String(errors.newPassword.message)}
						/>
					</div>
					<div className='mt-[2rem]'>
						<PasswordInput
							{...newPasswordCheckRegister}
							type='password'
							label='새 비밀번호 확인'
							placeholder='새 비밀번호 입력'
							errorMessage={errors.verifyPassword && String(errors.verifyPassword.message)}
						/>
					</div>
					<Button
						color='violet'
						disabled={isSubmitting}
						type='submit'
						variant='confirm'
						className='float-right mb-[2.8rem]  mt-[2.4rem] flex'
					>
						변경
					</Button>
					{open && <MyPagePassWordModal isOpen={open} setOpen={setOpen} />}
				</form>
			</div>
		</>
	);
}

export default PassWord;
