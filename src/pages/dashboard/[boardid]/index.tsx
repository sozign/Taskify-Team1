import DashboardHeader from '@/components/common/Headers/DashboardHeader';
import PageLayout from '@/components/common/PageLayout';
import NotInvitedMemberAlert from '@/components/modal/NotInvitedMemberAlert';
import { isAxiosError } from 'axios';
import AddColumnButton from '@/components/domains/dashboard/AddColumnButton';
import Column from '@/components/domains/dashboard/Column';
import AddColumnModal from '@/components/modal/AddColumnModal';
import { getColumns, getMembers } from '@/lib/api';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDashboardContext } from '@/context/DashboardContext';

export default function MyDashBoard() {
	const router = useRouter();
	const boardId = +(router.query?.boardid ?? '');

	const { value, action } = useDashboardContext();

	const [isAlertModalOpen, setIsAlertModalOpen] = useState<boolean>(false);
	const [isAddColumnModalOpen, setIsAddColumnModalOpen] = useState(false);

	async function loadColumn() {
		if (!boardId) return;
		try {
			const data = await getColumns(boardId);
			action.setColumnList(data.data);
		} catch (err) {
			if (isAxiosError(err)) {
				if (err?.response?.status === 404) {
					setIsAlertModalOpen(true);
				}
			}
		}
	}

	async function loadDashboardMemberList() {
		if (!boardId) return;
		const data = await getMembers({ page: 0, size: 0, dashboardId: boardId });
		action.setMemberList(data.members);
	}

	useEffect(() => {
		loadColumn();
		loadDashboardMemberList();
	}, [boardId]);

	return (
		<>
			<NotInvitedMemberAlert
				alertMessage='대시보드의 멤버가 아닙니다.'
				modalControl={{
					isOpen: isAlertModalOpen,
					setOpen: setIsAlertModalOpen,
				}}
			/>
			{value.columnList ? (
				<PageLayout boardId={boardId}>
					<DashboardHeader dashboardId={boardId} title={''} />
					<div className='flex h-[calc(100vh-7rem)] flex-row bg-gray-F md:h-[calc(100vh-6rem)] md:flex-col sm:flex-col'>
						{value.columnList.map((columnItem) => (
							<Column key={columnItem.id} columnItem={columnItem} />
						))}
						<div className='w-full bg-gray-F px-[2rem] pt-[6.8rem] md:w-full md:p-[2rem]'>
							<AddColumnButton onClick={() => setIsAddColumnModalOpen(true)} />
						</div>
					</div>
					<AddColumnModal
						loadColumn={loadColumn}
						isOpen={isAddColumnModalOpen}
						setOpen={setIsAddColumnModalOpen}
						dashboardId={boardId}
					/>
				</PageLayout>
			) : (
				<></>
			)}
		</>
	);
}
