import { InvitationDashboardData, MembersData } from '@/constants/types';
import Image from 'next/image';
import React from 'react';
import Button from '../../common/Buttons/Button';

function Invitation({ invitationData }: { invitationData: InvitationDashboardData }) {
	// 삭제 버튼 클릭하면 대시보드 멤버 구성원 삭제 요청
	return (
		<div className='flex h-[3.8rem] w-full items-center justify-between sm:h-[3.4rem]'>
			<div className='flex items-center'>
				<div className='flex text-16-400 text-black-3 sm:text-14-400'>{invitationData.invitee.email}</div>
			</div>
			<Button color='white' variant='delete-lg' className='cursor-pointer sm:w-[5.2rem] sm:text-12-500'>
				취소
			</Button>
		</div>
	);
}

export default Invitation;
