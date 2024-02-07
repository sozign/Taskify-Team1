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
			<div className='flex h-full w-full flex-col justify-end gap-[4.5rem] sm:gap-[5rem]'>
				<p className='self-center text-[1.8rem]'>프로필 수정이 완료되었습니다.</p>
				<Button
					onClick={() => {
						setOpen(false);
					}}
					color='modalViolet'
					variant='modal'
					className='self-end sm:self-center'
					disabled={false}
				>
					확인
				</Button>
			</div>
		</Layout>
	);
}

export default MyPageProfileModal;
