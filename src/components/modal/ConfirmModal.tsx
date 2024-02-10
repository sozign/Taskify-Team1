import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import Button from '../common/Buttons/Button';
import Layout from './Layout';

interface ConfirmModalProps {
	isOpen: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	content: string;
	id: number;
	request: (id: number) => Promise<number | void>;
	reload?: () => Promise<void | boolean>;
}

function ConfirmModal({ isOpen, setOpen, id, content, reload, request }: ConfirmModalProps) {
	const router = useRouter();
	async function handleConfirm(id: number) {
		await request(id);

		if (reload) await reload();
		else router.reload();
	}
	return (
		<Layout isOpen={isOpen} setOpen={setOpen} $modalType='Alert'>
			<div className='flex w-full flex-col items-center justify-between gap-[4.5rem] text-18-500 sm:text-14-500'>
				<div className='h-[1rem] w-full' />
				{content}
				<div className='flex w-full justify-end gap-[1.2rem] sm:justify-center sm:gap-[1.1rem]'>
					<Button disabled={false} onClick={() => setOpen(false)} color='modalWhite' variant='modal'>
						취소
					</Button>
					<Button disabled={false} onClick={() => handleConfirm(id)} color='modalViolet' variant='modal'>
						확인
					</Button>
				</div>
			</div>
		</Layout>
	);
}

export default ConfirmModal;
