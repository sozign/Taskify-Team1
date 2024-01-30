import { MembersData, MembersGet } from '@/constants/types';
import { useState } from 'react';
import PaginationButton from '../myDashBoard/PaginationButton';
import Member from './Member';

function MemberBox({ members }: { members: MembersGet }) {
	const [displayMembers, setDisplayMembers] = useState<MembersData[]>(members.members.slice(0, 4));
	// 좌 우 버튼 클릭 시 최대 4명씩 끊어서 보여주기
	return (
		<div className='mx-[2rem] flex h-fit min-h-[40.4rem] w-[62rem] flex-shrink-0 flex-col rounded-[0.8rem] bg-white px-[2.8rem] pb-[2rem] pt-[2.6rem] sm:mx-[1.2rem] sm:min-h-[33.7rem]'>
			<div className='mb-[2.7rem] flex items-center justify-between sm:mb-[1.8rem]'>
				<span className='text-24-700 text-black-3 sm:text-20-700'>구성원</span>
				{members.totalCount > 4 ? (
					<div className='flex gap-[1.6rem]'>
						<PaginationButton />
					</div>
				) : null}
			</div>
			<div className='mb-[2.4rem] text-16-400 text-gray-9 sm:mb-[2rem] sm:text-14-400'>이름</div>
			<div>
				{displayMembers.map((member, index) => (
					<>
						<Member key={member.id} memberData={member} />
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
