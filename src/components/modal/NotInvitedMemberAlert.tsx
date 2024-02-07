import { Dispatch, SetStateAction } from 'react';
import Layout from './Layout';
import Button from '../common/Buttons/Button';
import Link from 'next/link';

interface NotInvitedMemberAlertProps {
	modalControl: {
		isOpen: boolean;
		setOpen: Dispatch<SetStateAction<boolean>>;
	};
}

export default function NotInvitedMemberAlert({ modalControl }: NotInvitedMemberAlertProps) {
	return (
		<Layout $modalType='Alert' isOpen={modalControl.isOpen} setOpen={modalControl.setOpen}>
			<div className='flex h-full w-full flex-col justify-end gap-[4.5rem] sm:gap-[5rem]'>
				<p className='self-center text-[1.8rem]'>대시보드의 멤버가 아닙니다.</p>
				<Button
					onClick={() => {
						modalControl.setOpen(false);
					}}
					color='modalViolet'
					variant='modal'
					className='self-end sm:self-center'
					disabled={false}
				>
					<Link href={'/mydashboard'}>내 대시보드로</Link>
				</Button>
			</div>
		</Layout>
	);
}
