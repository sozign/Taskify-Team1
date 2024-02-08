import { useEffect, useState } from 'react';
import DashboardHeader from '@/components/common/Headers/DashboardHeader';
import AddDashboardButton from '@/components/common/Buttons/addDashboardButton';
import DashboardButton from '@/components/domains/myDashBoard/DashboardButton';
import PaginationButton from '@/components/domains/myDashBoard/PaginationButton';
import { getDashboards, getUsers, putInvitations } from '@/lib/api';
import { DashboardsGet, InvitationsGet } from '@/constants/types';
import PageLayout from '@/components/common/PageLayout';
import InvitationList from '@/components/domains/myDashBoard/InvitationList';
import AddNewDashBoard from '@/components/modal/AddNewDashBoard';
import { useUserContext } from '@/context/UserContext';

export default function MyDashBoard() {
	const [addDashBoardModalOpen, setAddDashBoardModalOpen] = useState(false);
	const [dashBoardData, setDashBoardData] = useState<DashboardsGet | undefined>();
	const [paginationPage, setPaginationPage] = useState<number>(1);
	const [acceptedResponse, setAcceptedResponse] = useState<InvitationsGet>();

	const {
		action: { setUserInfo },
	} = useUserContext();

	const dashboardLoad = async () => {
		const data = await getDashboards({ size: 5, cursorId: 0, page: paginationPage, navigationMethod: 'pagination' });
		setDashBoardData(data);
	};

	const handleAcceptInvitation = async (invitationId: number, inviteAccepted: boolean) => {
		const data = await putInvitations(invitationId, { inviteAccepted });
		setAcceptedResponse(data);
	};

	async function loadUserInfo() {
		const data = await getUsers();
		setUserInfo(data);
	}

	useEffect(() => {
		loadUserInfo();
		dashboardLoad();
	}, [paginationPage, acceptedResponse]);

	return (
		<>
			<PageLayout>
				<DashboardHeader dashboardId={0} title={'내 대시보드'} />
				<div className='sm:gap:-[2.4rem] flex h-[100vh] w-[100%] flex-col gap-[4rem] bg-gray-F px-[4rem] py-[4rem] sm:gap-[2.4rem]'>
					<div className='flex w-[102.2rem] flex-col gap-[1.2rem] md:w-[50.4rem]  sm:w-[100%]'>
						<div className='col-span-2 grid grid-cols-3 gap-[1.2rem] md:col-span-3 md:grid-cols-2 md:gap-[1rem] sm:col-span-1 sm:grid-cols-1 sm:gap-[0.8rem]'>
							<AddDashboardButton
								onClick={() => {
									setAddDashBoardModalOpen(true);
								}}
							></AddDashboardButton>
							{dashBoardData?.dashboards.map((dashboard) => (
								<DashboardButton
									key={dashboard.id}
									color={dashboard.color}
									title={dashboard.title}
									createdByMe={dashboard.createdByMe}
									dashboardId={dashboard.id}
								/>
							))}
						</div>
						<PaginationButton
							totalCount={dashBoardData?.totalCount as string}
							paginationPage={paginationPage}
							setPaginationPage={setPaginationPage}
						/>
					</div>
					<InvitationList dashBoardData={dashBoardData} onAcceptInvitation={handleAcceptInvitation} />
				</div>
				<AddNewDashBoard isOpen={addDashBoardModalOpen} setOpen={setAddDashBoardModalOpen} />
			</PageLayout>
		</>
	);
}
