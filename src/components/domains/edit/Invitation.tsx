import { InvitationDashboardData } from '@/constants/types';
import Button from '../../common/Buttons/Button';
import { deleteInvitationDashboard } from '@/lib/api';
import { useState } from 'react';
import Layout from '@/components/modal/Layout';

interface InvitationProps {
	invitationData: InvitationDashboardData;
	dashboardId: number;
}

function Invitation({ invitationData, dashboardId }: InvitationProps) {
	const [isModalOpen, setIsModalOpen] = useState(false);

	async function handleDeleteMember(dashboardId: number, invitationId: number) {
		await deleteInvitationDashboard(dashboardId, invitationId);
	}

	return (
		<>
			<div className='flex h-[3.8rem] w-full items-center justify-between sm:h-[3.4rem]'>
				<div className='flex items-center'>
					<div className='flex text-16-400 text-black-3 sm:text-14-400'>{invitationData.invitee.email}</div>
				</div>
				<Button
					disabled={false}
					onClick={() => setIsModalOpen(true)}
					color='white'
					variant='delete-lg'
					className='cursor-pointer sm:w-[5.2rem] sm:text-12-500'
				>
					취소
				</Button>
			</div>
			{isModalOpen && (
				<Layout isOpen={isModalOpen} setOpen={setIsModalOpen} $modalType='Alert'>
					<div className='flex w-full flex-col items-center justify-between gap-[4.5rem] text-18-500 sm:text-14-500'>
						<div className='h-[1rem] w-full' />
						초대를 취소하시겠습니까?
						<div className='flex w-full justify-end gap-[1.2rem] sm:justify-center sm:gap-[1.1rem]'>
							<Button disabled={false} onClick={() => setIsModalOpen(false)} color='modalWhite' variant='modal'>
								취소
							</Button>
							<Button
								disabled={false}
								onClick={() => handleDeleteMember(dashboardId, invitationData.id)}
								color='modalViolet'
								variant='modal'
							>
								확인
							</Button>
						</div>
					</div>
				</Layout>
			)}
		</>
	);
}

export default Invitation;
