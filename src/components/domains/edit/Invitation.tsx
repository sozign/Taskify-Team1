import { InvitationDashboardData, MembersData } from '@/constants/types';
import Image from 'next/image';
import React from 'react';
import Button from '../../common/Buttons/Button';

function Invitation({ invitationData }: { invitationData: InvitationDashboardData }) {
	// 삭제 버튼 클릭하면 대시보드 멤버 구성원 삭제 요청
	return (
		<div className='flex h-[3.8rem] w-full items-center justify-between'>
			<div className='flex items-center gap-[1.2rem]'>
				<div className='flex text-16-400 text-black-3'>{invitationData.invitee.email}</div>
			</div>
			<Button color='white' variant='delete-lg' className='cursor-pointer'>
				취소
			</Button>
		</div>
	);
}

export default Invitation;
