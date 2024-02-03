import { InvitationDashboardData } from '@/constants/types';
import Button from '../../common/Buttons/Button';
import { deleteInvitationDashboard } from '@/lib/api';

interface InvitationProps {
	invitationData: InvitationDashboardData;
	dashboardId: number;
}

function Invitation({ invitationData, dashboardId }: InvitationProps) {
	async function handleDeleteMember(dashboardId: number, invitationId: number) {
		const resStatus = await deleteInvitationDashboard(dashboardId, invitationId);
		console.log(resStatus);
	}

	return (
		<div className='flex h-[3.8rem] w-full items-center justify-between sm:h-[3.4rem]'>
			<div className='flex items-center'>
				<div className='flex text-16-400 text-black-3 sm:text-14-400'>{invitationData.invitee.email}</div>
			</div>
			<Button
				disabled={false}
				onClick={() => handleDeleteMember(dashboardId, invitationData.id)}
				color='white'
				variant='delete-lg'
				className='cursor-pointer sm:w-[5.2rem] sm:text-12-500'
			>
				취소
			</Button>
		</div>
	);
}

export default Invitation;
