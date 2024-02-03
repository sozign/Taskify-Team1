import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import InviteModal from '@/components/modal/InviteModal';
import { useRouter } from 'next/router';
import HeaderNavDropdown from './HeaderNavDropdown';
import { getDashboardItem, getUsers } from '@/lib/api';
import { DashboardData } from '@/constants/types';
import royalCrownIcon from '@/../Public/assets/royalCrownIcon.svg';
import settingIcon from '@/../Public/assets/settingIcon.svg';
import PlusIcon from '@/../Public/assets/PlusIcon.svg';
import Vector from '@/../Public/assets/Vector.svg';

interface HeaderNavProps {
	dashboardId: number;
	title?: string | null;
}

export default function DashboardHeader({ dashboardId, title }: HeaderNavProps) {
	// 모달 1 열림, 닫힘 제어
	const [isTaskEditModalOpen, setIsTaskEditModalOpen] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [userData, setUserData] = useState<string>('');

	const router = useRouter();
	const boardId = +(router.query.boardid ?? 0);
	const dropDownRef = useRef<HTMLDivElement>(null);

	const [dashboardInfo, setDashboardInfo] = useState<DashboardData>({
		id: boardId,
		title: '',
		color: '#7AC555',
		createdAt: '',
		updatedAt: '',
		createdByMe: true,
		userId: 0,
	});
	const userProfileData = async () => {
		const { ...response } = await getUsers();
		setUserData(response?.nickname);
	};

	async function loadDashboardData(dashboardId: number) {
		try {
			const resData = await getDashboardItem(dashboardId);
			setDashboardInfo(resData);
			console.log('대시보드 로드', resData);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}

	useEffect(() => {
		userProfileData();
		loadDashboardData(boardId);
		const clickOutside = (e: MouseEvent) => {
			if (isDropdownOpen && !dropDownRef.current?.contains(e.target as Node)) {
				setIsDropdownOpen(false);
			}
		};
		document.addEventListener('mousedown', clickOutside);
		return () => {
			document.removeEventListener('mousedown', clickOutside);
		};
	}, [isDropdownOpen]);

	const dashBoardIdEditUrl = `/dashboard/${dashboardId}/edit`;

	const moveHandler = () => {
		router.push(dashBoardIdEditUrl);
	};

	return (
		<>
			<header className='container sticky inset-0 top-0 flex h-[7rem] flex-row items-center justify-between  bg-white   pl-[4rem] sm:h-[6rem]'>
				{router.pathname.startsWith('/mypage') ? (
					<div className=' flex flex-row gap-[0.4rem]  text-20-700 text-black-3'>
						<span className='md:hidden sm:hidden'>{dashboardInfo.title || title}</span>
						{router.pathname.startsWith('/mydashboard') || router.pathname.startsWith('/mypage') ? null : (
							<Image
								alt='대시보드 왕관 아이콘'
								src='/assets/royalCrownIcon.svg'
								className=' w-[2.103rem]  md:hidden sm:hidden'
							/>
						)}
					</div>
				) : (
					<Link href='/mydashboard' className=' flex flex-row gap-[0.4rem]  text-20-700 text-black-3'>
						<span className='md:hidden sm:hidden'>{dashboardInfo.title || title}</span>
						{router.pathname.startsWith('/mydashboard') || router.pathname.startsWith('/mypage') ? null : (
							<Image alt='대시보드 왕관 아이콘' src={royalCrownIcon} className=' w-[2.103rem]  md:hidden sm:hidden' />
						)}
					</Link>
				)}

				<nav className='flex flex-row items-center  gap-[1.6rem]'>
					{router.pathname.startsWith('/mydashboard') || router.pathname.startsWith('/mypage') ? null : (
						<>
							<button
								className='flex h-[4rem] w-[8.8rem] flex-shrink-0 flex-row items-center justify-center gap-[0.8rem] rounded-[0.8rem] border-2 border-gray-D bg-white md:h-[3.6rem] md:w-[8.5rem] sm:h-[3rem] sm:w-[4.9rem]'
								onClick={moveHandler}
							>
								<Image
									alt='관리 버튼 셋팅 아이콘'
									src={settingIcon}
									className='flex h-[2rem] w-[2rem] flex-shrink-0 flex-row items-center sm:hidden'
								/>
								<span className='items-center text-16-500 text-gray-7'>관리</span>
							</button>

							<button
								onClick={() => {
									setIsTaskEditModalOpen(true);
								}}
								className='flex h-[4rem] w-[11.6rem] flex-shrink-0 flex-row items-center justify-center gap-[0.8rem] rounded-[0.8rem] border-2 border-gray-D bg-white md:h-[3.6rem] md:w-[10.9rem] sm:h-[3rem] sm:w-[7.3rem]'
							>
								<Image
									alt='초대하기 버튼 플러스 아이콘'
									src={PlusIcon}
									className='flex h-[2rem] w-[2rem] flex-shrink-0 flex-row items-center sm:hidden'
								/>
								<span className='items-center text-16-500 text-gray-7'>초대하기</span>
							</button>

							<div className='flex h-[3.8rem] w-[3.8rem] items-center justify-center rounded-full border-2 border-white bg-black-0'>
								<span className='flex items-center justify-center text-center text-16-600 text-white '>
									{userData.toUpperCase().slice(0, 1)}
								</span>
							</div>
							<Image alt='영역 나누는 라인 이미지' src={Vector} className='h-[3.8rem] ' />
						</>
					)}
					<div className='flex flex-row items-center justify-center gap-[0.9rem]'>
						<div
							className='flex cursor-pointer items-center justify-center gap-2'
							ref={dropDownRef}
							onClick={() => setIsDropdownOpen(!isDropdownOpen)}
						>
							<div className='flex h-[3.8rem] w-[3.8rem] items-center justify-center rounded-full border-2 border-white bg-black-0'>
								<span className='flex items-center justify-center text-center text-16-600 text-white '>
									{userData.toUpperCase().slice(0, 1)}
								</span>
							</div>
							<span className='text-center text-16-600 sm:hidden'>{userData}</span>
							<div className='absolute translate-y-[5rem] pr-[2rem] sm:pr-[7rem]'>
								{isDropdownOpen && <HeaderNavDropdown />}
							</div>
						</div>
					</div>
				</nav>
			</header>
			<InviteModal isOpen={isTaskEditModalOpen} setIsOpen={setIsTaskEditModalOpen} dashboardId={dashboardId} />
		</>
	);
}
