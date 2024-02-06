import DashboardHeader from '@/components/common/Headers/DashboardHeader';
import PageLayout from '@/components/common/PageLayout';
import NotInvitedMemberAlert from '@/components/modal/NotInvitedMemberAlert';
import { isAxiosError } from 'axios';
import AddColumnButton from '@/components/domains/dashboard/AddColumnButton';
import Column from '@/components/domains/dashboard/Column';
import AddColumnModal from '@/components/modal/AddColumnModal';
import { ColumnData } from '@/constants/types';
import { getColumns } from '@/lib/api';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function MyDashBoard() {
	const router = useRouter();
	const boardId = +(router.query?.boardid ?? '');

	const [isAlertModalOpen, setIsAlertModalOpen] = useState<boolean>(false);

	const [columnList, setColumnList] = useState<ColumnData[] | null>(null);
	const [isAddColumnModalOpen, setIsAddColumnModalOpen] = useState(false);
	async function loadColumn() {
		if (!boardId) return;
		try {
			const data = await getColumns(boardId);
			setColumnList(data.data);
		} catch (err) {
			if (isAxiosError(err)) {
				if (err?.response?.status === 404) {
					setIsAlertModalOpen(true);
				}
			}
		}
	}

	useEffect(() => {
		loadColumn();
	}, [boardId]);

	return (
		<>
			<NotInvitedMemberAlert modalControl={{ isOpen: isAlertModalOpen, setOpen: setIsAlertModalOpen }} />
			{columnList ? (
				<PageLayout boardId={boardId}>
					<DashboardHeader dashboardId={boardId} title={''} />
					<div className='flex h-full flex-row bg-gray-F md:flex-col sm:flex-col'>
						{columnList.map((columnItem) => (
							<Column key={columnItem.id} columnItem={columnItem} />
						))}
						<div className='w-full px-[2rem] pt-[6.8rem] md:w-full md:p-[2rem]'>
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
