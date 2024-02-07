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
			<div>
				<p className='text-[1.8rem]'>비밀번호 변경에 성공했습니다.</p>
				<Button
					onClick={() => {
						setConfirm(false);
					}}
					color='modalViolet'
					variant='modal'
					disabled={false}
					className='relative left-[22.4rem] top-[4.4rem]'
				>
					확인
				</Button>
			</div>
		</Layout>
	);
}

export default MyPageConfirmModal;
