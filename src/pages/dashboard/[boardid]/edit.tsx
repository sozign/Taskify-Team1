import arrowForward from '@/../Public/assets/arrowForward.svg';
import DashboardHeader from '@/components/common/Headers/DashboardHeader';
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
		color: '#7AC555',
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
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}

	async function loadDashboardData(dashboardId: number) {
		try {
			const resData = await getDashboardItem(dashboardId);
			setDashboardInfo(resData);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}

	async function loadDashboardMembersData(membersPagination: getInvitationsDashboardProps) {
		try {
			const resData = await getMembers(membersPagination);
			setMembers(resData);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}

	async function loadInvitationsDashboardData(invitationsPagination: getInvitationsDashboardProps) {
		try {
			const resData = await getInvitationsDashboard(invitationsPagination);
			setInvitationsDashboard(resData);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}

	useEffect(() => {
		loadDashboardData(boardId);
		loadMyInfo();
		setMembersPagination({ dashboardId: boardId, page: 1, size: 4 });
		setInvitationsPagination({ dashboardId: boardId, page: 1, size: 5 });
	}, [boardId]);

	useEffect(() => {
		loadDashboardMembersData(membersPagination);
		loadInvitationsDashboardData(invitationsPagination);
	}, [membersPagination, invitationsPagination]);

	async function handleDelete(dashboardId: number) {
		await deleteDashboard(dashboardId);
		router.push('/mydashboard');
	}

	return (
		<PageLayout boardId={boardId}>
			<div className='flex h-fit min-h-full w-full flex-col gap-[2rem] bg-gray-F pb-[5.6rem] md:pb-[4.8rem] sm:gap-[1.7rem] sm:pb-[2.4rem]'>
				<DashboardHeader dashboardId={boardId} title={''} />
				<Link
					href={`/dashboard/${boardId}`}
					className='ml-[2rem] flex h-fit w-fit items-center justify-center gap-[0.6rem]'
				>
					<Image src={arrowForward} alt='돌아가기 버튼' className='sm:h-[1.8rem] sm:w-[1.8rem]' />
					<span className='text-16-500 text-black-3 sm:text-14-500'>돌아가기</span>
				</Link>
				<div className='flex flex-col gap-[1.2rem] px-[2.8rem] sm:gap-[1.1rem]'>
					<EditBox
						loadDashboardData={loadDashboardData}
						dashboardId={boardId}
						title={dashboardInfo.title}
						color={dashboardInfo.color}
					/>
					<MemberBox
						hostId={dashboardInfo.userId}
						members={members}
						paginationInfo={membersPagination}
						setPaginationInfo={setMembersPagination}
					/>
					<InvitationsBox
						dashboardId={boardId}
						paginationInfo={invitationsPagination}
						setPaginationInfo={setInvitationsPagination}
						invitations={invitationsDashboard}
					/>
					<button
						onClick={() => handleDelete(boardId)}
						className='flex  h-[6.2rem]  w-[32.5rem]  items-center justify-center rounded-[0.8rem]  border border-gray-D bg-gray-F text-18-500 text-black-3 sm:w-[100%] sm:text-16-500'
					>
						<div>대시보드 삭제하기</div>
					</button>
				</div>
			</div>
		</PageLayout>
	);
}
