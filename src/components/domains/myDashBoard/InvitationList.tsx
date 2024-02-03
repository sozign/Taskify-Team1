import Image from 'next/image';
import searchIcon from '@../../../Public/assets/searchIcon.svg';
import { InvitationDashboardData } from '@/constants/types';
import Invitation from './Invitation';
import { useRef, useEffect, useState } from 'react';
import { getInvitations } from '@/lib/api';
import NotInvited from './NotInvited';

function InvitationList({
	onAcceptInvitation,
	invitationList,
	setInvitationList,
}: {
	onAcceptInvitation: (invitationId: number, accept: boolean) => void;
	invitationList: InvitationDashboardData[];
	setInvitationList: React.Dispatch<React.SetStateAction<InvitationDashboardData[]>>;
}) {
	const cursorId = useRef<number>(0);
	const lastElementRef = useRef<HTMLDivElement>(null);
	const [loading, setLoading] = useState(true);
	const [searchKeyword, setSearchKeyword] = useState('');
	const [searchInvitationList, setSearchInvitationList] = useState<InvitationDashboardData[]>([]);

	// 추가 초대 요청
	const loadMoreInvitations = async () => {
		try {
			if (cursorId.current == null) return;
			const data = await getInvitations({ size: 2, cursorId: cursorId.current });
			cursorId.current = data.cursorId;
			setInvitationList((prevList) => [...prevList, ...data.invitations]);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};
	// 검색 요청
	const handleSearchInvitation = async (keyword: string) => {
		try {
			const data = await getInvitations({ size: 10, title: keyword });
			setSearchInvitationList(data.invitations);
		} catch (e) {
			console.error(e);
		}
	};

	useEffect(() => {
		const intersectionObserver = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) return;
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
	}, [cursorId.current]);

	return (
		<div>
			<div className='flex h-[100%] w-[102.2rem] flex-col gap-[2rem] rounded-[0.8rem]  bg-white px-[2.8rem] py-[3.2rem] md:w-[100%] sm:w-[100%] sm:px-[2.4rem] sm:py-[2.4rem]'>
				<h2 className='text-24-700 sm:text-20-600'>초대받은 대시보드</h2>
				{(loading == false && invitationList.length === 0) || searchKeyword !== '' ? (
					<NotInvited />
				) : (
					<div>
						<div className='relative'>
							<Image
								src={searchIcon}
								className='absolute left-[1.4rem] top-[23%] h-[2.4rem] w-[2.4rem] sm:h-[2.2rem] sm:w-[2.2rem]'
								alt='검색 아이콘'
							/>
							<input
								onChange={(e) => {
									handleSearchInvitation(e.target.value);
									setSearchKeyword(e.target.value);
								}}
								placeholder='검색'
								className='w-[100%] rounded-[0.6rem] border border-gray-D px-[4.2rem] py-[1.1rem] text-14-500 sm:px-[4.4rem]'
							/>
						</div>
						<div className='mt-[2rem]'>
							<ul className='flex items-center  justify-between py-[0.4rem] text-16-400 text-gray-9 md:w-[100%]  sm:hidden'>
								<li className=' w-1/3'>이름</li>
								<li className='w-1/3'>초대자</li>
								<li className='w-1/3'>수락여부</li>
							</ul>
							<ul className='flex flex-col  sm:w-[100%]'>
								{searchKeyword === ''
									? invitationList.map((invitation) => (
											<Invitation onAcceptInvitation={onAcceptInvitation} invitation={invitation} key={invitation.id} />
										))
									: searchInvitationList.map((invitation) => (
											<Invitation onAcceptInvitation={onAcceptInvitation} invitation={invitation} key={invitation.id} />
										))}
							</ul>
							<div ref={lastElementRef}></div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default InvitationList;
