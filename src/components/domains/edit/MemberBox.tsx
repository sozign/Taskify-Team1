import { MembersGet } from '@/constants/types';
import { getInvitationsDashboardProps } from '@/lib/api';
import { Dispatch, SetStateAction } from 'react';
import EditPaginationButton from './EditPaginationButton';
import Member from './Member';

interface MemberBoxProps {
	hostId: number;
	members: MembersGet;
	paginationInfo: getInvitationsDashboardProps;
	setPaginationInfo: Dispatch<SetStateAction<getInvitationsDashboardProps>>;
}

function MemberBox({ hostId, members, paginationInfo, setPaginationInfo }: MemberBoxProps) {
	return (
		<div className='flex w-[62rem] flex-col gap-[2.7rem] rounded-[0.8rem] bg-white px-[2.8rem] py-[3.1rem] md:w-[54.5rem] sm:w-[100%]'>
			<div className='flex items-center justify-between'>
				<span className='text-24-700 text-black-3 sm:text-20-700'>구성원</span>
				{members.totalCount > 4 ? (
					<div className='flex gap-[1.6rem]'>
						<EditPaginationButton
							paginationInfo={paginationInfo}
							setPaginationInfo={setPaginationInfo}
							totalCount={members.totalCount}
						/>
					</div>
				) : null}
			</div>
			<div>
				<div className='mb-[2.4rem] text-16-400 text-gray-9 sm:mb-[2rem] sm:text-14-400'>이름</div>
				{members.members.map((member, index) => (
					<>
						<Member key={member.id} hostId={hostId} memberData={member} />
						{(index + 1) % 4 !== 0 && (
							<div className='mb-[1.5rem] mt-[1.6rem] border border-t-0 border-gray-E sm:mb-[1.1rem] sm:mt-[1.2rem]' />
						)}
					</>
				))}
			</div>
		</div>
	);
}

export default MemberBox;
