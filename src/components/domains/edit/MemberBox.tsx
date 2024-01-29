import arrowLeft from '@/../Public/assets/arrowLeft.svg';
import arrowRight from '@/../Public/assets/arrowRight.svg';
import { MembersData, MembersGet } from '@/constants/types';
import Image from 'next/image';
import Member from './Member';
import { useState } from 'react';
import PaginationButton from '../myDashBoard/PaginationButton';

function MemberBox({ members }: { members: MembersGet }) {
	const [displayMembers, setDisplayMembers] = useState<MembersData[]>(members.members.slice(0, 4));
	// 좌 우 버튼 클릭 시 최대 4명씩 끊어서 보여주기
	return (
		<div className='ml-[2rem] flex h-[40.4rem] w-[62rem] flex-shrink-0 flex-col rounded-[0.8rem] bg-white px-[2.8rem] pb-[2rem] pt-[2.6rem]'>
			<div className='mb-[2.7rem] flex items-center justify-between'>
				<span className='text-24-700 text-black-3'>구성원</span>
				{members.totalCount > 4 ? (
					<div className='flex gap-[1.6rem]'>
						<PaginationButton />
					</div>
				) : null}
			</div>
			<div className='mb-[2.4rem] text-16-400 text-gray-9'>이름</div>
			<div>
				{displayMembers.map((member, index) => (
					<>
						<Member key={member.id} memberData={member} />
						{(index + 1) % 4 !== 0 && <div className='mb-[1.5rem] mt-[1.6rem] border border-t-0 border-gray-E' />}
					</>
				))}
			</div>
		</div>
	);
}

export default MemberBox;
