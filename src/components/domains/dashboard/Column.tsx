import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { CardData, ColumnData, MembersData } from '@/constants/types';
import { getCards, getMembers } from '@/lib/api';
import TaskCard from './TaskCard';
import bullet from '@/../Public/assets/bullet.svg';
import setting from '@/../Public/assets/settingIcon.svg';
import addIcon from '@/../../Public/assets/addIcon.svg';
import SquareChip from '@/components/common/chips/SquareChip';
import { useRouter } from 'next/router';
import AddNewTaskModal from '@/components/modal/AddNewTaskModal';

interface ColumnProps {
	columnItem: ColumnData;
}

export default function Column({ columnItem }: ColumnProps) {
	const router = useRouter();
	const boardId = +(router.query?.boardid ?? '');
	const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

	// 대시보드 멤버 데이터 페칭
	const [dashboardMemberList, setDashboardMemberList] = useState<MembersData[]>([]);

	async function loadDashboardMemberList() {
		const data = await getMembers({ page: 0, size: 0, dashboardId: boardId });
		setDashboardMemberList(data.members);
	}

	useEffect(() => {
		loadDashboardMemberList();
	}, []);

	// 컬럼 데이터 페칭 + 무한 스크롤
	const [currentCardList, setCurrentCardList] = useState<CardData[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const trigger = useRef<HTMLDivElement>(null);
	const cardListTotalCount = useRef<number>(0);
	const cursorId = useRef<number | null>(0);

	async function reloadCardList() {
		if (cursorId.current == null) return; // 더 불러올 값이 없을 경우
		setIsLoading(true);

		const query = {
			size: 10,
			cursorId: cursorId.current ?? 0,
			columnId: columnItem.id,
		};
		const data = await getCards(query);

		setCurrentCardList((prevCardList) => {
			return [...prevCardList, ...data.cards];
		});
		cardListTotalCount.current = data.totalCount;
		cursorId.current = data.cursorId;

		setIsLoading(false);
	}

	useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) return;
				if (isLoading) return;
				reloadCardList();
			});
		});

		if (!trigger.current) return;
		observer.observe(trigger.current);

		return () => {
			if (!trigger.current) return;
			observer.unobserve(trigger.current);
		};
	}, []);

	if (!currentCardList) return;
	return (
		<>
			<div className='w-[35.4rem] flex-shrink-0 overflow-y-auto whitespace-nowrap border-b-[0.1rem] border-r-[0.1rem] bg-gray-F px-[2rem] pb-[2rem] pt-[2.2rem] md:container sm:container sm:px-[1.2rem] sm:pt-[1.7rem]'>
				<div className='mb-[2.5rem] flex items-center justify-between sm:mb-[1.7rem] '>
					<div className='flex items-center'>
						<Image className='mr-[0.6rem]' alt='불렛모양 아이콘' src={bullet} />
						<div className='sm:text-16-700 mr-[1.2rem] text-18-700 text-black-3'>{columnItem.title}</div>
						<SquareChip color='gray'>{cardListTotalCount.current}</SquareChip>
					</div>
					<button>
						<Image alt='설정 아이콘' src={setting} />
					</button>
				</div>
				<div className='flex flex-col gap-[1.6rem]'>
					<button
						onClick={() => {
							setIsTaskModalOpen(true);
						}}
						className='flex justify-center rounded-[0.6rem] border-[0.1rem] border-gray-D bg-white py-[0.9rem]'
					>
						<SquareChip color='violet' className='relative'>
							<Image className='px-[0.6rem] py-[0.6rem]' fill src={addIcon} alt='추가하기 아이콘' />
						</SquareChip>
					</button>
					{currentCardList.map((cardItem) => (
						<TaskCard
							key={cardItem.id}
							cardItem={cardItem}
							columnInfo={{ id: columnItem.id, title: columnItem.title }}
						/>
					))}
					<div ref={trigger} />
				</div>
			</div>
			<AddNewTaskModal
				columnId={columnItem.id}
				isTaskModalOpen={isTaskModalOpen}
				setIsTaskModalOpen={setIsTaskModalOpen}
				dashboardMemberList={dashboardMemberList}
			/>
		</>
	);
}
