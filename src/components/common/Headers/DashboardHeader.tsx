import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import InviteModal from '@/components/modal/InviteModal';
import { useRouter } from 'next/router';
import HeaderNavDropdown from './HeaderNavDropdown';
import { getDashboardItem, getMembers, getUsers } from '@/lib/api';
import { DashboardData, MembersGet } from '@/constants/types';
import royalCrownIcon from '@/../Public/assets/royalCrownIcon.svg';
import settingIcon from '@/../Public/assets/settingIcon.svg';
import PlusIcon from '@/../Public/assets/PlusIcon.svg';
import Vector from '@/../Public/assets/Vector.svg';
import Avatar from '../Avatar';

interface HeaderNavProps {
	dashboardId: number;
	title?: string | null;
}

type profileFormData = {
	email: string;
	nickname: string;
	profileImageUrl: string | null;
};

export default function DashboardHeader({ dashboardId, title }: HeaderNavProps) {
	// 모달 1 열림, 닫힘 제어
	const [isTaskEditModalOpen, setIsTaskEditModalOpen] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [userData, setUserData] = useState<string>('');
	const [members, setMembers] = useState<MembersGet>({
		members: [],
		totalCount: 4,
	});

	const router = useRouter();
	const boardId = +(router.query.boardid ?? 0);
	const dropDownRef = useRef<HTMLDivElement>(null);

	const [userInfo, setUserInfo] = useState<profileFormData>({
		email: '',
		nickname: '',
		profileImageUrl: '',
	});

	const loadMember = async () => {
		try {
			const data = await getUsers();
			const { email, nickname, profileImageUrl } = data;
			setUserInfo({ email, nickname, profileImageUrl });
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		loadMember();
	}, []);

	const [dashboardInfo, setDashboardInfo] = useState<DashboardData>({
		id: boardId,
		title: '',
		color: '#7AC555',
		createdAt: '',
		updatedAt: '',
		createdByMe: true,
		userId: 0,
	});
	const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
	const handleResize = () => {
		setWindowWidth(window.innerWidth);
	};
	useEffect(() => {
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [windowWidth]);

	const getMembersData = async () => {
		try {
			const { ...resData } = await getMembers({
				page: 1,
				size: 4,
				dashboardId: boardId,
			});
			setMembers(resData);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	const userProfileData = async () => {
		const response = await getUsers();
		setUserData(response?.nickname);
	};

	async function loadDashboardData(dashboardId: number) {
		try {
			const resData = await getDashboardItem(dashboardId);
			setDashboardInfo(resData);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}

	useEffect(() => {
		getMembersData();
	}, [boardId]);

	useEffect(() => {
		userProfileData();
	}, [boardId]);

	useEffect(() => {
		loadDashboardData(boardId);
	}, [boardId]);

	useEffect(() => {
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
			<header className='container sticky inset-0 flex h-[7rem]  flex-row items-center justify-between border-b-[0.1rem] border-gray-D   bg-white pl-[2rem] sm:h-[6rem]'>
				{router.pathname.startsWith('/mypage') ? (
					<div className='container flex flex-row gap-[0.4rem]  text-20-700 text-black-3'>
						<span className='md:hidden sm:hidden'>{dashboardInfo.title ?? title}</span>
						{router.pathname.startsWith('/mydashboard') || router.pathname.startsWith('/mypage')
							? null
							: dashboardInfo.createdByMe && (
									<Image
										width={3.8}
										height={3.8}
										alt='대시보드 왕관 아이콘'
										src={royalCrownIcon}
										className=' w-[2.103rem]  md:hidden sm:hidden'
									/>
								)}
					</div>
				) : (
					<Link
						href='/mydashboard'
						className=' flex flex-row gap-[0.4rem]  text-20-700 text-black-3 md:w-[0.8rem] sm:w-[1.2rem]'
					>
						<span className='md:hidden sm:hidden'>{dashboardInfo.title || title}</span>
						{router.pathname.startsWith('/mydashboard') || router.pathname.startsWith('/mypage')
							? null
							: dashboardInfo.createdByMe && (
									<Image
										width={3.8}
										height={3.8}
										alt='대시보드 왕관 아이콘'
										src={royalCrownIcon}
										className=' w-[2.103rem] md:hidden sm:hidden'
									/>
								)}
					</Link>
				)}

				<nav className='flex flex-row items-center  gap-[1.6rem] md:gap-[1.2rem] sm:gap-[0.6rem]'>
					{router.pathname.startsWith('/mydashboard') || router.pathname.startsWith('/mypage')
						? null
						: dashboardInfo.createdByMe && (
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
								</>
							)}

					<div className='group flex items-center justify-center pl-[4rem] sm:pl-[1.6rem]'>
						{windowWidth > 1199
							? members.members.slice(0, 4).map((members, member) => {
									return members.profileImageUrl === null ? (
										<Avatar
											key={member}
											name={members.nickname}
											className=' h-[3.8rem] w-[3.8rem] flex-shrink-0 flex-row items-center gap-[-2rem] border-2 border-white text-16-600  group-odd:ml-[-1rem]'
										/>
									) : (
										<Image
											width={3.8}
											height={3.8}
											key={member}
											alt='초대 멤버 프로필 사진'
											src={members.profileImageUrl}
											className='flex h-[3.8rem] w-[3.8rem] items-center justify-center rounded-[50%] border-2 border-white text-center'
										/>
									);
								})
							: members.members.slice(0, 2).map((members, member) => {
									return members.profileImageUrl === null ? (
										<Avatar
											key={member}
											name={members.nickname}
											className=' h-[3.8rem] w-[3.8rem] flex-shrink-0 flex-row items-center gap-[-2rem] border-2 border-white text-16-600  group-odd:ml-[-1rem]'
										/>
									) : (
										<Image
											key={member}
											width={3.8}
											height={3.8}
											alt='초대 멤버 프로필 사진'
											src={members.profileImageUrl}
											className='flex h-[3.8rem] w-[3.8rem] items-center justify-center rounded-[50%] border-2 border-white text-center'
										/>
									);
								})}
						{windowWidth > 1199
							? members.totalCount > 4 && (
									//수정부분
									<div className='text-montserrat flex h-[3.8rem] w-[3.8rem] flex-shrink-0 flex-row  items-center justify-center gap-[-2rem] rounded-[50%] border-2 border-white bg-pink-F text-center text-16-600 text-pink-D group-odd:ml-[-1.2rem]'>
										+ {members.totalCount}
									</div>
								)
							: members.totalCount > 4 && (
									<div className='text-montserrat flex h-[3.8rem] w-[3.8rem] flex-shrink-0 flex-row  items-center justify-center gap-[-2rem] rounded-[50%] border-2 border-white bg-pink-F text-center text-16-600 text-pink-D group-odd:ml-[-1.2rem]'>
										+ {members.totalCount + 2}
									</div>
								)}
					</div>

					{router.pathname.startsWith('/mydashboard') || router.pathname.startsWith('/mypage') ? null : (
						<Image alt='영역 나누는 라인 이미지' src={Vector} className='h-[3.8rem] ' />
					)}
					<div className='flex flex-row items-center justify-center gap-[0.9rem] px-[2rem] sm:px-[1.2rem]'>
						<div
							className='flex cursor-pointer items-center justify-center gap-2'
							ref={dropDownRef}
							onClick={() => setIsDropdownOpen(!isDropdownOpen)}
						>
							{userInfo.profileImageUrl ? (
								<Image
									width={3.8}
									height={3.8}
									alt='초대 멤버 프로필 사진'
									src={userInfo.profileImageUrl}
									className='flex h-[3.8rem] w-[3.8rem] items-center justify-center rounded-[50%] border-2 border-white text-center'
								/>
							) : (
								<Avatar name={userData} className='h-[3.8rem] w-[3.8rem] border-2 border-white text-16-600' />
							)}
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
