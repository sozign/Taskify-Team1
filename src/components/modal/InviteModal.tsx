import { postInvitationDashboard } from '@/lib/api';
import { Dispatch, SetStateAction } from 'react';
import { FieldErrors, SubmitHandler, useForm } from 'react-hook-form';
import Button from '../common/Buttons/Button';
import FormInput from '../common/Input/FormInput';
import Layout from './Layout';

interface ModalProps {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	dashboardId: number;
}

interface FormValueProps {
	email: string;
}

function InviteModal({ isOpen, setIsOpen, dashboardId }: ModalProps) {
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<FormValueProps>({
		mode: 'onBlur',
		defaultValues: {
			email: '',
		},
	});

	const RULES = {
		email: {
			required: '이메일 형식으로 작성해 주세요.',
		},
	};

	// 모달 1 폼 제출
	const onSubmit: SubmitHandler<FormValueProps> = async (data) => {
		await postInvitationDashboard(dashboardId, data);
		setIsOpen((prev) => !prev);
	};

	// 모달 1 제출 가능 여부 관리
	const isNoError = (obj: FieldErrors<FormValueProps>) => Object.keys(obj).length === 0;

	return (
		<>
			<Layout $modalType='Modal' title='초대하기' isOpen={isOpen} setOpen={setIsOpen}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<FormInput<FormValueProps>
						label='이메일'
						name='email'
						control={control}
						rules={RULES.email}
						required={!!('required' in RULES.email)}
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
