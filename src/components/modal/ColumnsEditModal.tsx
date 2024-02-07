import { putColumn } from '@/lib/api';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FieldErrors, SubmitHandler, useForm } from 'react-hook-form';
import Button from '../common/Buttons/Button';
import FormInput from '../common/Input/FormInput';
import Layout from './Layout';
import ColumnsDeletedModal from './ColumnsDeletedModal';
import { useRouter } from 'next/router';

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
	const [columnsDeletedModalOpen, setColumnsDeletedModalOpen] = useState(false);
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
				<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-[2rem]'>
					<FormInput<FormValueProps>
						label='이름'
						name='title'
						control={control}
						rules={RULES.title}
						required={!!('required' in RULES.title)}
					/>
					<div className='flex flex-row justify-end gap-[18rem]'>
						<div
							onClick={() => {
								setIsOpen(false);
								setColumnsDeletedModalOpen(true);
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
			<ColumnsDeletedModal
				isOpen={columnsDeletedModalOpen}
				setIsOpen={setColumnsDeletedModalOpen}
				columnId={columnId}
			/>
		</>
	);
}

export default ColumnsEditModal;
