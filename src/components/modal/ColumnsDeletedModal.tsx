import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Button from '../common/Buttons/Button';
import Layout from './Layout';
import { deleteColumn, getColumns } from '@/lib/api';

interface ModalProps {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	columnId: number;
}

export default function ColumnsDeletedModal({ columnId, isOpen, setIsOpen }: ModalProps) {
	const [isColumnId, setIsColumnId] = useState<number>(columnId);

	const getColumnsId = async (columnId: number) => {
		const columnIdData = await getColumns(columnId);
		console.log(columnIdData.data[0].id);
		setIsColumnId(columnId);
	};

	useEffect(() => {
		getColumnsId(columnId);
	}, []);
	const columnDeleteHandler = async () => {
		const response = await deleteColumn(isColumnId);
		setIsOpen((prev) => !prev);
	};
	return (
		<>
			<Layout $modalType='Modal' isOpen={isOpen} setOpen={setIsOpen}>
				<div className='flex flex-col gap-[4rem]'>
					<div className='flex flex-row items-center justify-center'>
						<span className=' text-14-400'>컬럼의 모든 카드가 삭제 됩니다.</span>
					</div>
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
						<Button
							onClick={() => {
								columnDeleteHandler();
							}}
							disabled={false}
							type='submit'
							color='modalViolet'
							variant='modal'
						>
							삭제
						</Button>
					</div>
				</div>
			</Layout>
		</>
	);
}
