import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import InviteModal from '@/components/modal/InviteModal';
import { useRouter } from 'next/router';
import HeaderNavDropdown from './HeaderNavDropdown';

interface userDataProps {
	dashboardId: number;
	title: string;
	nickname: string;
	profileImageUrl: string;
}

export default function DashboardHeader({ dashboardId, title, nickname, profileImageUrl }: userDataProps) {
	// 모달 1 열림, 닫힘 제어
	const [isTaskEditModalOpen, setIsTaskEditModalOpen] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const router = useRouter();
	const dropDownRef = useRef<HTMLDivElement>(null);

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
			<header className='container fixed inset-0  z-10  flex h-[7rem] flex-row items-center justify-between  bg-white   pl-[4rem] sm:h-[6rem]'>
				<Link href='/mydashboard' className=' flex flex-row gap-[0.4rem]  text-20-700 text-black-3'>
					<span className='md:hidden sm:hidden'>{title}</span>
					{router.pathname.startsWith('/mydashboard') ? null : (
						<Image
							alt='대시보드 왕관 아이콘'
							src='/assets/royalCrownIcon.svg'
							width={20}
							height={20}
							className=' w-[2.103rem]  md:hidden sm:hidden'
						/>
					)}
				</Link>

				<nav className='flex flex-row items-center  gap-[1.6rem]'>
					{router.pathname.startsWith('/mydashboard') ? null : (
						<>
							<button
								className='flex h-[4rem] w-[8.8rem] flex-shrink-0 flex-row items-center justify-center gap-[0.8rem] rounded-[0.8rem] border-2 border-gray-D bg-white md:h-[3.6rem] md:w-[8.5rem] sm:h-[3rem] sm:w-[4.9rem]'
								onClick={moveHandler}
							>
								<Image
									alt='관리 버튼 셋팅 아이콘'
									src='/assets/settingIcon.svg'
									width={20}
									height={20}
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
									src='/assets/PlusIcon.svg'
									width={20}
									height={20}
									className='flex h-[2rem] w-[2rem] flex-shrink-0 flex-row items-center sm:hidden'
								/>
								<span className='items-center text-16-500 text-gray-7'>초대하기</span>
							</button>

							<div>
								{/* <Image alt='프로필 이미지'
              width={20}
							height={20}
                 src={profileImageUrl || ColorBlue} className='relative' /> */}
								<span className=' items-center text-center text-16-600 text-white '>{nickname.slice(0, 1)}</span>
							</div>
							<Image
								alt='영역 나누는 라인 이미지'
								width={20}
								height={20}
								src='/assets/Vector.svg'
								className='h-[3.8rem] '
							/>
						</>
					)}
					<div className='flex flex-row items-center justify-center gap-[0.9rem]'>
						<div
							className='flex cursor-pointer items-center justify-center gap-2'
							ref={dropDownRef}
							onClick={() => setIsDropdownOpen(!isDropdownOpen)}
						>
							<div className='relative'>
								{/* <Image alt='프로필 이미지' 
              width={20}
							height={20}
              src={profileImageUrl || ColorBlue} className='relative' /> */}
								<span className=' items-center text-center text-16-600 text-white '>{nickname.slice(0, 1)}</span>
							</div>
							<span className='text-center text-16-600 sm:hidden'>{nickname}</span>
							<div className='absolute translate-y-[5rem] pr-[2rem] sm:pr-[7rem]'>
								{isDropdownOpen && <HeaderNavDropdown />}
							</div>
						</div>
					</div>
				</nav>
			</header>
			<InviteModal isOpen={isTaskEditModalOpen} setIsOpen={setIsTaskEditModalOpen} />
		</>
	);
}
