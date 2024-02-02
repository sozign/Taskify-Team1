import Button from '@/components/common/Buttons/Button';
import { InvitationDashboardData } from '@/constants/types';

function Invitation({ invitation }: { invitation: InvitationDashboardData }) {
	return (
		<div
			key={invitation.id}
			className=' sm: flex  items-center border-b py-[2rem] text-16-500 text-black-3 sm:flex-col  sm:items-start sm:py-[0]'
		>
			<div className=' flex w-[39.1rem] items-center justify-start md:w-[19rem] sm:mb-[1rem] sm:mt-[0.4rem]'>
				<span className='hidden text-14-500 text-gray-9 sm:mr-[2.8rem]  sm:block'>이름</span>
				{invitation.dashboard.title}
			</div>
			<div className='flex w-[30.8rem] md:w-[11.6rem] '>
				<span className='hidden text-14-500 text-gray-9 sm:mr-[1.3rem] sm:block'>초대자</span>
				{invitation.inviter.nickname}
			</div>
			<div className='flex gap-[1rem]  sm:py-[1.6rem]'>
				<Button variant='confirm' color='violet'>
					수락
				</Button>
				<Button variant='confirm' color='white'>
					거절
				</Button>
			</div>
		</div>
	);
}

export default Invitation;
