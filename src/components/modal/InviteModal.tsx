import { postInvitationDashboard } from '@/lib/api';
import { Dispatch, SetStateAction, useState } from 'react';
import { FieldErrors, SubmitHandler, useForm } from 'react-hook-form';
import Button from '../common/Buttons/Button';
import Layout from './Layout';
import { VALIDATE_RULES } from '@/constants/validation';
import { AxiosError } from 'axios';
import AuthInput from '../common/Input/AuthInput';

interface ModalProps {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	dashboardId: number;
	loadInvitationsDashboardData?: () => Promise<void>;
}

interface FormValueProps {
	email: string;
}

function InviteModal({ isOpen, setIsOpen, dashboardId, loadInvitationsDashboardData }: ModalProps) {
	const [errorMessage, setErrorMessage] = useState<string>();

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<FormValueProps>({
		mode: 'onChange',
		defaultValues: {
			email: '',
		},
	});

	// 모달 1 폼 제출
	const onSubmit: SubmitHandler<FormValueProps> = async (data) => {
		try {
			const res = await postInvitationDashboard(dashboardId, data);
			if (loadInvitationsDashboardData !== undefined) loadInvitationsDashboardData();
			setIsOpen((prev) => !prev);
		} catch (err) {
			if (err instanceof AxiosError) {
				setErrorMessage(err.response?.data.message);
			}
		}
	};

	// 모달 1 제출 가능 여부 관리
	const isNoError = (obj: FieldErrors<FormValueProps>) => Object.keys(obj).length === 0;

	return (
		<>
			<Layout $modalType='Modal' title='초대하기' isOpen={isOpen} setOpen={setIsOpen}>
				<form className='flex flex-col gap-[2.8rem] sm:gap-[2.4rem]' onSubmit={handleSubmit(onSubmit)}>
					<AuthInput
						type='email'
						required={!!VALIDATE_RULES.email?.required}
						label='이메일'
						placeholder='이메일을 입력해 주세요.'
						errorMessage={errorMessage || errors?.email?.message}
						{...register('email', VALIDATE_RULES.email)}
					/>
					<div className='flex flex-row justify-end gap-[1.2rem]'>
						<Button
							onClick={() => {
								setIsOpen(false);
							}}
							color='modalWhite'
							disabled={false}
							variant='modal'
						>
							취소
						</Button>
						<Button disabled={!isNoError(errors)} type='submit' color='modalViolet' variant='modal'>
							초대
						</Button>
					</div>
				</form>
			</Layout>
		</>
	);
}

export default InviteModal;
