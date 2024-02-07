import TaskifyImage from '@/../../Public/assets/TaskifyImage.svg';
import Taskify from '@/../../Public/assets/Taskify.svg';
import RoyalCrownIcon from '@/../../Public/assets/royalCrownIcon.svg';
import PlusIcon from '@/../../Public/assets/PlusIcon.svg';
import Image from 'next/image';
import clsx from 'clsx';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { DashboardData } from '@/constants/types';
import { getDashboards, getDashboardsProps, postDashboard } from '@/lib/api';
import AddNewDashBoard, { COLOR_PICK } from '../modal/AddNewDashBoard';

interface SideBarProps {
	boardId?: number;
}

export default function SideBar({ boardId }: SideBarProps) {
	// 대시보드 생성 모달 여닫음 관리
	const [isMakeNewDashBoardModalOpen, setMakeNewDashBoardModalOpen] = useState<boolean>(false);

	const [dashBoardList, setDashBoardList] = useState<DashboardData[] | null>(null);

	async function loadDashBoardList() {
		const query: getDashboardsProps = {
			navigationMethod: 'pagination',
			cursorId: 0,
			page: 1,
			size: 10,
		};
		const data = await getDashboards(query);
		setDashBoardList(data.dashboards);
	}

	useEffect(() => {
		loadDashBoardList();
	}, []);

	if (!dashBoardList) return;

	return (
		<>
			<div className='h-full w-full border-r border-gray-D p-[1.2rem]'>
				<Link href={'/'} className='mb-[4.4rem] mt-[0.8rem] flex justify-start p-[1.2rem]'>
					<Image alt='로고' src={TaskifyImage} />
					<Image alt='폰트 로고' className='sm:hidden' width={80} height={22} src={Taskify} />
				</Link>
				<div className=' p-[1.2rem]'>
					<button
						className='flex w-full flex-row items-center justify-between'
						onClick={() => {
							setMakeNewDashBoardModalOpen(true);
						}}
					>
						<div className='text-12-700 text-gray-7 sm:hidden'>Dash Boards</div>
						<Image alt='대시보드 추가 버튼 아이콘' width={20} height={20} src={PlusIcon} />
					</button>
				</div>
				<div>
					{dashBoardList.map((dashBoardItem) => {
						return (
							<Link key={dashBoardItem.id} href={`/dashboard/${dashBoardItem.id}`}>
								<div
									className={clsx(
										'flex items-center justify-start gap-[0.6rem] rounded-[0.4rem] p-[1.2rem] sm:pl-[1.7rem]',
										boardId === dashBoardItem.id && 'bg-violet-F',
									)}
								>
									<div
										className={clsx(COLOR_PICK[dashBoardItem.color], 'h-[0.8rem] w-[0.8rem] shrink-0 rounded-[50%]')}
									/>
									<div className='ml-[1rem] text-ellipsis break-all text-18-500 text-gray-7 md:overflow-hidden md:whitespace-nowrap sm:hidden sm:text-16-500'>
										{dashBoardItem.title}
									</div>
									{dashBoardItem.createdByMe && (
										<Image
											alt='내가 만든 대시보드에 붙는 왕관모양 아이콘'
											className='sm:hidden'
											height={14}
											src={RoyalCrownIcon}
										/>
									)}
								</div>
							</Link>
						);
					})}
				</div>
			</div>
			<AddNewDashBoard isOpen={isMakeNewDashBoardModalOpen} setOpen={setMakeNewDashBoardModalOpen} />
		</>
	);
}
