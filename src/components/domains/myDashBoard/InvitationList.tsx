import Image from 'next/image';
import searchIcon from '@../../../Public/assets/searchIcon.svg';
import { InvitationDashboardData } from '@/constants/types';
import Invitation from './Invitation';
import { useRef, useEffect, useState } from 'react';
import { getInvitations } from '@/lib/api';

function InvitationList({
	invitationList,
	setInvitationList,
}: {
	invitationList: InvitationDashboardData[];
	setInvitationList: React.Dispatch<React.SetStateAction<InvitationDashboardData[]>>;
}) {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [searchKeyword, setSearchKeyword] = useState('');
	const cursorId = useRef<number>(0);
	const lastElementRef = useRef<HTMLDivElement>(null);

	// 추가 초대 요청
	const loadMoreInvitations = async () => {
		if (cursorId.current == null) return;
		setIsLoading(true);
		const data = await getInvitations({ size: 2, cursorId: cursorId.current });
		cursorId.current = data.cursorId;
		setInvitationList((prevList) => [...prevList, ...data.invitations]);
		setIsLoading(false);
	};

	// 검색 요청
	const handleSearchInvitation = async (keyword: string) => {
		const data = await getInvitations({ title: keyword });
		setInvitationList(data.invitations);
	};

	useEffect(() => {
		if (searchKeyword === '') {
			const intersectionObserver = new IntersectionObserver((entries) => {
				entries.forEach((entry) => {
					if (!entry.isIntersecting) return;
					if (isLoading) return;
					loadMoreInvitations();
				});
			});

			if (lastElementRef.current) {
				intersectionObserver.observe(lastElementRef.current);
			}

			return () => {
				if (lastElementRef.current) {
					intersectionObserver.unobserve(lastElementRef.current);
				}
			};
		}
	}, [cursorId.current]);

	return (
		<div className='flex h-[100%] w-[102.2rem] flex-col gap-[2rem] rounded-[0.8rem]  bg-white px-[2.8rem] py-[3.2rem] md:w-[50.4rem] sm:w-[100%] sm:px-[2.4rem] sm:py-[2.4rem]'>
			<h2 className='text-24-700 sm:text-20-600'>초대받은 대시보드</h2>
			<div className='relative'>
				<Image
					src={searchIcon}
					className='absolute left-[1.4rem] top-[23%] h-[2.4rem] w-[2.4rem] sm:h-[2.2rem] sm:w-[2.2rem]'
					alt='검색 아이콘'
				/>
				<input
					onChange={(e) => {
						handleSearchInvitation(e.target.value);
					}}
					placeholder='검색'
					className='w-[100%] rounded-[0.6rem] border border-gray-D px-[4.2rem] py-[1.1rem] text-14-500 sm:px-[4.4rem]'
				/>
			</div>

			<div>
				<div className='flex items-center justify-start gap-[26rem] py-[0.4rem] text-16-400 text-gray-9 md:gap-[6rem] sm:hidden'>
					<div className='mr-[10rem] md:mr-[9.2rem]'>이름</div>
					<div className=''>초대자</div>
					<div className=''>수락여부</div>
				</div>
				{invitationList.map((invitation) => (
					<Invitation invitation={invitation} key={invitation.id} />
				))}
				<div ref={lastElementRef}></div>
			</div>
		</div>
	);
}

export default InvitationList;
