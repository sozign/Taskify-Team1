import { Dispatch, SetStateAction } from 'react';
import Layout from './Layout';
import Button from '../common/Buttons/Button';

interface ModalProps {
	isOpen: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

function MyPageProfileModal({ isOpen, setOpen }: ModalProps) {
	return (
		<Layout $modalType='Alert' isOpen={isOpen} setOpen={setOpen}>
			<div>
				<p className='text-[1.8rem]'>프로필 수정이 완료되었습니다.</p>
				<Button
					onClick={() => {
						setOpen(false);
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

export default MyPageProfileModal;
