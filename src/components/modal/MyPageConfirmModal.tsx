import { Dispatch, SetStateAction } from 'react';
import Layout from './Layout';
import Button from '../common/Buttons/Button';

interface ModalProps {
	confirm: boolean;
	setConfirm: Dispatch<SetStateAction<boolean>>;
}

function MyPageConfirmModal({ confirm, setConfirm }: ModalProps) {
	return (
		<Layout $modalType='Alert' isOpen={confirm} setOpen={setConfirm}>
			<div className='flex h-full w-full flex-col justify-end gap-[4.5rem] sm:gap-[5rem]'>
				<p className='self-center text-[1.8rem]'>비밀번호 변경에 성공했습니다.</p>
				<Button
					onClick={() => {
						setConfirm(false);
					}}
					color='modalViolet'
					variant='modal'
					disabled={false}
					className='self-end sm:self-center'
				>
					확인
				</Button>
			</div>
		</Layout>
	);
}

export default MyPageConfirmModal;
