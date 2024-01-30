import addBox from '@/../Public/assets/addBox.svg';
import { InvitationDashboardData, InvitationsDashboardGet } from '@/constants/types';
import Image from 'next/image';
import { useState } from 'react';
import PaginationButton from '../myDashBoard/PaginationButton';
import Invitation from './Invitation';

function InviteListBox({ invitations }: { invitations: InvitationsDashboardGet }) {
	const [displayInvitations, setDisplayInvitations] = useState<InvitationDashboardData[]>(
		invitations.invitations.slice(0, 5),
	);
	const a = 3;
	return (
		<div className='mx-[2rem] flex h-fit min-h-[47.7rem] w-[62rem] flex-shrink-0 flex-col rounded-[0.8rem] bg-white p-[2.8rem] pb-[2rem] sm:mx-[1.2rem] sm:min-h-[40.6rem]'>
			<div className='mb-[2.7rem] flex items-center justify-between'>
				<span className='text-24-700 text-black-3 sm:text-20-700'>초대 내역</span>
				<div className='flex items-center gap-[1.6rem] sm:flex-col sm:items-end'>
					{a === 3 ? (
						<div className='flex'>
							<PaginationButton />
						</div>
					) : null}
					<button className='flex h-[3.2rem] w-[10.5rem] items-center justify-center rounded-md bg-violet-5 px-[1.6rem] py-[0.8rem]'>
						<div className='flex h-fit flex-shrink-0 gap-[0.8rem] text-14-500 text-white'>
							<Image src={addBox} width={16} height={16} alt='초대하기 버튼 이미지' />
							초대하기
						</div>
					</button>
				</div>
			</div>
			<div className='mb-[2.4rem] text-16-400 text-gray-9 sm:mb-[2rem] sm:text-14-400'>이메일</div>
			<div>
				{displayInvitations.map((invitation, index) => (
					<>
						<Invitation key={invitation.id} invitationData={invitation} />
						{(index + 1) % 5 !== 0 && <div className='mb-[1.5rem] mt-[1.6rem] border border-t-0 border-gray-E' />}
					</>
				))}
			</div>
		</div>
	);
}

export default InviteListBox;
