import { Dispatch, SetStateAction, useState } from 'react';
import Button from '../common/Buttons/Button';
import Layout from './Layout';
import { deleteColumn } from '@/lib/api';
import { useRouter } from 'next/router';

interface ModalProps {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	columnId: number;
}

export default function ColumnsDeletedModal({ columnId, isOpen, setIsOpen }: ModalProps) {
	const [isColumnId, setIsColumnId] = useState<number>(columnId);
	const router = useRouter();
	const columnDeleteHandler = async () => {
		await deleteColumn(isColumnId);
		setIsColumnId(isColumnId);
		router.reload();
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
