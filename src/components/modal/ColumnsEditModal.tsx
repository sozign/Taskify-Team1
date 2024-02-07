import { deleteColumn, putColumn } from '@/lib/api';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FieldErrors, SubmitHandler, useForm } from 'react-hook-form';
import Button from '../common/Buttons/Button';
import FormInput from '../common/Input/FormInput';
import ConfirmModal from './ConfirmModal';
import Layout from './Layout';

interface ModalProps {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	columnId: number;
}

interface FormValueProps {
	title: string;
}

function ColumnsEditModal({ isOpen, setIsOpen, columnId }: ModalProps) {
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<FormValueProps>({
		mode: 'onBlur',
		defaultValues: {
			title: '',
		},
	});
	const [isColumnsDeletedModalOpen, setIsColumnsDeletedModalOpen] = useState(false);
	const [columnsTitleState, setColumnsTitleState] = useState({
		title: '',
		id: 0,
	});
	const router = useRouter();
	const RULES = {
		title: {
			required: '이름을 입력해주세요.',
		},
	};

	const onSubmit: SubmitHandler<FormValueProps> = async (data) => {
		const resData = await putColumn(columnId, data);
		setColumnsTitleState(resData);
		router.reload();
		setIsOpen((prev) => !prev);
	};

	useEffect(() => {
		columnsTitleState;
	}, [columnsTitleState]);

	const isNoError = (obj: FieldErrors<FormValueProps>) => Object.keys(obj).length === 0;

	return (
		<>
			<Layout $modalType='Modal' title='컬럼 관리' isOpen={isOpen} setOpen={setIsOpen}>
				<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-[2.8rem] sm:gap-[2.4rem]'>
					<FormInput<FormValueProps>
						label='이름'
						name='title'
						control={control}
						rules={RULES.title}
						required={!!('required' in RULES.title)}
					/>
					<div className='flex flex-row justify-between sm:flex-col sm:items-start sm:gap-[1.6rem]'>
						<div
							onClick={() => {
								// setIsOpen(false);
								setIsColumnsDeletedModalOpen(true);
							}}
							className=' flex cursor-pointer flex-row items-end justify-end border-b-[0.1rem] border-gray-9 text-14-400 text-gray-9'
						>
							<span>삭제하기</span>
						</div>
						<div className='flex flex-row gap-[1.2rem]'>
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
								변경
							</Button>
						</div>
					</div>
				</form>
			</Layout>
			{isColumnsDeletedModalOpen && (
				<ConfirmModal
					request={deleteColumn}
					content='컬럼의 모든 카드가 삭제 됩니다.'
					isOpen={isColumnsDeletedModalOpen}
					setOpen={setIsColumnsDeletedModalOpen}
					id={columnId}
				/>
			)}
		</>
	);
}

export default ColumnsEditModal;
