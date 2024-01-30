import DashboardHeader from '@/components/common/Headers/DashboardHeader';
import PageLayout from '@/components/common/PageLayout';
import Column from '@/components/domains/dashboard/ColumnLayout';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getColumns } from '@/lib/api';
import { ColumnData } from '@/constants/types';

// 모달 1에서 폼으로 제출하는 값의 타입
export interface FormValue {
	title: string;
	description: string;
	date: Date;
	tag: string[];
}

export default function MyDashBoard() {
	const router = useRouter();
	const boardId = +(router.query?.boardid ?? '');

	// useEffect 방식 datafetching
	const [columnList, setColumnList] = useState<ColumnData[] | null>(null);
	async function loadColumn(dashBoardId: number) {
		const data = await getColumns(dashBoardId);
		setColumnList(data.data);
		return data;
	}

	useEffect(() => {
		loadColumn(2614);
	}, []);

	if (!columnList) return;

	return (
		<>
			<DashboardHeader id={0} nickname={'nickname'} profileImageUrl={''} title={'비브리지'} />
			<PageLayout boardId={boardId}>
				<div className='flex flex-row md:flex-col sm:flex-col'>
					{columnList.map((columnItem) => (
						<Column key={columnItem.id} columnItem={columnItem} />
					))}
				</div>
			</PageLayout>
		</>
	);
}
