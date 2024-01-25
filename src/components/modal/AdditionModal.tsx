import { Dispatch, SetStateAction } from 'react';
import Layout from './Layout';
import Button from '../common/Buttons/Button';

interface ModalProps {
	isOpen: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

function AdditionModal({ isOpen, setOpen }: ModalProps) {
	return (
		<Layout $modalType='Modal' isOpen={isOpen} setOpen={setOpen}>
			<span className='flex text-18-500 text-black-3'>초대하기</span>
			<div className='absolute bottom-[2.8rem] right-[2.8rem] flex flex-row-reverse gap-3'>
				<Button color='modalViolet' variant='modal'>
					초대
				</Button>
				<Button color='modalWhite' variant='modal' onClick={() => setOpen(false)}>
					취소
				</Button>
			</div>
		</Layout>
	);
}

export default AdditionModal;
