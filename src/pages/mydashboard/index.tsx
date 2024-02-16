import { useEffect, useState } from 'react';
import DashboardHeader from '@/components/common/Headers/DashboardHeader';
import AddDashboardButton from '@/components/common/Buttons/addDashboardButton';
import DashboardButton from '@/components/domains/myDashBoard/DashboardButton';
import PaginationButton from '@/components/domains/myDashBoard/PaginationButton';
import { getDashboards, putInvitations } from '@/lib/api';
import { DashboardsGet, InvitationsGet } from '@/constants/types';
import PageLayout from '@/components/common/PageLayout';
import InvitationList from '@/components/domains/myDashBoard/InvitationList';
import AddNewDashBoard from '@/components/modal/AddNewDashBoard';
import { isAxiosError } from 'axios';
import NotInvitedMemberAlert from '@/components/modal/NotInvitedMemberAlert';

export default function MyDashBoard() {
	const [addDashBoardModalOpen, setAddDashBoardModalOpen] = useState(false);
	const [dashBoardData, setDashBoardData] = useState<DashboardsGet | undefined>();
	const [paginationPage, setPaginationPage] = useState<number>(1);
	const [acceptedResponse, setAcceptedResponse] = useState<InvitationsGet>();
	const [isLoginAlertModalOpen, setIsLoginAlertModalOpen] = useState<boolean>(false);

	//대시보드 데이터 요청
	const dashboardLoad = async () => {
		try {
			const data = await getDashboards({ size: 5, cursorId: 0, page: paginationPage, navigationMethod: 'pagination' });
			setDashBoardData(data);
		} catch (err) {
			if (isAxiosError(err)) {
				if (err?.response?.status === 401) {
					setIsLoginAlertModalOpen(true);
				}
			}
		}
	};

	//초대 응답 기능
	const handleAcceptInvitation = async (invitationId: number, inviteAccepted: boolean) => {
		const data = await putInvitations(invitationId, { inviteAccepted });
		setAcceptedResponse(data);
	};

	useEffect(() => {
		dashboardLoad();
	}, [paginationPage, acceptedResponse]);

	return (
		<>
			<NotInvitedMemberAlert
				href='/'
				alertMessage='로그인 후 사용해주세요'
				buttonText='홈으로'
				modalControl={{
					isOpen: isLoginAlertModalOpen,
					setOpen: setIsLoginAlertModalOpen,
				}}
			/>
			{!!dashBoardData && (
				<PageLayout>
					<DashboardHeader dashboardId={0} title={'내 대시보드'} />
					<div className='h-full bg-gray-F'>
						<div className='sm:gap:-[2.4rem] flex h-fit w-[100%] flex-col gap-[4rem] bg-gray-F px-[4rem] py-[4rem] sm:gap-[2.4rem]'>
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
							<div className='h-[100%]'>
								<InvitationList onAcceptInvitation={handleAcceptInvitation} />
							</div>
						</div>
					</div>
					<AddNewDashBoard isOpen={addDashBoardModalOpen} setOpen={setAddDashBoardModalOpen} />
				</PageLayout>
			)}
		</>
	);
}
