import arrowForward from '@/../Public/assets/arrowForward.svg';
import MyDashboardHeader from '@/components/common/Headers/MyDashboardHeader';
import PageLayout from '@/components/common/PageLayout';
import EditBox from '@/components/domains/edit/EditBox';
import InvitationsBox from '@/components/domains/edit/InvitationsBox';
import MemberBox from '@/components/domains/edit/MemberBox';
import { DashboardData, InvitationsDashboardGet, MembersGet, UserInfo } from '@/constants/types';
import {
	deleteDashboard,
	getDashboardItem,
	getInvitationsDashboard,
	getInvitationsDashboardProps,
	getMembers,
	getUsers,
} from '@/lib/api';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function DashBoardEdit() {
	const router = useRouter();
	const boardId = +(router.query.boardid ?? 0);

	const [dashboardInfo, setDashboardInfo] = useState<DashboardData>({
		id: boardId,
		title: '',
		color: '',
		createdAt: '',
		updatedAt: '',
		createdByMe: true,
		userId: 0,
	});
	const [members, setMembers] = useState<MembersGet>({
		members: [],
		totalCount: 4,
	});
	const [invitationsDashboard, setInvitationsDashboard] = useState<InvitationsDashboardGet>({
		invitations: [],
		totalCount: 5,
	});
	const [myInfo, setMyInfo] = useState<UserInfo>({
		id: 0,
		email: '',
		nickname: '',
		profileImageUrl: null,
		createdAt: '',
		updatedAt: '',
	});
	const [membersPagination, setMembersPagination] = useState<getInvitationsDashboardProps>({
		dashboardId: boardId,
		page: 1,
		size: 4,
	});
	const [invitationsPagination, setInvitationsPagination] = useState<getInvitationsDashboardProps>({
		dashboardId: boardId,
		page: 1,
		size: 5,
	});

	async function loadMyInfo() {
		try {
			const resData = await getUsers();
			setMyInfo(resData);
			console.log(resData);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}

	async function loadDashboardData(dashboardId: number) {
		try {
			const resData = await getDashboardItem(dashboardId);
			setDashboardInfo(resData);
			console.log(resData);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}

	async function loadDashboardMembersData(membersPagination: getInvitationsDashboardProps) {
		try {
			const resData = await getMembers(membersPagination);
			setMembers(resData);
			console.log(resData);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}

	async function loadInvitationsDashboardData(invitationsPagination: getInvitationsDashboardProps) {
		try {
			const resData = await getInvitationsDashboard(invitationsPagination);
			setInvitationsDashboard(resData);
			console.log(resData);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}

	useEffect(() => {
		loadDashboardData(boardId);
		loadDashboardMembersData(membersPagination);
		loadInvitationsDashboardData(invitationsPagination);
		loadMyInfo();
	}, [membersPagination, invitationsPagination]);

	async function handleDelete(dashboardId: number) {
		const resStatus = await deleteDashboard(dashboardId);
		console.log(resStatus);
		router.push('/mydashboard');
	}

	return (
		<PageLayout boardId={boardId}>
			<div className='flex h-fit min-h-full w-full flex-col gap-[2rem] bg-gray-F pb-[5.6rem] md:pb-[4.8rem] sm:gap-[1.7rem] sm:pb-[2.4rem]'>
				<MyDashboardHeader title={dashboardInfo.title} nickname={myInfo.nickname} profileImageUrl={''} />
				<Link
					href={`/dashboard/${boardId}`}
					className='ml-[2rem] flex h-fit w-fit items-center justify-center gap-[0.6rem]'
				>
					<Image src={arrowForward} alt='돌아가기 버튼' className='sm:h-[1.8rem] sm:w-[1.8rem]' />
					<span className='text-16-500 text-black-3 sm:text-14-500'>돌아가기</span>
				</Link>
				<div className='flex flex-col gap-[1.2rem] sm:gap-[1.1rem]'>
					<EditBox title={dashboardInfo?.title} color={dashboardInfo?.color} />
					<MemberBox members={members} paginationInfo={membersPagination} setPaginationInfo={setMembersPagination} />
					<InvitationsBox
						paginationInfo={invitationsPagination}
						setPaginationInfo={setInvitationsPagination}
						invitations={invitationsDashboard}
					/>
				</div>
				<button
					onClick={() => handleDelete(boardId)}
					className='ml-[2rem] mt-[2rem] flex h-[6.2rem] w-fit flex-shrink-0 items-center justify-center rounded-[0.8rem] border border-gray-D bg-gray-F px-[9.5rem] py-[2rem] text-center text-18-500 text-black-3 md:mt-[2.8rem] sm:mx-[1.2rem] sm:mt-[1.5rem] sm:text-16-500'
				>
					대시보드 삭제하기
				</button>
			</div>
		</PageLayout>
	);
}
