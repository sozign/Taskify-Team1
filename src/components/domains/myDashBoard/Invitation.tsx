import Button from '@/components/common/Buttons/Button';
import { InvitationDashboardData } from '@/constants/types';
import { useState } from 'react';

function Invitation({
	invitation,
	onAcceptInvitation,
}: {
	invitation: InvitationDashboardData;
	onAcceptInvitation: (invitationId: number, accept: boolean) => void;
}) {
	const [isHidden, setIsHidden] = useState(false);

	const handleAccept = () => {
		onAcceptInvitation(invitation.id, true);
		setIsHidden(true);
	};

	if (isHidden) {
		return null; // 숨겨진 상태일 경우, null을 반환하여 해당 컴포넌트를 숨김
	}

	return (
		<li
			key={invitation.id}
			className='flex items-center justify-between border-b py-[2rem] text-16-500 text-black-3  sm:flex-col  sm:items-start sm:py-[0]'
		>
			<div className=' flex w-1/3 items-center  sm:mb-[1rem] sm:mt-[0.4rem] sm:w-[100%]'>
				<span className='hidden text-14-500 text-gray-9 sm:mr-[2.8rem]  sm:block'>이름</span>
				<div>{invitation.dashboard.title}</div>
			</div>
			<div className='flex  w-1/3 items-center  sm:w-[100%]'>
				<span className='hidden text-14-500 text-gray-9 sm:mr-[1.3rem] sm:block'>초대자</span>
				{invitation.inviter.nickname}
			</div>
			<div className='flex w-1/3 gap-[1rem] sm:w-[100%] sm:py-[1.6rem] '>
				<Button
					disabled={false}
					onClick={() => {
						onAcceptInvitation(invitation.id, true);
						handleAccept();
					}}
					variant='confirm'
					color='violet'
				>
					수락
				</Button>
				<Button
					disabled={false}
					onClick={() => {
						onAcceptInvitation(invitation.id, false);
						handleAccept();
					}}
					variant='confirm'
					color='white'
				>
					거절
				</Button>
			</div>
		</li>
	);
}

export default Invitation;
