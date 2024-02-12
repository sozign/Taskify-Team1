import { Dispatch, SetStateAction } from 'react';
import Layout from './Layout';
import Button from '../common/Buttons/Button';
import Link from 'next/link';

interface NotInvitedMemberAlertProps {
	modalControl: {
		isOpen: boolean;
		setOpen: Dispatch<SetStateAction<boolean>>;
	};
	alertMessage: string;
	href: string;
	buttonText?: string;
}

export default function NotInvitedMemberAlert({
	modalControl,
	alertMessage,
	href,
	buttonText = '내 대시보드로',
}: NotInvitedMemberAlertProps) {
	return (
		<Layout $modalType='NotFound' isOpen={modalControl.isOpen} setOpen={modalControl.setOpen}>
			<div className='flex h-full w-full flex-col justify-end gap-[4.5rem] sm:gap-[5rem]'>
				<p className='self-center text-[1.8rem]'>{alertMessage}</p>
				<Button
					onClick={() => {
						modalControl.setOpen(false);
					}}
					color='modalViolet'
					variant='modal'
					className='self-end sm:self-center'
					disabled={false}
				>
					<Link href={href}>{buttonText}</Link>
				</Button>
			</div>
		</Layout>
	);
}
