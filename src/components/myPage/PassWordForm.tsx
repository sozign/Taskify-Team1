import { useForm, SubmitHandler } from 'react-hook-form';
import AuthInput from '@/components/common/Input/AuthInput';
import { VALIDATE_RULES } from '@/constants/validation';
import Button from '@/components/common/Buttons/Button';

type passwordFormData = {
	currentPassword: string;
	newPassword: string;
	verifyPassword: string;
};

function PassWord() {
	// const onSubmit = (data: MyPageFormData) => {
	// 	console.log(data);
	// 	handleLogin(data);
	// };
	const {
		register,
		watch,
		// setValue,
		handleSubmit,
		formState: { isSubmitting, errors },
	} = useForm<passwordFormData>({
		mode: 'onBlur',
		defaultValues: {
			currentPassword: '',
			newPassword: '',
			verifyPassword: '',
		},
	});
	// const onSubmit = (data) => console.log(data);
	//모달창 띄우기로 연결할수 있을까?
	const onSubmit: SubmitHandler<passwordFormData> = (data) => console.log(data);

	return (
		<>
			{/* mb-[12.5rem] 적용안됨 */}
			<div className=' mt-[1.2rem] h-[45.4rem] w-[62rem] rounded-lg bg-white'>
				<p className='ml-[2.8rem] py-[3.2rem] text-[2.4rem] font-bold text-[#333236]'>비밀번호 변경</p>
				<form
					className='ml-[2.8rem] w-[56.4rem]'
					onSubmit={handleSubmit(onSubmit)}
					// onSubmit={handelsubmit(onSubmit)}
				>
					<AuthInput
						label='현재 비밀번호'
						className='currentPassword mb-[2rem]'
						type='password'
						required={!!VALIDATE_RULES.passwordInLogin.required}
						{...register('currentPassword', {
							...VALIDATE_RULES.passwordInLogin,
						})}
						errorMessage={errors?.currentPassword?.message}
					/>
					<AuthInput
						label='새로운 비밀번호'
						className='newPassword mb-[2rem]'
						type='password'
						required={!!VALIDATE_RULES.passwordInLogin.required}
						{...register('newPassword', {
							...VALIDATE_RULES.passwordInLogin,
						})}
						errorMessage={errors?.newPassword?.message}
					/>
					<AuthInput
						label='새로운 비밀번호 확인'
						className='verifyPassword'
						type='password'
						required={!!VALIDATE_RULES.checkPassword.required}
						{...register('verifyPassword', {
							...VALIDATE_RULES.checkPassword,
						})}
						errorMessage={
							watch('newPassword') !== watch('verifyPassword') ? String(errors?.verifyPassword?.message) : ''
						}
					/>
					{/* ✅ 모달창 open후 바로 꺼짐 */}
					{/* <div> */}
					<Button
						// onClick={additionHandleClick}
						color='violet'
						disabled={isSubmitting}
						type='submit'
						variant='confirm'
						className='float-right mb-[2.8rem]  mt-[2.4rem] flex'
					>
						변경
					</Button>
					{/* {open === true ? <MyPageModal isOpen={open} setOpen={setOpen} /> : null}
                  </div> */}
				</form>
			</div>
		</>
	);
}

export default PassWord;
