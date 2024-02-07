import DashboardHeader from '@/components/common/Headers/DashboardHeader';
import PageLayout from '@/components/common/PageLayout';
import Column from '@/components/domains/dashboard/Column';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getColumns } from '@/lib/api';
import { ColumnData } from '@/constants/types';
import NotInvitedMemberAlert from '@/components/modal/NotInvitedMemberAlert';
import { isAxiosError } from 'axios';

export default function MyDashBoard() {
	const router = useRouter();
	const boardId = +(router.query?.boardid ?? '');

	const [isAlertModalOpen, setIsAlertModalOpen] = useState<boolean>(false);

	const [columnList, setColumnList] = useState<ColumnData[] | null>(null);
	async function loadColumn() {
		if (!boardId) return;
		try {
			const data = await getColumns(boardId);
			setColumnList(data.data);
		} catch (err) {
			if (isAxiosError(err)) {
				if (err?.response?.status === 404) {
					setIsAlertModalOpen(true);
					console.log('하이');
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
					</div>
				</PageLayout>
			) : (
				<></>
			)}
		</>
	);
}
